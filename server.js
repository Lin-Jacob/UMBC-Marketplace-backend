require('dotenv').config()

const express = require('express');
const app = express();

app.use(express.json());


const auth_api = require('./routes/api/v1/auth.js');
app.use('/api/v1/auth', auth_api);

const user_api = require('./routes/api/v1/users.js')
app.use('/api/v1/users', user_api);

app.listen(3000, () => {
  console.log("Server started on port 3000")
});