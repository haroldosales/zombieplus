const { expect } = require("@playwright/test");

export class LandingPage {

    constructor(page){
        this.page = page;
    }


  async visit() {
     await this.page.goto("http://localhost:3000/");
  }

  async openModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();

    await expect(this.page.getByTestId("modal").getByRole('heading')).toHaveText("Fila de espera");
  }


  async submitLeadForm(name, email) {
    await this.page.locator("#name").fill(name);
    await this.page.locator("input[name=email]").fill(email);

  await  this.page.getByRole("button", { name: "Quero entrar na fila" }).click();
  }

  async toastHaveText(messege) {
    // const toastText =
    //   "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
    await expect(this.page.locator(".toast")).toHaveText(messege);
    await expect(this.page.locator(".toast")).not.toBeVisible({ timeout: 6000 });
  }

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target);
  
   }
  
  
}



