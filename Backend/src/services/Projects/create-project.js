const Project = require('../../models/Project');

async function createProject(data) {
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
}

module.exports = createProject;
