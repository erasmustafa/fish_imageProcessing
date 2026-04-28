# AquaScope

Next.js (frontend) + FastAPI/TensorFlow (AI backend) tabanlı balık görsel analiz projesi.

## Çalıştırma

### 1) AI Backend (FastAPI)

`aquascope/backend` klasöründe:

```bash
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
uvicorn backend.app:app --reload --host 127.0.0.1 --port 8000
```

Sağlık kontrolü:
- `GET http://127.0.0.1:8000/health`

Analiz endpoint’i:
- `POST http://127.0.0.1:8000/api/v1/analyze-fish` (form-data: `image`)

Not: Backend açılırken `backend/models/fish_model.h5` ve `backend/data/class_names.json` dosyalarını yükler.

### 2) Frontend (Next.js)

`aquascope/` klasöründe:

```bash
npm install
npm run dev
```

Uygulama:
- `http://localhost:3000`

Frontend analizi, Next.js API üzerinden proxy ile yapar:
- `POST /api/analyze-fish` → varsayılan olarak `http://127.0.0.1:8000/api/v1/analyze-fish`

FastAPI adresini değiştirmek için:
- `FASTAPI_URL` environment değişkeni (ör. `.env.local`)
