const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser
let page

Given('lets open the mtbc career portal {string}', async function (url) {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(url);
});


When('lets login with {string} and {string}', async function (username, password) {
  await page.locator('#ctl00_ctl00_BotContent_hrefLogin').click()
  await page.locator('#ctl00_ctl00_BotContent_loginSignup_email_address').fill(username)
  await page.locator('#ctl00_ctl00_BotContent_loginSignup_txtpassword').fill(password)
  await page.locator('#ctl00_ctl00_BotContent_loginSignup_BtnReg').click()
});

Then('logout the career portal', async  function () {

  await page.locator('#ctl00_ctl00_BotContent_hreflogout').click()

  await browser.close();
});