
const { test, expect } = require("@playwright/test");

export class MoviesPage {

    constructor(page) {
        this.page = page;
      }
    async isLoggedin() {
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveURL(/.*admin/);
      }
}