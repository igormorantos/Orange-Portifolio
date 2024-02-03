const UploadImg = require('../services/Projects/upload-img');

class ImgController {
    async create(req, res) {   
        try {
          const uploadImg = new UploadImg();
    
          const coverPhoto = await uploadImg.execute(req.file.filename);
    
          return res.send(coverPhoto);
        } catch(error) {
          return res.status(401).send('Não foi possível carregar a imagem');
        }
      }
}

module.exports = new ImgController();