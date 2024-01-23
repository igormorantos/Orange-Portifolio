const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'orangedb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});
