require('dotenv').config()

const express = require('express');
const app = express();

app.use(express.json());


const api = require('./routes/api/v1/auth');
app.use('/api/v1/auth', api);

app.listen(3000, () => {
  console.log("Server started on port 3000")
});