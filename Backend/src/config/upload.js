const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

/*interface IUploadConfig {
    driver: 's3' | 'disk';

    tmpFolder: string;
    uploadsFolder: string;

    multer: {
        storage: multer.StorageEngine;
    }

    config: {
        aws: {
            bucket: string;
        }
    }
} */

const IUploadConfig = {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder,

    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    },

    config: {
        aws: {
            bucket: 'gb-softwares',
        },
    },
}

module.exports = IUploadConfig;