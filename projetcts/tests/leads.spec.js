// @ts-che
const { test, expect } = require("@playwright/test");

test("deve cadastra um lead na fila de esperar", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  //await page.click('//button[text( )="Aperte o play... se tiver coragem"]')

  page
    .getByRole("button", { name: /Aperte o play/ })
    .click();

  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');

  await page.locator('#name').fill('silva silva');
  await page.locator('input[name=email]').fill('teste@sa.com');

  page.getByRole('button', {name: 'Quero entrar na fila'}).click();
  await page.waitForTimeout(1000);

});
