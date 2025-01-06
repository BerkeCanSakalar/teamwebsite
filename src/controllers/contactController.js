const Contact = require('../models/Contact');

exports.getContactPage = (req, res) => {
  res.render('contact');
};

exports.sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await Contact.create({ name, email, message });
    req.flash('success', 'Mesajınız başarıyla gönderildi!');
    res.redirect('/contact'); // İletişim sayfasına yönlendirme
  } catch (err) {
    console.error('Mesaj kaydedilirken hata oluştu:', err);
    req.flash('error', 'Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    res.redirect('/contact');
  }
};

