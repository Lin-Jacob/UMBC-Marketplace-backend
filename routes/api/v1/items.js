const express = require('express');
const router = express.Router();

let { get_listing, make_listing } = require("./items/items_sql.js");

router.get('/:id', (req, res) => {
  return get_listing(res, req.params.id);
});

router.post('/list_item', (req, res) => {
  //const { item_name, poster_id, category, item_description, price, item_condition, images, item_status, contact } = req.body;
  const { item_name, poster_id, category, item_description, price, item_condition, images, item_status, contact } = {
    item_name: "item",
    poster_id: 2, 
    category: 'furniture', 
    item_description: "Cool",
    price: 18.52, 
    item_condition: "new", 
    images : {images: ['image1']}, 
    item_status: 'active', 
    contact: "4437079839"
  }
  return make_listing(res, item_name, poster_id, category, item_description, price, item_condition, images, item_status, contact);
});

router.get("/")

module.exports = router;