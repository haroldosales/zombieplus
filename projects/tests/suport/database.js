const { Pool } = require("pg");

const DbCOnfig = {
  user: "postgres",
  host: "localhost",
  database: "zombiesplus",
  password: "pwd123",
  port: "5432"
};

export async function execute(sqlScript) {
  try {
    const pool = new Pool(DbCOnfig);
    const cliente = await pool.connect();
    const result = await cliente.query(sqlScript);

    console.log(result.rows);
  } catch (error) {
    console.log("Error ao excuta sql" + error);
  }
}
