const { test, expect, request } = require('@playwright/test');
const { LoginPo } = require('../pageobjects/LoginPo')
const { DashboardPo } = require('../pageobjects/DashboardPo')
const { APIUtils } = require('../Utils/APIUtils')

const loginData = JSON.parse(JSON.stringify(require("../TestData/loginData.json")))
const placeOrderData = JSON.parse(JSON.stringify(require("../TestData/placeOrderData.json")))

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const apiUtils = new APIUtils();
let token;

test.beforeAll(async () => {

    token = await apiUtils.getTheSessionToken("https://rahulshettyacademy.com/api/ecom/auth/login", loginPayload)
    console.log("token ", token)

})
test(" test e-com website ", async ({ page }) => {
    await apiUtils.addTokenToWeb(page, token);

    let loginPo = new LoginPo(page);
    let dashboardPo = new DashboardPo(page);

    await loginPo.goToUrl(loginData.url)
    //await page.pause();
    
    await dashboardPo.searchProductAndAddToCart(placeOrderData.reqProduct);
    await dashboardPo.clickOnCart();

    let isProductAddedToCart=await dashboardPo.validateSelectedProductInTheCart(placeOrderData.reqProduct);
    expect(isProductAddedToCart).toBeTruthy();

    let userMailOnOrderDetail = await dashboardPo.clickOnCartAndAddValidDetails(placeOrderData.partialCountryText, placeOrderData.reqCountry);
    expect(userMailOnOrderDetail).toContain(loginData.email);

    let confirmationMsg= await dashboardPo.placeOrderAndValidate();
    expect(confirmationMsg).toContain(placeOrderData.reqConfirmMsg);

})