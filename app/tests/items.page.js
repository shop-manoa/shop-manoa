import { Selector } from 'testcafe';

class ItemsPage {
  constructor() {
    this.pageId = '#items-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const itemsPage = new ItemsPage();
