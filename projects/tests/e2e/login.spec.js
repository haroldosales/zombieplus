const { test, expect } = require("../suport");


test("deve Logar como admin", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "pwd123");
  await page.movies.isLoggedin();
});

test(" nao deve Logar senha incorreta", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "abc123");

  const messege =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
  await page.toast.containText(messege);
});

test(" nao deve Logar email nao valido ", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("emailvainvalido", "abc123");

  await page.login.alertLogicontainText("Email incorreto");
});

test(" nao deve Logar email nao é preenchido", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("", "abc123");

  await page.login.alertLogicontainText("Campo obrigatório");
});

test(" nao deve Logar senha nao é preeenchida ", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("qa@max.com", "");

  await page.login.alertLogicontainText("Campo obrigatório");
});

test(" nao deve Logar sem nenhum campo preeenchida ", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("", "");

  await page.login.alertLogicontainText(["Campo obrigatório", "Campo obrigatório"]);
});
