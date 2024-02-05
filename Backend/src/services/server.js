const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');


dotenv.config();

const app = express();

app.use(cors({
    origin:'*',
}));

app.use(express.json());
app.use(routes)

module.exports = app;