const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const {addUser, login, detailUser, deleteUser, editUser} = require('../controllers/UserController');
const projectController = require('../controllers/ProjectController');
const checkUserLogg = require('../middlewares/validations');

//User
routes.post('/add', addUser)
routes.get('/login', login)
routes.get('/detailUser', checkUserLogg, detailUser)
routes.patch('/editUser', checkUserLogg, editUser)
routes.delete('/deleteUser',checkUserLogg, deleteUser)

//Project
routes.post('/projects', projectController.create)
routes.get('/projects', projectController.read)
routes.delete('/projects/:id', projectController.delete)
routes.patch('/projects/:id', projectController.update)


module.exports = routes