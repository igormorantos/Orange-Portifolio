const aws = require('aws-sdk');
const fs = require('fs');
const Mime = require('mime');
const path = require('path');

const uploadConfig = require('../config/upload');

class DiskStorageProvider {
    client;
    constructor() {
        this.client = new aws.S3({
            region: 'us-east-2',
        });
    }

    async saveFile(file) {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file);

        const ContentType = Mime.getType(originalPath);

        if (!ContentType) {
            throw new Error('File not found');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client
            .putObject({
                Bucket: 'gb-softwares',
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
                ContentDisposition: `inline; filename=${file}`,
            })
            .promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    async deleteFile(file) {
        await this.client
            .deleteObject({
                Bucket: 'gb-softwares',
                Key: file,
            })
            .promise();
    }
}

module.exports = DiskStorageProvider;
