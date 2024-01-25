const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const {addUser, login} = require('../controllers/UserController');

//User
routes.post('/add', addUser)

routes.get('/login', login)

module.exports = routes