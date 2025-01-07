// @ts-che
const { test, expect } = require("@playwright/test");
const { ToastComponent } = require("../pages/components/ToastCompenent");
const { LoginPage } = require("../pages/LoginPage");
const { MoviesPage } = require("../pages/MoviesPage")
let toast;
let moviesPage
let loginPage;

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page);
  toast = new ToastComponent(page);
  moviesPage = new MoviesPage(page)
});

test("deve Logar como admin", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submit("admin@zombieplus.com", "pwd123");
  await moviesPage.isLoggedin();
});

test(" nao deve Logar senha incorreta", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submit("admin@zombieplus.com", "abc123");

  const messege =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
  await toast.haveText(messege);
});

test(" nao deve Logar email nao valido ", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submit("emailvainvalido", "abc123");

  await loginPage.alertLogiHaveText("Email incorreto");
});

test(" nao deve Logar email nao é preenchido", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submit("", "abc123");

  await loginPage.alertLogiHaveText("Campo obrigatório");
});

test(" nao deve Logar senha nao é preeenchida ", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submit("qa@max.com", "");

  await loginPage.alertLogiHaveText("Campo obrigatório");
});

test(" nao deve Logar sem nenhum campo preeenchida ", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submit("", "");

  await loginPage.alertLogiHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
