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

  /** Checks this page is displayed, then adds a new report */
  async addReport(testController) {
    const details = 'This is a spam post.';
    await this.isDisplayed(testController);

    // Enter firstName.
    const firstNameSelector = Selector('#addReportFormFirstName');
    await testController.click(firstNameSelector).click(firstNameSelector.find('option').nth(0));
    // Enter lastName
    const lastNameSelector = Selector('#addReportFormLastName');
    await testController.click(lastNameSelector).click(lastNameSelector.find('option').nth(0));

    // Enter title
    const titleSelector = Selector('#addReportFormTitle');
    await testController.click(titleSelector).click(titleSelector.find('option').nth(0));
    // Select type.
    const typesSelector = Selector('#addReportFormTypes');
    await testController.click(typesSelector).click(typesSelector.find('option').nth(0));

    // Select category.
    const categorySelector = Selector('#addReportFormCategory');
    await testController.click(categorySelector).click(categorySelector.find('option').nth(0));

    // Define the report.
    await testController.typeText('#addReportFormDetails', details);

    // Submit form.
    await testController.click('#addReportFormSubmit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));

  }

}

export const addReportPage = new AddReportPage();
