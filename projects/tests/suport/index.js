const { test: base, expect } = require("@playwright/test");

const { LandingPage } = require("../pages/LandingPage");
const { ToastComponent } = require("../pages/components/ToastCompenent");
const { LoginPage } = require("../pages/LoginPage");
const { MoviesPage } = require("../pages/MoviesPage");


const test = base.extend({
    page: async  ({ page }, use) => {     
        await use({
            ...page,
            landing: new LandingPage(page),
            login : new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new ToastComponent(page)
        })
    }
})

export { test, expect }