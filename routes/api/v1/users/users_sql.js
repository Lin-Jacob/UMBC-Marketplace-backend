module.exports = { get_user, change_user, delete_user };

const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbdatabase
});

function get_user(res, id){
  const sql = 'SELECT * FROM umbcmarketplace.users WHERE id = ?';
  db.query(sql,[id], (err, result) => {
    if (err) {
      return res.status(500).send("An error occurred while getting the user.");
    }
    return res.json(result[0]);
  });
}

function change_user(res, id, username, profile_image, user_password, email, phone_number){
  let fields = [];
  if (username) fields.push(`username = '${username}'`);
  if (profile_image) fields.push(`profile_image = '${profile_image}'`);
  if (user_password) fields.push(`user_password = '${user_password}'`);
  if (email) fields.push(`email = '${email}'`);
  if (phone_number) fields.push(`phone_number = '${phone_number}'`);

  const sql = `UPDATE umbcmarketplace.users SET ${fields.join(', ')} WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send("An error occurred while changing the user.");
    }
    return res.json({success : true});
  });
}

function delete_user(res, id){
  const sql = 'DELETE FROM umbcmarketplace.users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send("An error occurred while deleting the user.");
    }
    return res.json({ success: true });
  });
}