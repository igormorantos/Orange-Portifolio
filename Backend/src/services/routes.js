const express = require('express');
const routes = express();
const multer = require('multer');

const conn = require('../repository/connection');
const {addUser, login, detailUser, deleteUser, editUser} = require('../controllers/UserController');
const projectController = require('../controllers/ProjectController');
const checkUserLogg = require('../middlewares/validations');

const uploadConfig = require('../config/upload');
const upload = multer(uploadConfig.multer);

//User
routes.post('/add', addUser)
routes.get('/login', login)
routes.get('/detailUser', checkUserLogg, detailUser)
routes.patch('/editUser', checkUserLogg, editUser)
routes.delete('/deleteUser', checkUserLogg, deleteUser)

//Project
routes.post('/projects', checkUserLogg, projectController.create)
routes.get('/projects', projectController.read)
routes.delete('/projects/:id', checkUserLogg, projectController.delete)
routes.patch('/projects/:id', checkUserLogg, projectController.update)
routes.patch('/coverphoto/:id', upload.single('photo'), projectController.updateImg)


module.exports = routes