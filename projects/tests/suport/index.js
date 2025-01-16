const { test: base, expect } = require("@playwright/test");

const { LandingPage } = require("../pages/LandingPage");
const { ToastComponent } = require("../pages/components/ToastCompenent");
const { LoginPage } = require("../pages/LoginPage");
const { MoviesPage } = require("../pages/MoviesPage");


const test = base.extend({
    page: async  ({ page }, use) => {     

        const context = page

        context['landing'] = new LandingPage(page)
        context['login'] = new LoginPage(page)
        context['movies'] = new MoviesPage(page)
        context['toast'] = new ToastComponent(page)

        await use(context)
    }
})

export { test, expect }