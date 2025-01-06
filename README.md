# teamwebsite
This web application is designed to introduce team members and facilitate content management. The admin panel includes features for adding blog posts, managing clips, and updating team information. With flexible management tools and an impressive visual layout, it provides users with an efficient experience.




Projenin Özellikleri:

Blog sayfaları ve yazılar ekleme/görüntüleme
Quiz yönetimi (admin panelinden ekleme/silme)
İletişim formu ve mesaj gönderimi
Kick platformu canlı chat entegrasyonu
Dark mode ve responsive tasarım
Admin panelinden bütün gerkeli işlemleri yapabilime ekleme/çıkarma/düzenleme/silme





Gereksinimler
Projeyi çalıştırmadan önce aşağıdaki gereksinimlerin kurulu olduğundan emin olun:

Node.js (v18 veya üstü): Node.js İndir
MongoDB (Yerel veya Bulut Bağlantısı - MongoDB Atlas)

Gerekli Paketlerin Yüklenmesi
Tüm bağımlılıkları yüklemek için:

npm install





.env Dosyası Oluşturun
Proje kök dizininde bir .env dosyası oluşturun ve aşağıdaki örneği kullanarak gerekli bilgileri doldurun:

MONGO_URI="Your Mongodb Connection Link"
PORT="3000"
SESSION_SECRET="Your Secret Key"




çalıştımak için bu komutu terminale yapıştıırn
npm install --save-dev nodemon




Çalıştırma
Projenizi aşağıdaki komutla başlatabilirsiniz:
npm run dev




başlatırken eğer hata alırsanız package.json dosyasında bu kodlar var mı kontrol edin.
 "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },

  

