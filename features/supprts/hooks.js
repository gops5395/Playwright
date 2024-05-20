const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { test, expect } = require('@playwright/test');
const { playwright, chromium } = require('@playwright/test');
const { LoginPo } = require('../../pageobjects/LoginPo')
const { DashboardPo } = require('../../pageobjects/DashboardPo');

Before(async function () {
    this.browser = await chromium.launch({
        headless: false
    })
    //const context = await browser.newContext();
    this.page = await this.browser.newPage();
    this.loginPo = new LoginPo(this.page);
    this.dashboardPo = new DashboardPo(this.page);
});

After(async function () {
    console.log("Am the last to execute")
});

BeforeStep(async function () {
   
});

AfterStep(async function ({ result }) {
    if ( result.status ===  Status.FAILED) {
        await this.page.screenshot({ path: "screenshot1.png" })
    }});
