const { test, expect } = require('@playwright/test');

test(" test e-com website ", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto("https://rahulshettyacademy.com/client/")
    const reqProduct = "ADIDAS ORIGINAL";
    const reqCountry = " India";
    const email = "anshika@gmail.com"
    const uName = page.locator("#userEmail");
    const pass = page.locator("#userPassword");
    const login = page.locator("#login");
    const allProducts = page.locator(".card-body");
    const cart = page.locator("[routerlink*='cart']");
    const myCartSection = page.locator("li .infoWrap")
    const checkOutBtn = page.locator("text=Checkout")
    const countryDropdown = page.locator("[placeholder*='Country']")
    const suggestionSection = page.locator("[class*='ta-results']")
    const unOnTop = page.locator("[class*='user__name'] label")
    const unInBox = page.locator("[class*='user__name']  input")
    const placeOrder = page.locator(".action__submit")
    const confirmMsg = page.locator(".hero-primary")
    const id = page.locator("td[class*='em-spacer'] .ng-star-inserted")


    await uName.fill(email);
    await pass.fill("Iamking@000")
    await login.click();
    const title = await page.title();
    console.log("title of client ecom web ", title)
    await allProducts.first().waitFor();

    let total = await allProducts.count();
    console.log(" total ", total);

    for (let i = 0; i < total; i++) {
        let productText = await allProducts.nth(i).locator("b").textContent();
        console.log("productText  ", productText)
        if (productText === reqProduct) {
            console.log("inSide if  ", productText)

            await allProducts.nth(i).locator("text= Add To Cart").click();
            break;
        }

    }
    await cart.click();
    await myCartSection.first().waitFor()
    const isProdThere = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    await expect(isProdThere).toBeTruthy();
    await checkOutBtn.click();
    await countryDropdown.pressSequentially("ind");
    await suggestionSection.waitFor();
    let totalSuggestCounty = await suggestionSection.locator("button").count();
    for (let i = 0; i < totalSuggestCounty; i++) {
        let country = await suggestionSection.locator("button").nth(i).textContent();
        if (country === reqCountry) {
            await suggestionSection.locator("button").nth(i).click();
            break
        }
    }
    //await page.pause();
    await expect(unOnTop).toHaveText(email)
    //await expect(unInBox.first()).toHaveText(email)
    await placeOrder.click();
    await expect(confirmMsg).toHaveText(" Thankyou for the order. ")
    let orderId = await id.textContent();
    console.log("orderId  ", orderId)

})