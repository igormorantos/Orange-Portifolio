const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const {addUser, login, detailUser, deleteUser, editUser} = require('../controllers/UserController');
const checkUserLogg = require('../middlewares/validations');

//User
routes.post('/add', addUser)
routes.get('/login', login)
routes.get('/detailUser', checkUserLogg, detailUser)
routes.patch('/editUser', checkUserLogg, editUser)
routes.delete('/deleteUser',checkUserLogg, deleteUser)


module.exports = routes