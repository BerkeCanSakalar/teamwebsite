const Clip = require('../models/Clip');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/views/public/uploads'); // Dosyaların kaydedileceği klasör
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Benzersiz dosya adı
  },
});

const upload = multer({ storage });

// Ana sayfaya klipleri gönder
exports.getClips = async (req, res) => {
  try {
    const clips = await Clip.find().sort({ createdAt: -1 });
    res.render('index', { clips });
  } catch (err) {
    res.status(500).send('Klipler yüklenirken bir hata oluştu.');
  }
};

// Tüm klipleri listele
exports.getAllClips = async (req, res) => {
  try {
    const clips = await Clip.find().sort({ createdAt: -1 });
    res.render('clips', { clips }); // Tüm klipleri göster
  } catch (error) {
    console.error(error);
    res.status(500).send('Klipler yüklenemedi.');
  }
};

exports.addClip = [
  upload.single('clip'), // Formdaki "clip" alanından dosya alır
  async (req, res) => {
    try {
      const newClip = new Clip({
        title: req.body.title,
        filePath: `/uploads/${req.file.filename}`, // Dosya yolu
      });
      await newClip.save();
      res.redirect('/admin/clips');
    } catch (err) {
      console.error('Klip eklenirken hata:', err.message);
      res.status(500).send('Klip eklenirken bir hata oluştu!');
    }
  },
];

// Klip düzenle
exports.editClip = [
  upload.single('clip'), // Yeni klip dosyasını al
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const clip = await Clip.findById(id);

      if (!clip) {
        return res.status(404).send('Klip bulunamadı.');
      }

      // Başlığı güncelle
      clip.title = title || clip.title;

      // Yeni bir dosya yüklendiyse, eski dosyayı sil ve yeniyi kaydet
      if (req.file) {
        const oldFilePath = path.join(__dirname, '../../src/views/public', clip.filePath);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Eski dosyayı sil
        }
        clip.filePath = `/uploads/${req.file.filename}`; // Yeni dosya yolunu kaydet
      }

      await clip.save();
      res.redirect('/admin/clips');
    } catch (err) {
      console.error('Klip düzenlenirken hata:', err.message);
      res.status(500).send('Klip düzenlenirken bir hata oluştu.');
    }
  }
];

// Klip sil
exports.deleteClip = async (req, res) => {
  try {
    const { id } = req.params;
    const clip = await Clip.findById(id);

    if (!clip) {
      return res.status(404).send('Klip bulunamadı.');
    }

    // Dosyayı dosya sisteminden sil
    const filePath = path.join(__dirname, '../../src/views/public', clip.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Clip.findByIdAndDelete(id); // Veritabanından klibi sil
    res.redirect('/admin/clips');
  } catch (err) {
    console.error('Klip silinirken hata:', err.message);
    res.status(500).send('Klip silinirken bir hata oluştu.');
  }
};
