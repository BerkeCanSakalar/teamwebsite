const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.loginPage = (req, res) => {
  res.render('auth/login'); // Login sayfasını render eder
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Geçersiz kullanıcı adı veya şifre.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Geçersiz kullanıcı adı veya şifre.');
    }

    req.session.user = { username: user.username, role: user.role };
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Bir hata oluştu.');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};
