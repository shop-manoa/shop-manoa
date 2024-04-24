import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listProfilePage } from './listprofile.page';
import { homePage } from './home.page';
import { adminHomePage } from './adminhome.page';
import { myProfilePage } from './myprofile.page';
import { createItemPage } from './createitem.page';
import { itemsPage } from './items.page';
import { addReportPage } from './addreport.page';
import { categoriesPage } from './categories.page';

/* global fixture:false, test:false */

/** Credentials for the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Home page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoHomePage(testController);
  await homePage.isDisplayed(testController);
});

test('Test the Admin Home page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminHomePage(testController);
  await adminHomePage.isDisplayed(testController);
});

test('Test the My Profile page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyProfilePage(testController);
  await myProfilePage.isDisplayed(testController);
});

test('Test the Create Item page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCreateItemPage(testController);
  await createItemPage.isDisplayed(testController);
  await createItemPage.createItem(testController);
});
test('Test the Items page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoItemsPage(testController);
  await itemsPage.isDisplayed(testController);
});

test('Test the List Profile page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListProfilePage(testController);
  await listProfilePage.isDisplayed(testController);
});

test('Test the Add Report page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListProfilePage(testController);
  await listProfilePage.isDisplayed(testController);
  await listProfilePage.checkReportButton(testController);
  await addReportPage.isDisplayed(testController);
  await addReportPage.addReport(testController);
});

test('Test the Categories page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCategoriesPage(testController);
  await categoriesPage.isDisplayed(testController);
});
