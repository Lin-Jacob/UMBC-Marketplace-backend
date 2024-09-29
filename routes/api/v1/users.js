const express = require('express');
const router = express.Router();

let { get_user, change_user, delete_user } = require("./users/users_sql.js");

router.get('/:id', (req, res) => {
  return get_user(res, req.params.id);
});

router.put('/:id', (req, res) => {
  let { username, profile_image, user_password, email, phone_number } = req.body;
  return change_user(
    res, 
    req.params.id, 
    username ? username : "",
    profile_image ? profile_image : "",
    user_password ? user_password : "",
    email ? email : "",
    phone_number ? phone_number : ""
  );
});

router.delete('/:id', (req, res) => {
  return delete_user(res, req.params.id);
});
module.exports = router;