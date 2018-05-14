import { SpotifyFrontendAngularCliPage } from './app.po';

describe('spotify-frontend-angular-cli App', function() {
  let page: SpotifyFrontendAngularCliPage;

  beforeEach(() => {
    page = new SpotifyFrontendAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
