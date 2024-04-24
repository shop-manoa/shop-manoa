import { Selector } from 'testcafe';

class ListProfilePage {
  constructor() {
    this.pageId = '#listprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoAddReportPage(testController) {
    await testController.click('#addReportButton');
  }

}

export const listProfilePage = new ListProfilePage();
