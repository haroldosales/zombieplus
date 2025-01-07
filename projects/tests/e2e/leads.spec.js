// @ts-che
const { test, expect } = require("@playwright/test");
const { faker } = require('@faker-js/faker');
const exp = require("constants");
const { LandingPage } = require("../pages/LandingPage");
const { ToastComponent } = require("../pages/components/ToastCompenent");

let leadPage;
let toast;
test.beforeEach(async ({ page }) => {
  leadPage = new LandingPage(page);
  toast = new ToastComponent(page);
});

test("deve cadastra um lead na fila de esperar", async ({ page }) => {

  const Leadname = faker.person.fullName();
  const Leademail = faker.internet.email();
  await leadPage.visit();
  await leadPage.openModal();
  await leadPage.submitLeadForm(Leadname, Leademail);
  await toast.haveText(
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  );
});

test("deve cadastra com email errado ", async ({ page }) => {
  await leadPage.visit();
  await leadPage.openModal();
  await leadPage.submitLeadForm("test", "silva");

  await leadPage.alertHaveText("Email incorreto");

  await page.waitForTimeout(1000);
});

test("não deve validar campo email nao preenchido ", async ({ page }) => {
  await leadPage.visit();
  await leadPage.openModal();
  await leadPage.submitLeadForm("test", "");

  await leadPage.alertHaveText("Campo obrigatório");

  await page.waitForTimeout(1000);
});

test("não deve validar campo nome nao preenchido ", async ({ page }) => {
  await leadPage.visit();
  await leadPage.openModal();
  await leadPage.submitLeadForm("", "silva@sas.com");

  await leadPage.alertHaveText("Campo obrigatório");
});

test("não deve validar campo nao preenchido ", async ({ page }) => {
  await leadPage.visit();
  await leadPage.openModal();
  await leadPage.submitLeadForm("", "");

  await leadPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);

  await page.waitForTimeout(1000);
});
