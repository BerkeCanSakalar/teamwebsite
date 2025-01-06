// src/controllers/adminController.js
const About = require('../models/About');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Clip = require('../models/Clip');
const Quiz = require('../models/Quiz');


exports.dashboard = async (req, res) => {
    try {
  const teamCount = await About.countDocuments();
  const blogCount = await Blog.countDocuments();
  const clipCount = await Clip.countDocuments();
  const quizCount = await Quiz.countDocuments();
  const unreadMessages = await Contact.countDocuments({ isRead: false });
  res.render('admin/dashboard', { teamCount, blogCount, unreadMessages, clipCount, quizCount });
} catch (err) {
    console.error(err);
    res.status(500).send('Dashboard yüklenemedi.');
  }
};
exports.getMessages = async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.render('admin/manageContacts', { contacts });
    } catch (err) {
      console.error(err);
      res.status(500).send('Mesajlar yüklenemedi.');
    }
  };
  

exports.manageAbout = async (req, res) => {
  const team = await About.find();
  res.render('admin/manageAbout', { team });
};

exports.addAboutMember = async (req, res) => {
  const { name, role, bio, imageUrl, kick, twitter, instagram, linkedin } = req.body;
  await About.create({ name, role, bio, imageUrl, kick, twitter, instagram, linkedin });
  res.redirect('/admin/about');
};

exports.manageBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.render('admin/manageBlogs', { blogs });
};

exports.addBlogPost = async (req, res) => {
  const { title, content, author, imageUrl } = req.body;
  await Blog.create({ title, content, author, imageUrl });
  res.redirect('/admin/blogs');
};

exports.manageContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.render('admin/manageContacts', { contacts });
};

exports.getEditAbout = async (req, res) => {
  try {
    const member = await About.findById(req.params.id);
    if (!member) return res.status(404).send('Ekip üyesi bulunamadı.');
    res.render('admin/editAbout', { member });
  } catch (err) {
    console.error(err);
    res.status(500).send('Bir hata oluştu.');
  }
};

// Ekip üyesini güncelle
exports.updateAbout = async (req, res) => {
  const { name, role, bio, imageUrl, kick, twitter, instagram, linkedin } = req.body;

  try {
    await About.findByIdAndUpdate(
      req.params.id,
      { name, role, bio, imageUrl, kick, twitter, instagram, linkedin },
      { new: true }
    );
    res.redirect('/admin/about'); // Güncellemeden sonra ekip sayfasına yönlendir
  } catch (err) {
    console.error(err);
    res.status(500).send('Ekip üyesi güncellenemedi.');
  }
};

// Blog düzenleme sayfasını render et
exports.getEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog bulunamadı.');
    res.render('admin/editBlog', { blog });
  } catch (err) {
    console.error(err);
    res.status(500).send('Bir hata oluştu.');
  }
};

// Blogu güncelle
exports.updateBlog = async (req, res) => {
  const { title, content, author, imageUrl } = req.body;

  try {
    await Blog.findByIdAndUpdate(req.params.id, { title, content, author, imageUrl }, { new: true });
    res.redirect('/admin/blogs'); // Güncellemeden sonra blog sayfasına yönlendir
  } catch (err) {
    console.error(err);
    res.status(500).send('Blog güncellenemedi.');
  }
};