module.exports = { register, login, logout };

const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbdatabase
});

