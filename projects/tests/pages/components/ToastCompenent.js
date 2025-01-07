const { test, expect } = require("@playwright/test");

export class ToastComponent {
  constructor(page) {
    this.page = page;
  }

  async haveText(messege) {
    await expect(this.page.locator(".toast")).toHaveText(messege);
    await expect(this.page.locator(".toast")).not.toBeVisible({
      timeout: 6000,
    });
  }
}
