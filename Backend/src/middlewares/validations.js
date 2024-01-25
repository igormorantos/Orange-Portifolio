const jwt = require('jsonwebtoken')
const cnn = require('../repository/connection')
const secretkey = require('../services/secretkey')


const checkUserLog = async (req,res) => {
    try {
        const authorization = req.headers.authorization
    
        if (!authorization) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }
    
        const token = authorization.split(' ')[1];
        const tokenUser = jwt.verify(token, secretkey);
        const id = tokenUser.id
        
        const user = await cnn.query('SELECT * FROM user WHERE id = :id', {
            replacements: { id },
            type: cnn.QueryTypes.SELECT
        });

        req.user = {
            id:user[0].id,
            first_name:user[0].firstName,
            last_name:user[0].lastName,
            email:user[0].email,
            password:user[0].password,
            perfil_photo:user[0].perfilPhoto,
            country:user[0].country
        }

        next();  //tem que ser inserido na rota para testar
    }
    catch(error){
        res.status(401).json({mensagem: error})
    }
}

module.exports = checkUserLog