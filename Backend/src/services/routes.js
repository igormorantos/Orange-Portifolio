const express = require('express');
const routes = express();
const multer = require('multer');

const conn = require('../repository/connection');
const {addUser, login, detailUser, deleteUser, editUser, teste} = require('../controllers/UserController');
const projectController = require('../controllers/ProjectController');
const imgController = require('../controllers/Imgcontroller');
const checkUserLogg = require('../middlewares/validations');

const uploadConfig = require('../config/upload');
const upload = multer(uploadConfig.multer);

//User
routes.get('/', teste)
routes.post('/add', addUser)
routes.post('/login', login)
routes.get('/detailUser', checkUserLogg, detailUser)
routes.patch('/editUser', checkUserLogg, editUser)
routes.delete('/deleteUser', checkUserLogg, deleteUser)

//Project
routes.post('/projects', checkUserLogg, projectController.create)
routes.get('/projects', checkUserLogg, projectController.read)
routes.delete('/projects/:id', checkUserLogg, projectController.delete)
routes.patch('/projects/:id', checkUserLogg, projectController.update)
routes.patch('/coverphoto/:id', upload.single('photo'), checkUserLogg, projectController.updateImg)

//Img 
routes.post('/img', upload.single('photo'), checkUserLogg, imgController.create)


module.exports = routes