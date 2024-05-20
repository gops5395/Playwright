const { test, expect } = require('@playwright/test');

class DashboardPo {

    constructor(page) {
        this.page = page;
        this.allProducts = page.locator(".card-body");
        this.cart = page.locator("[routerlink*='cart']");
        this.myCartSection = page.locator("li .infoWrap")
        this.checkOutBtn = page.locator("text=Checkout")
        this.countryDropdown = page.locator("[placeholder*='Country']")
        this.suggestionSection = page.locator("[class*='ta-results']")
        this.unOnTop = page.locator("[class*='user__name'] label")
        this.unInBox = page.locator("[class*='user__name']  input")
        this.placeOrder = page.locator(".action__submit")
        this.confirmMsg = page.locator(".hero-primary")
        this.id = page.locator("td[class*='em-spacer'] .ng-star-inserted")
    }

    
    async searchProductAndAddToCart(reqProduct) {
        let total = await this.allProducts.count();

        for (let i = 0; i < total; i++) {
            let productText = await this.allProducts.nth(i).locator("b").textContent();
            if (productText === reqProduct) {
                await this.allProducts.nth(i).locator("text= Add To Cart").click();
                break;
            }

        }
    }


    async clickOnCart() {
        await this.cart.click();
        await this.myCartSection.first().waitFor()
    }

    async validateSelectedProductInTheCart(reqProduct){
       let reqProductIntoTheCart= await this.page.locator("h3:has-text('" + reqProduct + "')").isVisible();
       console.log("In th validateSelectedProductInTheCart ",reqProductIntoTheCart)

       return reqProductIntoTheCart;
    }

    async clickOnCartAndAddValidDetails(partialCountryText, reqCountry) {

        await this.checkOutBtn.click();
        await this.countryDropdown.pressSequentially(partialCountryText);
        await this.suggestionSection.waitFor();
        let totalSuggestCounty = await this.suggestionSection.locator("button").count();
        for (let i = 0; i < totalSuggestCounty; i++) {
            let country = await this.suggestionSection.locator("button").nth(i).textContent();
            if (country === reqCountry) {
                await this.suggestionSection.locator("button").nth(i).click();
                break
            }
        }
        let useEmailOnOrderDetailsPage = await this.unOnTop.textContent();
        return useEmailOnOrderDetailsPage

       
    }
    async placeOrderAndValidate(){
        await this.placeOrder.click();
        let confirmMsg = await this.confirmMsg.textContent();

        let orderId = await this.id.textContent();
        console.log("orderId ",orderId)

        return confirmMsg;
    }
}
module.exports = { DashboardPo };