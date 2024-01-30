const createProject = require('../services/Projects/create-project');
const updateProject = require('../services/Projects/update-projetc');
const Project = require('../models/Project');

class ProjectController {
  async create(req, res) {
    const data = req.body;

    try {
        const project = await createProject(data);

        return res.json(project);
    } catch(error) {
        return res.status(400).send('Falha ao cadastrar');
    }
  }

  async read(req, res) {
    try {
      const projects = await Project.findAll();

      return res.json(projects);
    } catch (error) {
      return res.send('Nothing here!');
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const newData = req.body;

    try {
      const project = await updateProject(id, newData);

      return res.json(project);
    } catch(error) {
      return res.status(401).send('Não foi possível atualizar');
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const project = await Project.findByPk(id);

      if (!project) {
        console.log('Projeto não encontrado.');
        return;
      }

      await project.destroy();
      return res.status(200).send();
    } catch(error) {
      return res.status(401).send('Project doesnt found.')
    }
  }
}

module.exports = new ProjectController();