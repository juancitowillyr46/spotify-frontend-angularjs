import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})

export class AppComponent implements OnInit {
  public title = 'Curso AngularJS CLI';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;

  constructor(private _userService: UserService){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    this.identity = this._userService.getIndentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit(){
    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){

          alert('El usuario no está logueado correctamente indentificado');

        } else {
          // Crear elemento en el local storage
          localStorage.setItem('identity', JSON.stringify(identity));

          // Conseguir el token para enviarselo a cada petición http
          this._userService.signUp(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
      
              if(this.token.length <= 0){
                alert('El token no se ha generado correctamente');
              } else {
                
                localStorage.setItem('token', token);
                this.user = new User('','','','','','ROLE_USER','');
              }
            },
            error => {
              var errorMessage = <any>error;
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(body);
              }
            }
          );
          

        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(body);
        }
      }
    );
  }

  public logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  onSubmitRegister(){
    console.log(this.user_register);
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;
        if(!user._id){
          alert('Error al registrarte');
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha realizado correctamente, identificate con '+ this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','');
        }
      },
      error => {
        var alertRegister = <any>error;
        if(alertRegister != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(body);
        }
      }
    );
  }

}
