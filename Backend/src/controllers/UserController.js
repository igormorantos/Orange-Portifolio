const cnn = require('../repository/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = require('../services/secretkey')

const addUser = async (req, res) => {
    try{
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

        return res.status(201).json(user)
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const login = async (req, res) =>{
    try{
        const { email, password } = req.body
        const user = await cnn.query('SELECT * FROM user WHERE email = :email', {
            replacements: { email },
            type: cnn.QueryTypes.SELECT
        });
        
        const passwordValid = await bcrypt.compare(password, user[0].password);
    
        if(user.length == 0 || !passwordValid){
            return res.status(404).json({ mensagem: 'Email ou senha invalida' });
        }

        const token =jwt.sign({ id: user[0].id }, secretkey, { expiresIn: '8h' });
        const{password: _, ...loggedUser} = user[0];
        
        return res.json({ usuario: loggedUser, token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const detailUser = async (req,res) => {
    return res.send(req.user)
}

const deleteUser = async (req, res) => {
   try{
    const user = req.user
    const id = user.id;

    const deleteUser = await cnn.query('DELETE FROM user WHERE id = :id', {
        replacements: { id },
        type: cnn.QueryTypes.DELETE
    });

    return res.status(401).json({ mensagem:"Conta Deletada" })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }

}


module.exports = {
    addUser,
    login,
    detailUser,
    deleteUser
}