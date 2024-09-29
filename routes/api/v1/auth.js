const express = require('express');
const router = express.Router();

const { register, login, logout } = require("./auth_sql.js")

router.post('/register', async (req, res) => {
  const { username, profile_image, user_password, email, phone_number } = req.body;
  // const { username, profile_image, user_password, email, phone_number } = 
  // { 
  //   username: "name",
  //   profile_image: "pfp",
  //   user_password: "password",
  //   email: "email",
  //   phone_number: "number"
  // };
  return register(res, username, profile_image, user_password, email, phone_number);
});

router.post('/login', async (req, res) => {
  const { username, user_password } = req.body;
  // const { username, user_password } = 
  // { 
  //   username: "name1",
  //   user_password: "password"
  // };
  return login(res, username, user_password);
});

router.post('/logout', async (req, res) => {
  const { username} = req.body;
  // const { username} =
  // {
  //   username: "name1",
  // };
  return logout(res, username);
});

module.exports = router;