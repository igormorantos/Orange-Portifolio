const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');


dotenv.config();

const app = express();

app.use(cors({
    origin: '*', // Allow requests from all origins (adjust as needed)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
  preflightContinue: true, // Handle OPTIONS preflight requests
}));


app.use(express.json());
app.use(routes)

module.exports = app;