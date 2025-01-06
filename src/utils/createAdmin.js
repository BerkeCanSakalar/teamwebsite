const mongoose = require('mongoose');
const User = require('../models/User');

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const admin = new User({
      username: '', // Admin kullanıcı adı
      password: '', // Admin şifresi
    });
    await admin.save();
    console.log('Admin kullanıcı başarıyla oluşturuldu.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Admin oluşturulurken hata oluştu:', err.message);
    mongoose.connection.close();
  }
};

createAdmin();
