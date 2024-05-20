const { LoginPo } = require('../pageobjects/LoginPo')
const { DashboardPo } = require('../pageobjects/DashboardPo')

class PO_Manager {

    constructor(page) {
        this.page = page;
        this.loginPo = new LoginPo(this.page);
        this.dashboardPo = new DashboardPo(this.page);

    }
    async goToLoginPage() {
        return this.loginPo
    };

    async goToDashBoardPage() {
        return this.dashboardPo;
    };

}
module.exports = { PO_Manager }