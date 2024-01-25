const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const {addUser, login} = require('../controllers/UserController');
const checkUserLog = require('../middlewares/validations');

//User
routes.post('/add', addUser)

routes.get('/login', login)


module.exports = routes