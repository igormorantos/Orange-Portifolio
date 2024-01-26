const express = require('express');
const routes = require('./routes')
const cors = require('cors')

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
  }));
  
app.use(express.json());
app.use(routes)

module.exports = app;