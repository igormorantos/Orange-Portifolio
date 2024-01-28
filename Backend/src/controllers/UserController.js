const cnn = require('../repository/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();


const addUser = async (req, res) => {
    try{
        const { firstName, lastName, email, password} = req.body
        
        if(!firstName || !lastName || !email || !password){
            return res.status(401).json({ mensagem: "Todos os dados precisam ser preenchidos para criar a conta!" });
        }

        const emailExist = await cnn.query('SELECT * FROM user WHERE email = :email', {
            replacements: { email },
            type: cnn.QueryTypes.SELECT
        });

        if (emailExist.length >= 1) {
                return res.status(401).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
        }

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

        return res.status(201).json({user, mensagem: "usuario criado"})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const login = async (req, res) =>{
    try{
        const { email, password } = req.body
        const secretkey = process.env.SECRETKEY

        if(!email || !password) {
            return res.status(401).json({ mensagem: "Todos os dados precisam ser preenchidos para criar a conta!" });
        }

        const user = await cnn.query('SELECT * FROM user WHERE email = :email', {
            replacements: { email },
            type: cnn.QueryTypes.SELECT
        });
        
        if(user.length == 0) {
            return res.status(401).json({ mensagem: "Usuario incorreto ou não existe!" });
        }

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

const editUser = async (req, res) => {
    try {
        const user = req.user;
        const { firstName, lastName, email, password, perfilPhoto, country } = req.body;
        const id = user.id;
    
        let updateUser = {};
        if (firstName) updateUser.firstName = firstName;
        if (lastName) updateUser.lastName = lastName;
        if (email) {
            const emailExist = await cnn.query('SELECT * FROM user WHERE email = :email', {
                replacements: { email },
                type: cnn.QueryTypes.SELECT
            });
    
            if (emailExist.length >= 1) {
                return res.status(401).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
            }
            updateUser.email = email;
        }
        
        if (password) {
            const passCript = await bcrypt.hash(password, 10);
            updateUser.password = passCript;
        }
        if (perfilPhoto) updateUser.perfilPhoto = perfilPhoto;
        if (country) updateUser.country = country;
    
        await cnn.query(`UPDATE user SET ${Object.keys(updateUser).map(key => `${key} = :${key}`).join(', ')} WHERE id = :id`,
        {
            replacements: { ...updateUser, id },
            type: cnn.QueryTypes.UPDATE
        })
            
        res.status(201).json(updateUser);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }    
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

const teste = async (req,res) => {
    res.status(201).send("servidor esta funcionando ")
}

module.exports = {
    addUser,
    login,
    detailUser,
    editUser,
    deleteUser,
    teste
}