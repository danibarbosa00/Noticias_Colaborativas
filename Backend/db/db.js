const mysql = require("mysql2/promise");
require("dotenv").config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;
let pool;
const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 100,
      port: MYSQL_PORT,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: "Z",
    });
  }
  return await pool.getConnection();
};

module.exports = {
  getConnection,
};
