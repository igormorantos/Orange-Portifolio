const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const {addUser, login, detailUser, editUser} = require('../controllers/UserController');
const checkUserLogg = require('../middlewares/validations');

//User
routes.post('/add', addUser)
routes.get('/login', login)
routes.patch('/editUser', checkUserLogg, editUser)
routes.get('/detailUser', checkUserLogg, detailUser)


module.exports = routes