require('dotenv').config()

const fs = require('fs');
const cors = require('cors')
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

const auth_api = require('./routes/api/v1/auth.js');
app.use('/api/v1/auth', auth_api);

const user_api = require('./routes/api/v1/users.js');
app.use('/api/v1/users', user_api);

const items_api = require('./routes/api/v1/items.js');
app.use('/api/v1/items', items_api);

app.get('/', (req, res) => {
  res.status(200).send("OK!");
});

app.listen(80, () => {
  console.log("Server started on port 80")
});