const { expect } = require("@playwright/test");

export class LandingPage {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000/");
  }

  async openModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();

    await expect(
      this.page.getByTestId("modal").getByRole("heading")
    ).toContainText("Fila de espera");
  }

  async submitLeadForm(name, email) {
    await this.page.locator("#name").fill(name);
    await this.page.locator("input[name=email]").fill(email);

    await this.page
      .getByRole("button", { name: "Quero entrar na fila" })
      .click();
  }

  async alertcontainText(target) {
    await expect(this.page.locator(".alert")).toContainText(target);
  }
}
