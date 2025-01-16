const { test, expect } = require("../suport/");

const data = require("../suport/fixtures/movies.json");

const { execute } = require("../suport/database");

test("deve poder cadastra um novo filme", async ({ page }) => {
  const move = data.create;

  await execute(`Delete from movies WHERE title = '${move.title}';`);
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "pwd123");
  await page.movies.isLoggedin();

  await page.movies.create(
    move.title,
    move.overview,
    move.company,
    move.release_year
  );

  await page.toast.containText("Cadastro realizado com sucesso!");
});
