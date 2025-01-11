const { test, expect } = require("../suport/");
const { faker } = require("@faker-js/faker");



test("deve cadastra um lead na fila de esperar", async ({ page }) => {
  const Leadname = faker.person.fullName();
  const Leademail = faker.internet.email();

  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm(Leadname, Leademail);
  await page.toast.containText(
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  );
});

test("nao deve cadastra se o email ja existe", async ({ page, request }) => {
  const Leadname = faker.person.fullName();
  const Leademail = faker.internet.email();
  const newLead = await request.post("http://localhost:3333/leads", {
    data: {
      name: Leadname,
      email: Leademail,
    },
  });

  expect(newLead.ok()).toBeTruthy();

  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm(Leadname, Leademail);
  await page.toast.containText(
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera."
  );
});

test("deve cadastra com email errado ", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm("test", "silva");

  await page.landing.alertcontainText("Email incorreto");

});

test("não deve validar campo email nao preenchido ", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm("test", "");

  await page.landing.alertcontainText("Campo obrigatório");

});

test("não deve validar campo nome nao preenchido ", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm("", "silva@sas.com");

  await page.landing.alertcontainText("Campo obrigatório");
});

test("não deve validar campo nao preenchido ", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm("", "");

  await page.landing.alertcontainText(["Campo obrigatório", "Campo obrigatório"]);

});
