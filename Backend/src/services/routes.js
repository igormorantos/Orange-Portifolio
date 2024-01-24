const express = require('express');
const routes = express();
const conn = require('../repository/connection');
const login = require('../controllers/UserController');
const addProject = require('../controllers/UserController')


routes.get('/login', login)

routes.post('/addProject', addProject)

module.exports = routes