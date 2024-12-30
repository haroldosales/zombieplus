// @ts-che
const { test, expect } = require("@playwright/test");
const exp = require("constants");
const { LeadingPage } = require("../pages/LeadingPage");

test("deve cadastra um lead na fila de esperar", async ({ page }) => {
const leadPage = new LeadingPage(page);
 await leadPage.visit();
  await leadPage.openModal();
  await leadPage.submitLeadForm("test","silva@silva.com");
  await leadPage.toastHaveText("Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!");
});

test("deve cadastra com email errado ", async ({ page }) => {
  const leadPage = new LeadingPage(page);
  await leadPage.visit();
   await leadPage.openModal();
   await leadPage.submitLeadForm("test","silva");

  const error = "Email incorreto";

 await leadPage.alertHaveText(error)

  await page.waitForTimeout(1000);
});

test("não deve validar campo email nao preenchido ", async ({ page }) => {
  const leadPage = new LeadingPage(page);
  await leadPage.visit();
   await leadPage.openModal();
   await leadPage.submitLeadForm("test","")
  const error = "Campo obrigatório";

  await leadPage.alertHaveText(error)



  await page.waitForTimeout(1000);
});

test("não deve validar campo nome nao preenchido ", async ({ page }) => {
  const leadPage = new LeadingPage(page);
  await leadPage.visit();
   await leadPage.openModal();
   await leadPage.submitLeadForm("","silva@sas.com")

  const error = "Campo obrigatório";

  await leadPage.alertHaveText(error);

});


test("não deve validar campo nao preenchido ", async ({ page }) => {
  const leadPage = new LeadingPage(page);
  await leadPage.visit();
   await leadPage.openModal();
   await leadPage.submitLeadForm('', '');


  const error = "Campo obrigatório";

  await leadPage.alertHaveText([
    "Campo obrigatório",
   "Campo obrigatório"
]);



  await page.waitForTimeout(1000);
});

