const Project = require('../../models/Project');

async function updateProject(id, newData) {
    try {
      const project = await Project.findByPk(id);
  
      if (!project) {
        console.log('Projeto não encontrado.');
        return;
      }
  
      const projectEdited = await project.update(newData);

      return projectEdited;
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      throw error;
    }
}

/*
async function updateProject(data) {
    try {
        const project = await Project.create({
            title: data.title,
            tags: data.tags,
            link: data.link,
            description: data.description,
            coverphoto: data.coverphoto,
            fk_iduser: data.fk_iduser
        });

        return project;
    } catch (error) {
        console.error('Erro no cadastro:', error);
        throw new Error('Fail to register');
        // Aqui você pode retornar uma mensagem de erro ou fazer o que for apropriado
    }
} */

module.exports = updateProject;
