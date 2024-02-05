const sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const passDB = process.env.PASS
const userDB = process.env.USER
const nameDB = process.env.NAMEDB
const host = process.env.HOST
const db = process.env.DIALECT

const conn = new sequelize(nameDB, userDB, passDB, {
    host:host,
    dialect:db
})

conn.authenticate()
.then(function(){
    console.log("conexão realizada com sucesso");
}).catch(function(){
    console.log("conexão não realizada");
})

module.exports = conn