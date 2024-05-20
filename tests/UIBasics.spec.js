//const { default: test } = require('node:test')

const { test, expect } = require('@playwright/test');

test.describe.configure({mode:'parallel'})
test('browser context playwright Tc', async ({browser})=>
{
const context= await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/");
let ttl=await page.title();
        await console.log(" first tc  ",ttl)
});

test('page playwright Tc without const and page', async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        let ttl = await page.title();
        await console.log(ttl)
        const userName = page.locator("#username");
        const pass = page.locator("[name='password']")
        const btn = page.locator("#signInBtn")
        const errMsg = page.locator("[style*='block']")
        //To traverse from parent to child just give a space
        const product = page.locator(".card-title a")

        // await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        await userName.fill("rahulshettyacademy123");
        await pass.fill("learning");
        await btn.click();
        let msg = await errMsg.textContent();
        console.log(msg);
        await expect(await errMsg).toContainText("Incorrect")
        //Retype
        await userName.fill("rahulshettyacademy");
        await btn.click();
        // let firstproduct=await product.first().textContent();
        // let secondproduct=await product.nth(1).textContent();
        // console.log("firstproduct ",firstproduct,"  secondproduct  ",secondproduct)
        //To get all element
        //To wait untill all network call is loaded we have to use
        //await page.waitForLoadState('networkidle')  //it this not work
        await product.first().waitFor();
        let allProduct = await product.allTextContents();
        console.log("allProduct ", allProduct)

});