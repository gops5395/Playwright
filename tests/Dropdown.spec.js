const { test, expect } = require('@playwright/test');

test("handle static dropdown ", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    let ttl = await page.title();
    await console.log(ttl)
    const userName = page.locator("#username");
    const pass = page.locator("[name='password']");
    const btn = page.locator("#signInBtn");
    const drpdwn = page.locator("select.form-control");
    const rdiobtn = page.locator(".checkmark");
    const popupOkButton = page.locator("#okayBtn")
    const checkBox = page.locator("#terms")
    const blinkText = page.locator("[href*='documents-request']")



    await drpdwn.selectOption("Teacher");
    await rdiobtn.nth(1).click();
    await popupOkButton.click();

    //To pause the execution
    //await page.pause();

    console.log(await rdiobtn.nth(1).isChecked());
    await expect(rdiobtn.nth(1)).toBeChecked();
    await checkBox.click();
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();

    //To get attribute value --- for blincking text there is a class called 'blinckingText'
    await expect(blinkText).toHaveAttribute("class", "blinkingText");

})