const { test, expect } = require("@playwright/test");

export class ToastComponent {
  constructor(page) {
    this.page = page;
  }

  async containText(messege) {
    await expect(this.page.locator(".toast")).toContainText(messege);
    await expect(this.page.locator(".toast")).not.toBeVisible({
      timeout: 6000,
    });
  }
}
