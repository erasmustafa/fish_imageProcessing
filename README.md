# 🐟 AquaScope

AquaScope, balık türlerini analiz etmek, görselleştirmek ve kullanıcılar arasında bilgi paylaşımını sağlamak amacıyla geliştirilmiş modern bir web tabanlı platformdur.  
Makine öğrenmesi destekli analiz altyapısı ile kullanıcıların yüklediği görseller üzerinden balık türü tahmini yapılır ve sonuçlar interaktif bir arayüzde sunulur.

## 🚀 Kısa Açıklama

AquaScope; balık tanıma (image classification), tür keşfi, coğrafi dağılım analizi ve sosyal etkileşim özelliklerini tek bir platformda birleştirir.  
Frontend tarafında modern UI/UX yaklaşımıyla geliştirilmiş bir arayüz, backend tarafında ise hızlı ve ölçeklenebilir bir API altyapısı bulunmaktadır.

## ✨ Öne Çıkan Özellikler

- 🧠 AI destekli balık türü analizi
- 📊 Dashboard ile veri görselleştirme
- 🌍 Harita tabanlı dağılım görüntüleme
- 📚 Tür kütüphanesi
- 💬 Sosyal alan
- 👤 Kullanıcı profili
- 🔐 Login sistemi
- ⚡ FastAPI ile yüksek performans

## 🛠️ Kullanılan Teknolojiler

| Katman   | Teknoloji |
|----------|----------|
| Frontend | Next.js, React, Tailwind CSS |
| Backend  | FastAPI |
| AI Model | TensorFlow / Keras |
| Grafik   | Chart.js (opsiyonel) |
| Harita   | Mapbox (opsiyonel) |

## 📁 Proje Yapısı

```
aquascope/
├── frontend/
├── backend/
├── model/
├── .env.local
├── run-aquascope.bat
└── README.md
```
## ⚙️ Kurulum

```bash
git clone https://github.com/username/aquascope.git
cd aquascope
```

```bash
cd backend
pip install -r requirements.txt
```

```bash
cd ../frontend
npm install
```

## ▶️ Çalıştırma

```bash
run-aquascope.bat
```

veya

```bash
cd backend
python -m uvicorn app:app --reload
```

```bash
cd frontend
npm run dev
```

## 🔐 Environment Variables

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
MODEL_PATH=./model/fish_model.h5
```

## 🔄 Sistem Mantığı

Görsel → Backend → Model → Tahmin → Frontend

## 🧩 Modüller

Login, Dashboard, Analiz, Harita, Tür Kütüphanesi, Sosyal Alan, Profil


## 🔌 API

- POST /predict
- GET /species
- GET/POST /user


## 🧠 AI Model

- TensorFlow / Keras
- Image classification
- 224x224 preprocessing


## 👤 Kullanıcı Akışı

Login → Dashboard → Analiz → Sonuç → Keşif


## 🔮 Gelecek

- Auth geliştirme
- Mobil destek
- Cloud deploy


## 🤝 Katkı

PR'lar kabul edilir.


## 📄 Lisans

MIT License


## 🧾 Özet

AquaScope, AI destekli balık analiz platformudur.
