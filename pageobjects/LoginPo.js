class LoginPo{

    constructor(page) {
        this.page = page
        this.uName = page.locator("#userEmail");
        this.pass = page.locator("#userPassword");
        this.login = page.locator("#login");
         this.allProducts = page.locator(".card-body");

    }
    async goToUrl(url){
        await this.page.goto(url)

}
    async loginIntoTheEcomWeb(email , pass) {

        await this.uName.fill(email);
        await this.pass.fill(pass)
        await this.login.click();
        const title = await this.page.title();
        await this.allProducts.first().waitFor();

        return title;
    }
}
module.exports={LoginPo}