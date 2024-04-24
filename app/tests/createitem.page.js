import { Selector } from 'testcafe';

class CreateItemPage {
  constructor() {
    this.pageId = '#createitem-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const createItemPage = new CreateItemPage();