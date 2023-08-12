// const { chromium } = require('playwright');
const { context } = require('../support/hooks')

class CareerPortal {

  constructor() {
    this.loginButton = '#ctl00_ctl00_BotContent_hrefLogin';
    this.email = '#ctl00_ctl00_BotContent_loginSignup_email_address';
    this.password = '#ctl00_ctl00_BotContent_loginSignup_txtpassword';
    this.signUp = '#ctl00_ctl00_BotContent_loginSignup_BtnReg'
    this.logout = '#ctl00_ctl00_BotContent_hreflogout'
  }

  async open(url) {
    console.log('testing!..')
    await global.page.goto(url);
  }

  async login(username, password) {
    await global.page.click(this.loginButton);
    await global.page.fill(this.email, username);
    await global.page.fill(this.password, password);
    await global.page.click(this.signUp);
    console.log('End of first function')
  }

  async portalLogout(){
    console.log('testing function exection')
    await global.page.click(this.logout);
  }

}

module.exports = {
  CareerPortal
};