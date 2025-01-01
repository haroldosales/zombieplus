// @ts-che
const { test, expect } = require("@playwright/test");
const exp = require("constants");




test("deve entrar no admin", async ({ page }) => {

  await page.goto('http://localhost:3000/admin/login');

  const loginForm = page.locator('.login-form');
  await expect(loginForm).toBeVisible();


});