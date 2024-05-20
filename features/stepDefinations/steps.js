const { Given,When,Then } = require("@cucumber/cucumber");
const { test, expect } = require('@playwright/test');
const { playwright, chromium } = require('@playwright/test');

const { LoginPo } = require('../../pageobjects/LoginPo')
const { DashboardPo } = require('../../pageobjects/DashboardPo');
const { TIMEOUT } = require("dns");
const loginData = JSON.parse(JSON.stringify(require("../../TestData/loginData.json")))
const placeOrderData = JSON.parse(JSON.stringify(require("../../TestData/placeOrderData.json")))
let loginPo;
let dashboardPo;

Given('Login to ecom website with the valid {string} and {string}',{timeout:100*1000}, async function (email, pass) {
   

    await this.loginPo.goToUrl(loginData.url)
    let title = await this.loginPo.loginIntoTheEcomWeb(email, pass)
    console.log("title ",title)
    expect(title === "Let's Shop").toBeTruthy();
    expect(title).toContain("Let's Shop")
});
When('Add item {string} into the cart',{timeout:100*1000}, async function (reqProduct) {
    await this.dashboardPo.searchProductAndAddToCart(reqProduct);

});
Then('verify {string} display in the cart page',{timeout:100*1000}, async function (reqProduct) {
     await this.dashboardPo.clickOnCart();

    let isProductAddedToCart = await this.dashboardPo.validateSelectedProductInTheCart(reqProduct);
    expect(isProductAddedToCart).toBeTruthy();
});
When('enter valid details and place the order', async function () {
    let userMailOnOrderDetail = await this.dashboardPo.clickOnCartAndAddValidDetails(placeOrderData.partialCountryText, placeOrderData.reqCountry);
    expect(userMailOnOrderDetail).toContain(loginData.email);
});
Then('verify order present in order history page', async function () {
    let confirmationMsg = await this.dashboardPo.placeOrderAndValidate();
    expect(confirmationMsg).toContain(placeOrderData.reqConfirmMsg);
});