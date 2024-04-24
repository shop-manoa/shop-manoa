import { Selector } from 'testcafe';

class AddReportPage {
  constructor() {
    this.pageId = '#addreport-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const addReportPage = new AddReportPage();
