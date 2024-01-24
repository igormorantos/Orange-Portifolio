const pool = require('../repository/connection')



const login = async (req, res) => {
    res.send("teste de rotas")
}

const addProject = async (req, res) => {
    res.send("teste 2")
}


module.exports = login, addProject