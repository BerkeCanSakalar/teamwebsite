const Quiz = require('../models/Quiz');

// Quiz sayfasını getir
exports.getQuizPage = async (req, res) => {
  const quizs = await Quiz.find();
  res.render('quiz', { quizs });
};

// Quiz sorusu ekle
exports.addQuizQuestion = async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  try {
    await Quiz.create({ question, options: options.split(','), correctAnswer });
    res.redirect('/admin/quiz'); // Admin paneline yönlendir
  } catch (err) {
    console.error('Quiz eklenirken hata oluştu:', err);
    res.status(500).send('Quiz sorusu eklenemedi.');
  }
};

// Quiz sorusunu sil
exports.deleteQuizQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    await Quiz.findByIdAndDelete(id);
    res.redirect('/admin/quiz');
  } catch (err) {
    console.error('Quiz sorusu silinirken hata oluştu:', err);
    res.status(500).send('Quiz sorusu silinemedi.');
  }
};
