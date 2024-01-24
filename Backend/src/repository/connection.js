const sequelize = require('sequelize');
const conn = new sequelize("orangedb", "root", "admin123", {
    host: 'localhost',
    dialect: 'mysql'
})

conn.authenticate()
.then(function(){
    console.log("conexão realizada com sucesso");
}).catch(function(){
    console.log("Erro conexão com o banco não realizada");
})

module.exports = conn