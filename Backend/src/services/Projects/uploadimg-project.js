const Project =  require('../../models/Project');
const S3StorageProvider = require('../../ImgStorageProvider/S3StorageProvider');
const uploadConfig = require('../../config/upload')

class UploadProjectImg extends S3StorageProvider {
    async execute({ project_id, projectImg }) {
        const project = await Project.findByPk(project_id);


        if(!project) {
            throw new Error('First you must select a valid Project');
        }

        if(project.coverphoto) {
            await this.deleteFile(project.coverphoto);
        }

        const fileName = await this.saveFile(projectImg);

        const projectObj = {
            coverphoto: `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`
        }

        const projectEdited = await project.update(projectObj);

        return projectEdited;
    }
}

module.exports = UploadProjectImg;