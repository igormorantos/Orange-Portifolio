const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const {addUser, login, detailUser, deleteUser} = require('../controllers/UserController');
const checkUserLog = require('../middlewares/validations');

//User
routes.post('/add', addUser)
routes.get('/login', login)
routes.get('/detailUser', checkUserLog, detailUser)
routes.delete('/deleteUser', checkUserLog, deleteUser)


module.exports = routes