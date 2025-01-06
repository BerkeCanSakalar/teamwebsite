// src/routes/adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const Contact = require('../models/Contact');
const Blog = require('../models/Blog');
const About = require('../models/About');
const Quiz = require('../models/Quiz');
const clipController = require('../controllers/clipController');
const quizController = require('../controllers/quizController');
const Clip = require('../models/Clip');
const upload = require('../utils/multer');

router.get('/dashboard', isAuthenticated, isAdmin, adminController.dashboard);
router.get('/messages', adminController.getMessages);
router.get('/about', isAuthenticated, isAdmin, adminController.manageAbout);
router.post('/about', isAuthenticated, isAdmin, adminController.addAboutMember);
router.get('/blogs', isAuthenticated, isAdmin, adminController.manageBlogs);
router.post('/blogs', isAuthenticated, isAdmin, adminController.addBlogPost);
router.get('/contacts', isAuthenticated, isAdmin, adminController.manageContacts);
router.get('/about/edit/:id', adminController.getEditAbout);
router.post('/about/edit/:id', adminController.updateAbout);
router.get('/blogs/edit/:id', adminController.getEditBlog);
router.post('/blogs/edit/:id', adminController.updateBlog);


// Mesajı okundu olarak işaretleme
router.post('/messages/:id/mark-read', async (req, res) => {
  try {
    const messageId = req.params.id;
    await Contact.findByIdAndUpdate(messageId, { isRead: true });
    res.redirect('/admin/messages'); // İşlemden sonra mesajlar sayfasına geri dön
  } catch (err) {
    console.error(err);
    res.status(500).send('Mesaj durumu güncellenemedi.');
  }
});

router.post('/blogs/delete/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId); // Blog'u sil
    res.redirect('/admin/blogs'); // Silme işlemi sonrası yönlendirme
  } catch (err) {
    console.error('Blog silinirken hata:', err);
    res.status(500).send('Blog silinemedi.');
  }
});

router.post('/about/delete/:id', async (req, res) => {
  try {
    const memberId = req.params.id;
    await About.findByIdAndDelete(memberId); // Ekip üyesini sil
    res.redirect('/admin/about'); // Silme işlemi sonrası yönlendirme
  } catch (err) {
    console.error('Ekip üyesi silinirken hata:', err);
    res.status(500).send('Ekip üyesi silinemedi.');
  }
});

// Klip yönetimi
router.get('/clips', async (req, res) => {
  const clips = await Clip.find().sort({ createdAt: -1 });
  res.render('admin/clips', { clips });
});
router.post('/clips', clipController.addClip);

// Klip düzenleme
router.post('/clips/edit/:id', clipController.editClip);

// Klip silme
router.post('/clips/delete/:id', clipController.deleteClip);


// chat routes
router.get('/chat', isAdmin, (req, res) => {
  res.render('admin/chat', { username: req.session.user.username });
});

//quiz routes
// Admin paneli için quiz yönetimi sayfası
router.get('/quiz', async (req, res) => {
  const quizs = await Quiz.find().sort({ createdAt: -1 });
  res.render('admin/quizAdmin', { quizs });
});

// Quiz sorusu ekleme
router.post('/quiz/add', quizController.addQuizQuestion);

// Quiz sorusu silme
router.post('/quiz/delete/:id', quizController.deleteQuizQuestion);




module.exports = router;