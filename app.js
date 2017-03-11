'use strict'
//server setup
const PORT = 3000;
const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(PORT,() => {
  console.log('App listeing on port '+ PORT);
})