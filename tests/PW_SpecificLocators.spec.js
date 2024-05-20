const { test, expect } = require('@playwright/test');

test("playwright specific locator   ", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    let ttl = await page.title();
    await console.log(ttl)
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByPlaceholder("Password").fill("4643");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card-list .card").filter({hasText:"Blackberry"}).getByRole("button").click();


});