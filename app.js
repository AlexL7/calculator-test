'use strict'
//server setup
const express = require('express');
const app = express();

//Only need one request to homepage
app.set("view engine", "pug");
app.get('/', function (req, res){
  res.render('index');
});

app.listen(3000, function() {
  console.log('App listeing on port 3000');
})