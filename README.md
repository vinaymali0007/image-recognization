# NeuroScan — AI-Powered Brain Tumor Classification Platform

> **Deep Learning-based Brain Tumor Detection Platform
 · Flask + React · PyTorch CNN · Dockerized Deployment**

NeuroScan is a full-stack AI-powered medical image analysis platform that classifies brain tumors from MRI scans using a trained Convolutional Neural Network (CNN). The platform provides an end-to-end workflow where users can upload MRI images, receive CNN-based predictions, securely manage prediction history, and generate reports through a modern web interface.

Unlike traditional manual workflows, NeuroScan automates MRI image classification using Deep Learning while providing a scalable REST API architecture, secure authentication, and containerized deployment.

---

# Table of Contents

- [Overview](#overview)

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Machine Learning Pipeline](#machine-learning-pipeline)
- [Dataset](#dataset)
- [Model Information](#model-information)
- [Quick Start (Docker)](#quick-start-docker)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Database Design](#database-design)
- [Documentation](#documentation)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Disclaimer](#disclaimer)

---

# Overview

NeuroScan combines Artificial Intelligence, Deep Learning, and modern web technologies to provide an automated MRI brain tumor classification platform.

The system consists of:

- React-based frontend
- Flask REST API backend
- PyTorch CNN inference engine
- PostgreSQL database
- MongoDB database
- Dockerized deployment

The application is designed with a modular architecture, making it easy to maintain, extend, and deploy across different environments.

---

# 📸 Screenshots

### Home Page

<img width="1277" height="906" alt="Screenshot 2026-07-15 214619" src="https://github.com/user-attachments/assets/fba19983-61b6-4afc-aa88-371d418ab2f6" />


---

### Login

<img width="1220" height="898" alt="Screenshot 2026-07-15 215002" src="https://github.com/user-attachments/assets/5fa0a563-ac1b-4548-bae5-a38d69d8d64b" />


---

### Register

<img width="1221" height="891" alt="Screenshot 2026-07-15 214919" src="https://github.com/user-attachments/assets/72fbb15a-0c26-42eb-8ad4-597759956b94" />


---

### Dashboard

<img width="1296" height="897" alt="Screenshot 2026-07-15 215050" src="https://github.com/user-attachments/assets/1e177a04-7dbe-4d30-9613-c87086110099" />


---

### Run a Diagnosis

<img width="1222" height="902" alt="Screenshot 2026-07-15 215115" src="https://github.com/user-attachments/assets/5cadd630-8a93-4f13-9874-602301f5ef54" />


---

### Prediction Result
<img width="1247" height="911" alt="Screenshot 2026-07-15 215157" src="https://github.com/user-attachments/assets/e7a1c75a-62b8-49f4-93db-f6bc04d8a22d" />


---

### Prediction History

<img width="1292" height="897" alt="Screenshot 2026-07-15 225510" src="https://github.com/user-attachments/assets/81602c38-9034-47de-8db3-ed04d08f5274" />


---

### Model Info

<img width="1272" height="726" alt="Screenshot 2026-07-15 225617" src="https://github.com/user-attachments/assets/ef103a9b-cfc5-4ed4-8e4a-09db48868d58" />




# Features

| Feature | Description |
|----------|-------------|
| 🧠 AI Brain Tumor Classification | Classifies MRI scans using a trained CNN model |
| 📤 MRI Image Upload | Upload and validate MRI brain images |
| 📊 Prediction Results | Displays CNN-based prediction with confidence score and per-class probability breakdown |
| 📄 Report Generation | Generate downloadable PDF prediction reports |
| 🔐 User Authentication | Secure JWT-based authentication with role-based login (e.g. Researcher) |
| 📚 Prediction History | View previously generated predictions and re-download reports |
| 📖 Swagger API Documentation | Interactive API documentation |
| 🗄 PostgreSQL Integration | Stores users and prediction history |
| 📦 MongoDB Integration | Stores application metadata and supports future expansion |
| 🐳 Docker Support | Fully containerized deployment |

---

# Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| Vite | Frontend Build Tool |
| HTML5 | Markup |
| CSS3 | Styling |
| JavaScript | Client-side Logic |
| Nginx | Production Web Server |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Python 3.11 | Programming Language |
| Flask | REST API Framework |
| Flask-SQLAlchemy | ORM |
| Gunicorn | Production WSGI Server |
| PyJWT | Authentication |
| Flasgger | Swagger API Documentation |

---

## AI / Machine Learning

| Technology | Purpose |
|------------|---------|
| PyTorch | Deep Learning Framework |
| TorchVision | Image Processing Utilities |
| CNN | Brain Tumor Classification Model |

---

## Database

| Database | Purpose |
|-----------|---------|
| PostgreSQL | User & Prediction Data |
| MongoDB | Application Metadata |

---

## DevOps

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container Orchestration |

---
---

### Docker Images
 
<img width="1598" height="708" alt="Screenshot 2026-07-15 221020" src="https://github.com/user-attachments/assets/8d7d5190-45b8-414b-9068-df59127c9445" />



---
---

### Docker Containers

<img width="1581" height="617" alt="Screenshot 2026-07-15 221039" src="https://github.com/user-attachments/assets/868ea622-1e72-4e30-8911-3646a715549a" />



---

# System Architecture

```text
                    User
                      │
                      ▼
             React Frontend
                 (Nginx)
                      │
                      ▼
             Flask REST API
               (Gunicorn)
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
 PostgreSQL Database          MongoDB Database
                      │
                      ▼
            AI Inference Engine
              PyTorch CNN Model
                      │
                      ▼
             Brain Tumor Prediction
```

---

# Machine Learning Pipeline

```text
MRI Image Upload
        │
        ▼
Image Validation
        │
        ▼
Image Preprocessing (resize to 32×32 px, RGB)
        │
        ▼
CNN Model Inference
        │
        ▼
Softmax Class Probabilities
        │
        ▼
Save Prediction
        │
        ▼
Generate Report
```

---

# Dataset

The CNN model was trained using the **Brain Tumour Classification** dataset available on Kaggle.

| Detail | Description |
|--------|-------------|
| Source | [Kaggle — Brain Tumour Classification](https://www.kaggle.com/datasets/rishiksaisanthosh/brain-tumour-classification) |
| Classes | Glioma, Meningioma, Pituitary, No Tumor |
| Format | Axial MRI slices (JPG/PNG) |

The dataset consists of MRI brain scan images categorized into four tumor classes and is used for training and evaluating the deep learning model for automated brain tumor classification.

---

# Model Information

| Detail | Description |
|--------|-------------|
| Architecture | CNN (2 convolutional blocks + 2 fully connected layers) |
| Input Size | 32 × 32 px |
| Channels | RGB (3-channel) |
| Parameters | ~2.1M |
| Framework | PyTorch |
| Inference Device | CPU |
| Classes | Glioma, Meningioma, Pituitary, No Tumor |

### Inference Pipeline

1. Image is decoded and converted to RGB.
2. Image is resized to 32×32 px and converted to a tensor.
3. Forward pass through the CNN produces raw logits.
4. Softmax converts logits into class probabilities.
5. The highest-probability class is returned as the diagnosis.

### Model File

```text
backend/
└── weights/
    └── cnn.pth
```

The trained model is loaded automatically during backend startup and used for real-time inference.

---

# Quick Start (Docker)

## Prerequisites

Install:

- Docker Desktop
- Docker Compose
- Git

---

## Clone Repository

```bash
git clone https://github.com/vinaymali0007/image-recognization.git
cd image-recognization
```

---

## Start Application

```bash
docker compose up -d
```

This builds (if needed) and starts all containers in detached mode.

---

## Rebuild After Code Changes

```bash
docker compose up --build -d
```

Use this only when backend, frontend, or dependency changes need to be picked up.

---

## Stop Application

```bash
docker compose down
```

---

## Remove Containers and Volumes

```bash
docker compose down -v
```

---

# Application URLs

| Service | URL |
|----------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost:5000 |
| Swagger Documentation | http://localhost:5000/swagger/ |

---

# Project Structure

```text
NeuroScan/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── extensions.py
│   ├── inference/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── utils/
│   ├── docs/
│   │   └── swagger.yml
│   ├── weights/
│   │   └── cnn.pth
│   ├── uploads/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
├── README.md
├── PROJECT_DOCUMENTATION.md
├── USER_MANUAL.md
├── INSTALLATION_GUIDE.md
└── LICENSE
```

---

# API Reference

## Base URL

```
http://localhost:5000/api/v1
```

---

## Health Check

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /health | Application Health Status |

---

## Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /auth/register | Register User |
| POST | /auth/login | User Login |
| GET | /auth/me | Get Current Authenticated User |

---

## Prediction

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /predict/ | Upload MRI Image & Run Prediction |
| GET | /predict/history | Retrieve Prediction History |

---

## Reports

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /report/download/{id} | Download Prediction Report as PDF |

---

## Interactive Documentation

Interactive Swagger API documentation is available at:

```
http://localhost:5000/swagger/
```

---

# Database Design

## PostgreSQL

Stores:

- User Information
- Authentication Data
- Prediction History
- Report Records

---

## MongoDB

Stores:

- Application Metadata
- Reserved for future application data and expansion

---

# Environment Variables

```env
PORT=5000
DEBUG=False
MODEL_PATH=weights/cnn.pth
UPLOAD_FOLDER=uploads
MAX_UPLOAD_SIZE=10485760
JWT_SECRET=your_secret_key
DATABASE_URL=postgresql+pg8000://postgres:postgres@postgres:5432/neuroscan
MONGO_URI=mongodb://mongodb:27017/neuroscan
CORS_ORIGINS=*
```

---

# Documentation

| Document | Description |
|----------|-------------|
| README.md | Project Overview |
| PROJECT_DOCUMENTATION.md | Technical Documentation |
| USER_MANUAL.md | End User Guide |
| INSTALLATION_GUIDE.md | Installation & Deployment Guide |

---

# Future Enhancements

- Explainable AI using Grad-CAM
- DICOM Image Support
- Multi-class Tumor Segmentation
- Cloud Deployment
- Model Performance Dashboard
- Improved CNN Architecture
- Clinical Decision Support Integration

---

# 📖 Declaration

For full transparency, I have used ChatGPT to help speed up parts of this project:

- **Frontend (~60%):** I come from an AI/ML background and am still building familiarity with the dev side, so ChatGPT was used to help make the React frontend more catchy, polished, and visually appealing — layout structure, styling, and UI alignment.
- **Backend (~40%, excluding the ML model):** ChatGPT assisted with parts of the Flask backend architecture (routes, Docker setup, integration logic). The ML model itself — training, preprocessing, and architecture decisions — was built and validated by me.

The core prediction logic, dataset preprocessing, model training, and overall system design remain my own work.

---

# 🧪 Testing Note

If you're running the project locally and want accurate predictions during testing, use MRI images from the **[Kaggle Brain Tumour Classification dataset](https://www.kaggle.com/datasets/rishiksaisanthosh/brain-tumour-classification)** mentioned in the [Dataset](#dataset) section above. Since the model was trained specifically on that dataset's image distribution, using scans from it (or similar axial MRI slices with comparable resolution/quality) will give the most reliable and representative predictions.

---

# License

This project is intended for educational, research, and demonstration purposes.

---

# Disclaimer

NeuroScan is an AI-assisted medical image analysis platform developed for research and educational purposes.

The predictions generated by this application should **not** be considered a substitute for professional medical diagnosis. All results should be reviewed and verified by qualified healthcare professionals.

---

**NeuroScan — AI-Powered Brain Tumor Detection Platform**
