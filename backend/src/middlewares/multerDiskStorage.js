const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "/xampp/htdocs/loginPage/backend/upload/" + req.userId;
    // Verifica se o diretório já existe
    if (!fs.existsSync(uploadPath)) {
      // Se não existir, cria o diretório
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = storage;
