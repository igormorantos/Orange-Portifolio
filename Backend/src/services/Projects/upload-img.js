const S3StorageProvider = require('../../ImgStorageProvider/S3StorageProvider');
const uploadConfig = require('../../config/upload');

class UploadImg extends S3StorageProvider {
    async execute(projectImg) {
        const fileName = await this.saveFile(projectImg);

        const coverPhoto = `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`;

        return coverPhoto;
    }
}

module.exports = UploadImg;