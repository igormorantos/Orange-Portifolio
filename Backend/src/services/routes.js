const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const {addUser, login, detailUser, deleteUser, editUser, teste} = require('../controllers/UserController');
const checkUserLogg = require('../middlewares/validations');

//User
routes.post('/add', addUser)
routes.post('/login', login)
routes.get('/detailUser', checkUserLogg, detailUser)
routes.patch('/editUser', checkUserLogg, editUser)
routes.delete('/deleteUser',checkUserLogg, deleteUser)
routes.get('/',teste)


module.exports = routes