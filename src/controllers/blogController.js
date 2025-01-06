// src/controllers/blogController.js
const Blog = require('../models/Blog');

exports.getBlogsPage = async (req, res) => {
  const blogs = await Blog.find();
  res.render('blogs', { blogs });
};

exports.getBlogDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).render('404', { message: 'Blog bulunamadı!' });
    }

    res.render('blogDetail', { blog });
  } catch (error) {
    console.error('Blog detayı getirirken hata:', error);
    res.status(500).render('500', { message: 'Sunucu hatası!' });
  }
};