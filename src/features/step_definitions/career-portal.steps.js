
const { Given, When, Then } = require('@cucumber/cucumber')
const { CareerPortal } = require('../career-portal/careerportal')

const career = new CareerPortal()
Given('lets open the mtbc career portal {string}', async (url) => {
  //open link in tab
  await career.open(url)
});

When('lets login with {string} and {string}', async (username, password) => {
  //login career portal Application
  await career.login(username, password)
});

Then('logout the career portal', async () => {
  //logout the career
  await career.portalLogout()
});