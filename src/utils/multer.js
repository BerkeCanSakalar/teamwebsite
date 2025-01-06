const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads'); // Yüklemelerin kaydedileceği klasör
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Benzersiz dosya ismi
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Maksimum 100MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /mp4|avi|mov|wmv/; // İzin verilen dosya türleri
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Sadece video dosyaları yüklenebilir!'));
    }
  },
});

module.exports = upload;
