// app.js
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('./src/utils/db');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const aboutRoutes = require('./src/routes/aboutRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const clipRoutes = require('./src/routes/clipRoutes');
const quizRoutes = require('./src/routes/quizRoutes');
const About = require('./src/models/About');
const Blog = require('./src/models/Blog');
const Clip = require('./src/models/Clip');


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/views/public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/about', aboutRoutes);
app.use('/blogs', blogRoutes);
app.use('/contact', contactRoutes);
app.use('/clips', clipRoutes);
app.use('/quiz', quizRoutes);
// View Engine
// View Engine Ayarları
app.set('view engine', 'ejs'); // View motoru olarak EJS'yi kullan
app.set('views', path.join(__dirname, './src/views')); // src/views klasörünü tanımlar


// Index Route
app.get('/', async (req, res) => {
  try {
    const team = await About.find();
    const clips = await Clip.find().sort({ createdAt: -1 }).limit(6);
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.render('index', { team, blogs, clips });
  } catch (err) {
    res.status(500).send('Error loading homepage');
  }
});

// Error Handling
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});