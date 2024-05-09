import { Selector } from 'testcafe';
import path from 'path';

class CreateItemPage {
  constructor() {
    this.pageId = '#createitem-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then creates a new item */
  async createItem(testController) {
    const title = 'Bicycle';
    const description = 'Selling a reliable, lightweight bicycle perfect for campus commutes and weekend adventures. Smooth rides, durable design, and comfortable features make it an ideal companion for navigating city streets or exploring trails.';
    const imageFileName = 'bicycle.jpeg';
    const imageFilePath = path.resolve(process.cwd(), 'public', 'images', imageFileName);
    const price = '100';
    const contact = 'email@hawaii.edu';
    await this.isDisplayed(testController);

    // Define the new item.
    await testController.typeText('#createItemFormTitle', title);
    await testController.typeText('#createItemFormDescription', description);

    // Set image file
    await testController.setFilesToUpload('#createItemFormImage', [imageFilePath]);

    // Select category.
    const categorySelector = Selector('#createItemFormCategory');
    await testController.click(categorySelector).click(categorySelector.find('option').nth(1));

    // Select condition.
    const conditionSelector = Selector('#createItemFormCondition');
    await testController.click(conditionSelector).click(conditionSelector.find('option').nth(1));

    // Set price.
    await testController.typeText('#createItemFormPrice', price);

    // Set contact.
    await testController.typeText('#createItemFormContact', contact);

    // Submit form.
    await testController.click('#createItemFormSubmit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));

  }

}

export const createItemPage = new CreateItemPage();
