import { browser, logging } from 'protractor';
import { timeout } from 'rxjs/operators';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('the title should be EAFIT Bike', async () => {
    await browser.get(browser.baseUrl);
    const siteTitle = await browser.getTitle();
    console.log('====================== Base Title', await browser.getTitle());
    expect(siteTitle).toEqual('EAFIT Bike');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
