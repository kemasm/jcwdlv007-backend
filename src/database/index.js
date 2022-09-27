
const mysql = require("mysql");
const util = require("util");
const {
  MYSQL_DB_NAME,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
} = require("../configs/db");

const db = mysql.createPool({
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB_NAME,
  port: MYSQL_PORT,
});

const dbQuery = util.promisify(db.query).bind(db);
module.exports = { db, dbQuery };
