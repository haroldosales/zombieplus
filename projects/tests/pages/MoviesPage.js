
const { test, expect } = require("@playwright/test");

export class MoviesPage {

    constructor(page) {
        this.page = page;
      }
    async isLoggedin() {
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveURL(/.*admin/);
      }

      async GoForm(){
        await this.page.locator('a[href$="register"]').click();

      }

      async submit() {
        await this.page.getByRole("button", { name: "Cadastrar" }).click();

      }

      async create(title,overview, company, release_year){
           await this.GoForm()
           await this.page.getByLabel("Titulo do filme").fill(title)
           await this.page.getByLabel("Sinopse").fill(overview)

           await this.page.locator('#select_company_id .react-select__indicator').click()

           await this.page.locator('.react-select__option').filter({ hasText: company }).click();


           await this.page.locator('#select_year .react-select__indicator').click();

           await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();

          await this.submit()
      } 


      async alertcontainTextNewFilms(target) {
        await expect(this.page.locator(".alert")).toContainText(target);
      }
}