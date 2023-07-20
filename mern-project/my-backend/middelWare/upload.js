const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'image');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });


module.exports = Storage