const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect DB
mongoose.connect(url).then(()=>{
  console.log('Connected successfully.');
  app.listen(process.env.PORT);
}, (err) => {
  console.log('Connection to db failed: ' + err);
});

// API
app.use('/api', router);

