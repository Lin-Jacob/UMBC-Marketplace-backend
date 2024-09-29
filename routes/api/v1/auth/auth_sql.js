module.exports = { register, login, logout };

const { hashPassword, compare } = require('./auth_helper.js');

const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbdatabase
});

db.connect((err) => {
  if (err) {
    console.error(err);
    return res.status(500).send("An error occurred while connecting the database.");
  }
  console.log("mySQL connected for users");
});

async function register(res, username, user_password, email, phone_number){
  const sql = `INSERT INTO umbcmarketplace.users (username, user_password, email, phone_number) VALUES (?, ?, ?, ?);`;
  db.query(sql, [username, await hashPassword(user_password), email, phone_number], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log("ALREADY REGISTERED");
        return res.status(400).send("Username already exists. Please choose a different username.");
      }
      console.error(err);
      return res.status(500).send("An error occurred while registering the user.");
    }
    //console.log(result);
    const getObj = 'SELECT * FROM umbcmarketplace.users WHERE id = ?'
    db.query(getObj, [result.insertId], async (err2, result2) => {
      if (err2) {
        console.error(err2);
        return res.status(500).send("An error occurred while getting the registered user.");
      }
      //console.log(result2[0]);
      return res.json(result2[0]);
    });
  });
}

async function login(res, username, password) {
  const sql = "SELECT user_password FROM umbcmarketplace.users WHERE username = ?";
  db.query(sql, [username], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(500).send("An error occurred while logging in the user, the username does not exist");
    }
    const hashed_password = result[0].user_password;
    if (await compare(password, hashed_password)) {
      const getObj = "SELECT username, profile_image, email, phone_number FROM umbcmarketplace.users WHERE username = ?";
      db.query(getObj, [username], (err2, result2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).send("An error occurred while getting the logged in user.");
        }
        
        //console.log(result2[0])
        return res.json(result2[0]);
      });
    } else {
      return res.status(400).send("Password is incorrect");;
    }
  });
}

function logout(res, username){
  const sql = "UPDATE umbcmarketplace.users SET cookie = NULL WHERE username = ?"
  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).send("An error occurred while logging out the user.");
    }
    return res.json({success: true})
  });
}