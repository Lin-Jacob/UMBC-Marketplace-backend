module.exports = { get_listing, make_listing };

const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbdatabase
});

function get_listing(res, id){
  const sql = "SELECT * FROM umbcmarketplace.listings WHERE listing_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send("An error occurred while getting the item.");
    }
    return res.json(result[0]);
  });
}

function make_listing(res, item_name, poster_id, category, item_description, price, item_condition, images, item_status, contact){
  const sql = `INSERT INTO umbcmarketplace.listings (item_name, poster_id, category, item_description, price, item_condition, images, item_status, contact) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  db.query(sql, [item_name, poster_id, category, item_description, price, item_condition, images, item_status, contact], (err, result) => {
    if (err) {
      return res.status(500).send("An error occurred while listing the item.");
    }
    const getObj = 'SELECT * FROM umbcmarketplace.listings WHERE listing_id = ?'
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