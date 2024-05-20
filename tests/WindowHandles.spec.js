const { test, expect } = require('@playwright/test');

test("child window handles ", async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    let ttl = await page.title();
    console.log(" Parent to Child Window ", ttl)

    const blinkText = page.locator("[href*='documents-request']")
    const userName = page.locator("#username");


    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkText.click(),
    ]);
    const redText = newPage.locator("p.red");

    let actText = await redText.textContent();
    console.log("actText ", actText)
    let firstIndex = actText.split("@")[1];
    let user = firstIndex.split(" ")[0];
    console.log("user ", user);
    await userName.fill(user);
    //await page.pause();

})