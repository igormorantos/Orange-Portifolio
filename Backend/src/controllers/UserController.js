const cnn = require('../repository/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../services/secretkey')


const addUser = async (req, res) => {
    const { firstName, lastName, email, password} = req.body

    const salt = await bcrypt.genSalt(10);
    const criptpass = await bcrypt.hash(password, salt);
    const newUser = await cnn.query('INSERT INTO user (firstName, lastName, email, password) VALUES (:firstName, :lastName, :email, :password)', {
        replacements: { firstName, lastName, email, password: criptpass },
        type: cnn.QueryTypes.INSERT
    });

    const user = await cnn.query('SELECT * FROM user WHERE email = :email', {
        replacements: { email },
        type: cnn.QueryTypes.SELECT
    });

    res.status(201).json(user)
}


module.exports = addUser