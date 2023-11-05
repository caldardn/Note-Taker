const path = require('path');
const fs = require('fs');
const db=require('./db/db.json')
const api = require('./routes/index.js')
const uuid = require('uuid');
const express = require('express');
//sets the port to work on heroku
const PORT = process.env.PORT || 3001;
const app = express();

// setting up middleware using express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)
app.use(express.static('public'));

//computer is directed to the index.html 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')));