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


test('Nao deve cadastrar quando os campos obrigatóris não preencido', async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "pwd123");
  await page.movies.isLoggedin();
  await page.movies.GoForm()
  await page.movies.submit()
  await page.movies.alertcontainTextNewFilms([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])
});
