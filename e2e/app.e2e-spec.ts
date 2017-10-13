import { EthosiaProjectPage } from './app.po';

describe('ethosia-project App', function() {
  let page: EthosiaProjectPage;

  beforeEach(() => {
    page = new EthosiaProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
