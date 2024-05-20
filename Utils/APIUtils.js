const { test, expect, request } = require('@playwright/test');

class APIUtils {

    async getTheSessionToken(postURL, loginPayload) {

        const apiContext = await request.newContext()
        const logResponse = await apiContext.post(postURL,
            {
                data: loginPayload
            }
        )
        expect((logResponse).ok()).toBeTruthy();
        let logJsonResp = await logResponse.json();
        let token = await logJsonResp.token;

        return token;
    }

    async addTokenToWeb(page, token) {
        await page.addInitScript(value => {

            window.localStorage.setItem('token', value)
        }, token)
    }
}
module.exports = { APIUtils }