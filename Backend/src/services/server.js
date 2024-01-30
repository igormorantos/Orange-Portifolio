const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5500', // Especificando a origem permitida
}));

app.use(express.json());
app.use(routes)

module.exports = app;