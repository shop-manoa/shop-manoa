import { Selector } from 'testcafe';

class AdminHomePage {
  constructor() {
    this.pageId = '#adminhome-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const adminHomePage = new AdminHomePage();
