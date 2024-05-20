const { test, expect } = require('@playwright/test');
const { LoginPo } = require('../pageobjects/LoginPo')
const { DashboardPo } = require('../pageobjects/DashboardPo')

//Convert Json --> String --> Js Object
const loginData = JSON.parse(JSON.stringify(require("../TestData/loginData.json")))
const placeOrderData = JSON.parse(JSON.stringify(require("../TestData/placeOrderData.json")))
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }

test(" Login to e-com website ", async ({ browser }) => {
   
    const context = await browser.newContext();
    const page = await context.newPage();
    let loginPo = new LoginPo(page);
    await loginPo.goToUrl(loginData.url)
    let title = await loginPo.loginIntoTheEcomWeb(loginData.email, loginData.pass)

    expect(title === "Let's Shop").toBeTruthy();
    expect(title).toContain("Let's Shop")


});

test("Add a product to the cart and validate ", async ({ page }) => {
    let loginPo = new LoginPo(page);
    let dashboardPo = new DashboardPo(page);

    await loginPo.goToUrl(loginData.url)

    await loginPo.loginIntoTheEcomWeb(loginData.email, loginData.pass)

    await dashboardPo.searchProductAndAddToCart(placeOrderData.reqProduct);
    await dashboardPo.clickOnCart();

    let isProductAddedToCart=await dashboardPo.validateSelectedProductInTheCart(placeOrderData.reqProduct);
    expect(isProductAddedToCart).toBeTruthy();

    let userMailOnOrderDetail = await dashboardPo.clickOnCartAndAddValidDetails(placeOrderData.partialCountryText, placeOrderData.reqCountry);
    expect(userMailOnOrderDetail).toContain(loginData.email);

    let confirmationMsg= await dashboardPo.placeOrderAndValidate();
    expect(confirmationMsg).toContain(placeOrderData.reqConfirmMsg);


})