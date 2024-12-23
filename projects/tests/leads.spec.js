// @ts-che
const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("deve cadastra um lead na fila de esperar", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  //await page.click('//button[co( )="Aperte o play... se tiver coragem"]')

  page.getByRole("button", { name: /Aperte o play/ }).click();

  expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

  await page.locator("#name").fill("silva silva");
  await page.locator("input[name=email]").fill("teste@sa.com");

  page.getByRole("button", { name: "Quero entrar na fila" }).click();

  const toastText =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await expect(page.locator(".toast")).toHaveText(toastText);
  await expect(page.locator(".toast")).toBeHidden({ timeout: 4000 });
  //await page.waitForTimeout(1000);
});

test("deve cadastra com email errado ", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  //await page.click('//button[co( )="Aperte o play... se tiver coragem"]')

  page.getByRole("button", { name: /Aperte o play/ }).click();

  expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

  await page.locator("#name").fill("silva silva");
  await page.locator("input[name=email]").fill("testesa.com");

  page.getByRole("button", { name: "Quero entrar na fila" }).click();

  const error = "Email incorreto";

  await expect(page.locator(".alert")).toHaveText(error);

  await page.waitForTimeout(1000);
});

test("não deve validar campo email nao preenchido ", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  //await page.click('//button[co( )="Aperte o play... se tiver coragem"]')

  page.getByRole("button", { name: /Aperte o play/ }).click();

  expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );


  await page.locator("#name").fill("silva silva");
  page.getByRole("button", { name: "Quero entrar na fila" }).click();

  const error = "Campo obrigatório";

  await expect(page.locator(".alert")).toHaveText(error);



  await page.waitForTimeout(1000);
});

test("não deve validar campo nome nao preenchido ", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  //await page.click('//button[co( )="Aperte o play... se tiver coragem"]')

  page.getByRole("button", { name: /Aperte o play/ }).click();

  expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

    await page.locator("input[name=email]").fill("tes@tesa.com");



  page.getByRole("button", { name: "Quero entrar na fila" }).click();

  const error = "Campo obrigatório";

  await expect(page.locator(".alert")).toHaveText(error);



  await page.waitForTimeout(1000);
});


test("não deve validar campo nao preenchido ", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  //await page.click('//button[co( )="Aperte o play... se tiver coragem"]')

  page.getByRole("button", { name: /Aperte o play/ }).click();

  expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );




  page.getByRole("button", { name: "Quero entrar na fila" }).click();

  const error = "Campo obrigatório";

  await expect(page.locator(".alert")).toHaveText([
    "Campo obrigatório",
   "Campo obrigatório"
]);



  await page.waitForTimeout(1000);
});

