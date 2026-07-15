# 🧠 NeuroScan AI SaaS

NeuroScan AI SaaS is a full-stack AI-powered Brain Tumor Detection platform that enables users to upload MRI brain scans and receive automated tumor classification using a deep learning model. The application provides secure authentication, prediction history, downloadable reports, and interactive API documentation.

---

## 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 🧠 Brain Tumor Detection using Deep Learning (PyTorch CNN)
- 📤 MRI Image Upload
- 📊 Confidence Score & Class Probabilities
- 📜 Prediction History
- 📄 Download Prediction Reports (PDF/JSON)
- 📚 Swagger API Documentation
- 🐳 Fully Dockerized Deployment
- 🗄️ Hybrid Database Architecture
  - PostgreSQL (User & Prediction Data)
  - MongoDB (Reports & Metadata)

---

# 🏗️ Technology Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript

## Backend
- Flask
- Flask SQLAlchemy
- Flask CORS
- JWT Authentication
- Flasgger (Swagger UI)

## AI / Machine Learning
- PyTorch
- TorchVision
- Pillow

## Databases
- PostgreSQL
- MongoDB

## DevOps
- Docker
- Docker Compose
- Gunicorn
- Nginx

---

# 📁 Project Structure

```
project/
│
├── backend/
│   ├── inference/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── docs/
│   ├── uploads/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

# 📋 Prerequisites

Install the following before running the project.

- Docker Desktop
- Docker Compose (included with Docker Desktop)

---

# 🐳 Running with Docker (Recommended)

## Step 1 – Clone the Repository

```bash
git clone <repository-url>

cd project
```

---

## Step 2 – Configure Environment Variables

Create a `.env` file from the example.

Windows

```bash
copy .env.example .env
```

Linux / macOS

```bash
cp .env.example .env
```

---

## Step 3 – Build and Start the Application

```bash
docker compose up -d --build
```

The first build may take several minutes because the AI dependencies (PyTorch) are downloaded.

---

## Step 4 – Verify Running Containers

```bash
docker ps
```

Expected containers:

```
neuroscan-frontend
neuroscan-backend
neuroscan-postgres
neuroscan-mongodb
```

---

## Step 5 – Access the Application

| Service | URL |
|----------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost:5000/api/v1 |
| Swagger Documentation | http://localhost:5000/swagger/ |
| Health Check | http://localhost:5000/api/v1/health |

Health endpoint should return:

```json
{
    "status":"UP"
}
```

---

## Stop the Application

```bash
docker compose down
```

---

## Rebuild After Code Changes

### Rebuild Everything

```bash
docker compose up -d --build
```

### Rebuild Backend Only

```bash
docker compose build backend

docker compose up -d
```

### Rebuild Frontend Only

```bash
docker compose build frontend

docker compose up -d
```

### Clean Rebuild (No Cache)

```bash
docker compose down

docker compose build --no-cache

docker compose up -d
```

---

# 💻 Running Locally (Without Docker)

## Database Setup

Install and start:

- PostgreSQL
- MongoDB

Create a PostgreSQL database named:

```
neuroscan
```

---

## Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run

```bash
python app.py
```

Backend runs at

```
http://localhost:5000
```

---

## Frontend

Open another terminal.

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📚 API Documentation

Swagger UI is available at

```
http://localhost:5000/swagger/
```

It includes documentation for:

- Authentication
- Prediction
- Reports
- Health Check

---

# 🧪 Application Workflow

1. Register a new account.
2. Login.
3. Upload an MRI brain image.
4. AI model performs tumor classification.
5. View prediction confidence and probabilities.
6. Access prediction history.
7. Download PDF or JSON report.

---

# 📊 Supported Brain Tumor Classes

- Glioma
- Meningioma
- Pituitary
- No Tumor

---

# 🗄️ Database Architecture

## PostgreSQL

Stores

- Users
- Authentication
- Predictions
- History

## MongoDB

Stores

- Reports
- Metadata
- Additional prediction information

---

# 🔍 Troubleshooting

### Docker isn't starting

Restart Docker Desktop and ensure the Docker Engine is running.

---

### Check running containers

```bash
docker ps
```

---

### View Backend Logs

```bash
docker logs -f neuroscan-backend
```

---

### View Frontend Logs

```bash
docker logs -f neuroscan-frontend
```

---

### Check Health API

```
http://localhost:5000/api/v1/health
```

Expected response:

```json
{
    "status":"UP"
}
```

---

# 👨‍💻 Author

**Vinay Mali**

Computer Engineering Student

AI / Machine Learning Enthusiast

---

# 📄 License

This project was developed for educational and research purposes. 