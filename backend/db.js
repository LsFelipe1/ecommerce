const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce", //nome do db
  password: "tsugikuni1",
  port: 5432,
  options: "-c search_path=public", // Adicione esta linha
});

module.exports = pool;
