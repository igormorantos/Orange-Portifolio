const cnn = require('../repository/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();


const addProject = async (req, res) => {
    try{
        const { title, link, tags, description, coverphoto, fk_iduser} = req.body
        
        if(!title || !link || !tags || !description){
            return res.status(401).json({ mensagem: "Todos os dados precisam ser preenchidos para criar projeto!" });
        }

        const newUser = await cnn.query('INSERT INTO project (title, link, tags, description, coverphoto, fk_iduser) VALUES (:title, :link, :tags, :description, :coverphoto, :fk_iduser)', {
            replacements: { title, link, tags, description, coverphoto, fk_iduser },
            type: cnn.QueryTypes.INSERT
        });

        return res.status(201).json({mensagem: "projeto criado"})
    }
    catch(error){
        console.log(error);
        return res.status(500).send(error)
    }
}

const readProject = async (req,res) => {
    try{
        // **Capturando o valor do parâmetro :id**
    const fk_iduser = req.params.id;

    // **Consultando o projeto no banco de dados**
    const project = await cnn.query('SELECT * FROM project WHERE fk_iduser = :fk_iduser', {
      replacements: { fk_iduser },
      type: cnn.QueryTypes.SELECT,
    });

    // **Verificando se o projeto foi encontrado**
    if (!project) {
      return res.status(404).json({ mensagem: "Projeto não encontrado" });
    }

    // **Retornando o projeto encontrado**
    return res.status(200).json(project);
  } catch (error) {
    res.json(error);
  }
        return res.status(201).json({project, mensagem: "projeto carregados"})
}

const deleteProject = async (req,res) => {
    try{

    const id = req.params.id;


    const project = await cnn.query('DELETE FROM project WHERE id = :id', {
      replacements: { id },
      type: cnn.QueryTypes.SELECT,
    });

    if (!project) {
      return res.status(404).json({ mensagem: "Projeto não encontrado" });
    }


    return res.status(200).json(project);
  } catch (error) {
    res.json(error);
  }
        return res.status(201).json({project, mensagem: "projeto deletado"})
}

const editProject = async (req,res) => {
   try{
    
    const id = req.params.id;
    const { title, link, tags, description, coverphoto} = req.body;

    let updateProject = {};
    if (title) updateProject.title = title;
    if (link) updateProject.link = link;
    if (description) updateProject.description = description;
    if (coverphoto) updateProject.coverphoto = coverphoto;

    await cnn.query(`UPDATE project SET ${Object.keys(updateProject).map(key => `${key} = :${key}`).join(', ')} WHERE id = :id`,
    {
        replacements: { ...updateProject, id },
        type: cnn.QueryTypes.UPDATE
    })

    console.log(updateProject)
        
    res.status(200).json("projeto editado");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
module.exports = {
    
    addProject,
    readProject,
    deleteProject,
    editProject
}