const createProject = require('../services/Projects/create-project');
const updateProject = require('../services/Projects/update-projetc');
const updateImgProject = require('../services/Projects/uploadimg-project');

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

  async updateImg(req, res) {
    const { id } = req.params;

    try {
      const projectLoadImg = new updateImgProject();

      const coverPhoto = await projectLoadImg.execute({
        project_id: id,
        projectImg: req.file.filename
      });

      return res.json(coverPhoto);
    } catch(error) {
      return res.status(401).send('Não foi possível atualizar a imagem');
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