const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const addUser = require('../controllers/UserController')

//User
routes.post('/add', addUser)

module.exports = routes