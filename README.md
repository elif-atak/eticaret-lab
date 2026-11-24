# E-Ticaret Mobil Uygulaması

## Proje Hakkında

Bu proje, React Native ve Expo kullanılarak geliştirilen bir mobil e-ticaret uygulamasıdır. Uygulama, DummyJSON API üzerinden gerçek ürün verilerini alarak kullanıcıya ürünleri listeleme, ürün detaylarını görüntüleme ve alışveriş sepetini yönetme imkânı sunmaktadır.

Proje, Mobil Programlama laboratuvarı kapsamında geliştirilmiştir.

## Kullanılan Teknolojiler

- React Native
- Expo
- JavaScript
- Expo Router
- Context API
- DummyJSON Products API

## Uygulama Özellikleri

- API üzerinden ürün verilerini çekme ve listeleme
- Ürün görsellerini, isimlerini, puanlarını ve fiyatlarını görüntüleme
- Ürün adına göre arama yapma
- Ürün detay sayfasına dinamik yönlendirme
- Ürün açıklaması, stok bilgisi ve puanını görüntüleme
- İndirimli fiyat ve indirim oranını gösterme
- Ürünleri alışveriş sepetine ekleme
- Sepetteki ürünleri silme
- Ürün miktarlarını artırma ve azaltma
- Sepet toplam ürün sayısını görüntüleme
- Sepet toplam tutarını hesaplama
- Context API ile sepet durumunu ekranlar arasında ortak yönetme

**Not:** Ürün kartlarında ve detay sayfasında indirimli fiyat gösterilmektedir. Ancak laboratuvar föyü doğrultusunda sepet toplamı normal ürün fiyatı üzerinden hesaplanmaktadır.

## API Bilgisi

Uygulamada ürün verileri DummyJSON Products API üzerinden alınmaktadır.

API adresi:

https://dummyjson.com/products?limit=20

Ürün detayları için:

https://dummyjson.com/products/{id}

## Proje Klasör Yapısı

```text
eticaret-lab/
│
├── app/
│   ├── _layout.js
│   ├── index.js
│   ├── sepet.js
│   └── urun/
│       └── [id].js
│
├── components/
│   └── UrunKarti.js
│
├── context/
│   └── SepetContext.js
│
├── assets/
│
├── app.json
├── package.json
└── README.md
```

## Kurulum ve Çalıştırma

Projeyi bilgisayarınıza indirdikten sonra proje klasöründe terminali açın.

Gerekli paketleri yüklemek için:

```bash
npm install
```

Uygulamayı başlatmak için:

```bash
npx expo start
```

Uygulama Expo Go kullanılarak mobil cihazda çalıştırılabilir.

## Sepet Yönetimi

Sepet işlemleri Context API kullanılarak yönetilmektedir. Böylece ana sayfa, ürün detay sayfası ve sepet ekranı aynı sepet verilerine erişebilmektedir.

Sepete ürün ekleme, ürün silme, miktar artırma ve azaltma işlemleri ortak state üzerinden gerçekleştirilmektedir.

## Geliştirici

Mobil Programlama Laboratuvarı kapsamında hazırlanmıştır.