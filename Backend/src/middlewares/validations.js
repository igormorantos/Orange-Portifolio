const jwt = require('jsonwebtoken')
const cnn = require('../repository/connection')
const secretkey = require('../services/secretkey')


const checkUserLogg = async (req, res, next) => {
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

        if (!user) {
            return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
        }

        req.user = {
            id: user[0].id,
            first_name:user[0].firstName,
            last_name:user[0].lastName,
            email:user[0].email,
            password:user[0].password,
            perfil_photo:user[0].perfilPhoto,
            country:user[0].country
        }
    }
    catch(error){
        res.status(401).json({mensagem: error})
    }

    next();
}

module.exports = checkUserLogg