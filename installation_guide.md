# NeuroScan — Installation Guide

**Version:** 1.0.0  
**Last Updated:** July 2026

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Installation Overview](#2-installation-overview)
3. [Option A: Docker Compose Installation (Recommended)](#3-option-a-docker-compose-installation-recommended)
4. [Option B: Manual Installation (Without Docker)](#4-option-b-manual-installation-without-docker)
5. [Environment Variables Reference](#5-environment-variables-reference)
6. [Database Setup](#6-database-setup)
7. [AI Model Setup](#7-model-setup)
8. [Running the Application](#8-running-the-application)
9. [API Verification](#9-api-verification)
10. [Running Tests](#10-running-tests)
11. [Common Issues and Fixes](#11-common-issues-and-fixes)
12. [Dataset Source](#12-dataset-source)

---

## 1. Prerequisites

### Docker Installation (Recommended)

When using the Docker installation method, Docker Desktop handles all backend, frontend, databases, and dependencies automatically. No separate installation of Python, Node.js, PostgreSQL, or MongoDB is required.

| Requirement | Version | Check Command |
| :--- | :--- | :--- |
| **Docker Desktop** (includes Docker Compose) | Latest | `docker --version` |
| **Git** | Latest | `git --version` |
| **Minimum RAM** | 4GB Recommended | *Check via System Monitor / Task Manager* |
| **Available Ports** | 80, 5000, 5432, 27017 | *Ensure these ports are not in use* |

> [!NOTE]
> Ensure Docker Desktop is running and the Docker Engine has started before executing Docker commands.

### Manual Installation Requirements

If you prefer to run and develop without Docker, ensure the following components are installed locally:

| Requirement | Version | Check Command |
| :--- | :--- | :--- |
| **Python** | 3.11+ | `python --version` |
| **Node.js** | 20+ | `node --version` |
| **npm** | 9+ | `npm --version` |
| **PostgreSQL** | 15+ | `psql --version` |
| **MongoDB** | 6+ | `mongod --version` |
| **Git** | Latest | `git --version` |

---

## 2. Installation Overview

NeuroScan consists of a React frontend, a Flask REST API backend, two databases (PostgreSQL and MongoDB), and a PyTorch CNN prediction model.

### System Architecture

```mermaid
graph TD
    User([User / Browser]) <--> FE[React Frontend + Nginx]
    FE <--> BE[Flask Backend + Gunicorn]
    BE <--> DB1[(PostgreSQL: User Auth & Metadata)]
    BE <--> DB2[(MongoDB: Application Metadata)]
    BE <--> CNN[AI Model: PyTorch CNN]
```

---

## 3. Option A: Docker Compose Installation (Recommended)

This method builds and starts all necessary services inside self-contained Docker containers.

### Step 1: Clone the Repository
```bash
git clone https://github.com/vinaymali0007/image-recognization.git
cd image-recognization
```

### Step 2: Start the Application
Run the following command to build (if needed) and launch all containers in detached mode:
```bash
docker compose up -d
```

On the first run, Docker will automatically:
1. Build the frontend and backend images (if they don't already exist).
2. Pull the PostgreSQL and MongoDB base images.
3. Create the Docker network.
4. Start all containers, load the CNN model weights, and serve the frontend through Nginx.

> [!NOTE]
> The initial build may take several minutes because Docker downloads the required base images and installs project dependencies. Subsequent starts will be significantly faster.

### Step 3: Rebuilding After Changes
If you modify the source code, Dockerfiles, or dependencies, rebuild the images before starting the containers:
```bash
docker compose up --build -d
```
This ensures your latest changes are reflected in the running containers.

### Step 4: Verify Running Containers
Verify that all four containers are running properly:
```bash
docker ps
```
**Expected containers in output:**
* `neuroscan-frontend`
* `neuroscan-backend`
* `neuroscan-postgres`
* `neuroscan-mongodb`

### Step 5: View Service Logs
* **All services:**
  ```bash
  docker compose logs -f
  ```
* **Backend service only:**
  ```bash
  docker compose logs -f backend
  ```
* **Frontend service only:**
  ```bash
  docker compose logs -f frontend
  ```
* **PostgreSQL database only:**
  ```bash
  docker compose logs -f postgres
  ```

### Step 6: Stop the Application
* **Stop containers but keep database volumes (data persisted):**
  ```bash
  docker compose down
  ```
* **Stop containers and delete database volumes (data wiped):**
  ```bash
  docker compose down -v
  ```

> [!WARNING]
> `docker compose down` stops and removes the containers but preserves the PostgreSQL and MongoDB data volumes, so your data remains intact on the next `docker compose up -d`. `docker compose down -v` additionally deletes those volumes, permanently erasing all PostgreSQL and MongoDB data. Use `-v` only when you intend to reset the application to a clean state.

### Application Port Mapping Reference
| Service / Component | URL |
| :--- | :--- |
| **Frontend UI** | [http://localhost](http://localhost) |
| **Backend REST API** | [http://localhost:5000](http://localhost:5000) |
| **Health Check Endpoint** | [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health) |
| **Swagger Documentation** | [http://localhost:5000/swagger/](http://localhost:5000/swagger/) |

---

## 4. Option B: Manual Installation (Without Docker)

Use this method for local development, debugging, and testing purposes.

### Backend Setup

#### Step 1: Navigate to the Backend Folder
```bash
cd backend
```

#### Step 2: Create and Activate a Virtual Environment
* **On Windows:**
  ```powershell
  python -m venv venv
  .\venv\Scripts\activate
  ```
* **On macOS/Linux:**
  ```bash
  python -m venv venv
  source venv/bin/activate
  ```

#### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Configure Backend Environment Variables
Create a file named `.env` in the `backend/` directory:
```env
PORT=5000
DEBUG=True
MODEL_PATH=weights/cnn.pth
UPLOAD_FOLDER=uploads
MAX_UPLOAD_SIZE=10485760
CORS_ORIGINS=*
JWT_SECRET=your_secret_key_here
DATABASE_URL=postgresql+pg8000://postgres:postgres@localhost:5432/neuroscan
MONGO_URI=mongodb://localhost:27017/neuroscan
```

#### Step 5: Start the Backend Server
* **For Development:**
  ```bash
  python app.py
  ```
* **For Production Simulation (Gunicorn):**
  ```bash
  gunicorn --bind 0.0.0.0:5000 --workers 2 --timeout 120 app:app
  ```
The backend API will run on **http://localhost:5000**.

---

### Frontend Setup

#### Step 1: Navigate to the Frontend Folder
```bash
cd ../frontend
```

#### Step 2: Install Packages
```bash
npm install
```

#### Step 3: Start the Frontend Development Server
```bash
npm run dev
```
The frontend application will run on **http://localhost:5173**.

#### Step 4: Build for Production (Optional)
To generate static production files:
```bash
npm run build
```

---

## 5. Environment Variables Reference

| Variable | Required | Description | Example (Docker / Manual) |
| :--- | :---: | :--- | :--- |
| `PORT` | Yes | Backend server execution port | `5000` |
| `DEBUG` | No | Enables Flask debug mode (True/False) | `False` |
| `MODEL_PATH` | Yes | Path to PyTorch CNN model weight file | `weights/cnn.pth` |
| `UPLOAD_FOLDER` | Yes | Location to store uploaded MRI scan files | `uploads` |
| `MAX_UPLOAD_SIZE` | Yes | Maximum file upload size in bytes (e.g., 10MB) | `10485760` |
| `CORS_ORIGINS` | Yes | Permitted origins for Cross-Origin Requests | `*` or `http://localhost` |
| `JWT_SECRET` | Yes | Secret key used for signing JWT auth tokens | `your_secret_key` |
| `DATABASE_URL` | Yes | PostgreSQL connection URI string | `postgresql+pg8000://postgres:postgres@postgres:5432/neuroscan` |
| `MONGO_URI` | Yes | MongoDB connection URI string | `mongodb://mongodb:27017/neuroscan` |

---

## 6. Database Setup

NeuroScan utilizes a dual-database architecture to store relational user profiles alongside application metadata.

### 1. PostgreSQL (Relational Database)
* **Purpose:** Handles user registration, authentication metadata, and prediction/report history.
* **Default Database Schema (Docker Compose):**
  * **Database Name:** `neuroscan`
  * **Username:** `postgres`
  * **Password:** `postgres`
  * **Port:** `5432`

### 2. MongoDB (Document Database)
* **Purpose:** MongoDB is used for application metadata and is available for future extensibility.
* **Default Database Instance (Docker Compose):**
  * **Database Name:** `neuroscan`
  * **Port:** `27017`

---

## 7. AI Model Setup

The backend loads a trained PyTorch Convolutional Neural Network (CNN) model on startup to perform brain tumor classifications.

### Model Location File Tree
```
backend/
 └── weights/
       └── cnn.pth
```

### Startup Initialization Flow

```mermaid
graph TD
    Start[Flask Server Starts] --> CheckFile{Does weights/cnn.pth exist?}
    CheckFile -- Yes --> LoadModel[Load PyTorch CNN Weights]
    CheckFile -- No --> RaiseErr[Log: 'Error loading predictor']
    LoadModel --> ModelOk[Model Ready for MRI Predictions]
```

> [!WARNING]
> If model loading fails, check the backend server logs. Verify that the file `cnn.pth` exists at the location specified in your `MODEL_PATH` environment variable and that the application process has read permissions for it.

---

## 8. Running the Application

Once both frontend, backend, databases, and AI models are running, the application handles diagnostic requests in the following sequence:

```mermaid
sequenceDiagram
    autonumber
    actor User as Patient / Clinician
    participant FE as React Frontend
    participant BE as Flask REST API
    participant CNN as CNN Model (PyTorch)
    participant DBs as Databases (Postgres & Mongo)

    User->>FE: Uploads MRI Image (.jpg/ .png)
    FE->>BE: POST /api/v1/predict/
    BE->>CNN: Evaluate Image
    CNN-->>BE: Classification Result (Tumor Category)
    BE->>DBs: Save Auth/Report Metadata
    BE-->>FE: Return Prediction & Report Details
    FE-->>User: Render Diagnostic Dashboard
```

### Project URLs

| Service / Component | URL |
| :--- | :--- |
| **Frontend** | [http://localhost](http://localhost) |
| **Backend API** | [http://localhost:5000](http://localhost:5000) |
| **Swagger Documentation** | [http://localhost:5000/swagger/](http://localhost:5000/swagger/) |

---

## 9. API Verification

Verify that your backend services are operating properly using these endpoints.

### 1. Health Check
```bash
curl http://localhost:5000/api/v1/health
```
**Expected Response:**
```json
{
  "status": "UP"
}
```

### 2. Interactive Swagger Docs
Open your browser and navigate to:
```
http://localhost:5000/swagger/
```
From here, you can inspect all endpoints, expected payloads, and authentication headers.

### 3. Core API Endpoints

**Authentication**
```
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

**Prediction**
```
POST /api/v1/predict/
GET  /api/v1/predict/history
```

**Reports**
```
GET /api/v1/report/download/{id}
```

### 4. Frontend End-to-End Test
Open the frontend application (e.g., `http://localhost`), and check if you can:
1. Register a new user and log in.
2. Navigate to the upload dashboard.
3. Upload a sample brain MRI scan image.
4. View the classification prediction result.
5. Retrieve and view saved historical reports.

---

## 10. Running Tests

Automated backend testing is not yet implemented in the current version of NeuroScan. Automated tests (e.g., using `pytest`) can be added in future versions to cover authentication, prediction, and model integration.

---

## 11. Common Issues and Fixes

### 1. Docker Command Not Found
* **Error:** `docker` is not recognized as an internal or external command.
* **Solution:** Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/). Make sure Docker is running and restart your terminal.

### 2. Backend Cannot Connect to PostgreSQL
* **Error:** `could not connect to server: Connection refused`.
* **Solutions:**
  * Ensure the PostgreSQL container is active: `docker ps`.
  * If running manually, check that the local PostgreSQL service is running and credentials match `DATABASE_URL`.
  * Restart the container: `docker compose restart postgres`.

### 3. MongoDB Connection Failed
* **Error:** Connection timeouts or connection refused.
* **Solutions:**
  * Ensure the MongoDB container is running: `docker ps`.
  * Restart the container: `docker compose restart mongodb`.
  * Verify the connection string in your `.env` matches the correct host (use `mongodb` if inside Docker network, or `localhost` if running manually).

### 4. PyTorch Model File Not Found
* **Error:** `FileNotFoundError: [Errno 2] No such file or directory: 'weights/cnn.pth'`.
* **Solution:** Create a directory named `weights` inside the `backend` directory and download or move your trained PyTorch weights file `cnn.pth` into it. Double-check your `.env` value for `MODEL_PATH`.

### 5. Port 5000 Already in Use
* **Error:** Port conflict preventing the Flask application from starting.
* **Solutions:**
  * Find the process ID occupying port 5000:
    * **Windows:**
      ```powershell
      netstat -ano | findstr :5000
      ```
    * **macOS/Linux:**
      ```bash
      lsof -i :5000
      ```
  * Stop the conflicting process:
    * **Windows:**
      ```powershell
      taskkill /PID <PID> /F
      ```
    * **macOS/Linux:**
      ```bash
      kill -9 <PID>
      ```

### 6. Frontend Cannot Connect to Backend
* **Error:** Uploads or authentication requests hang or return network errors in the console.
* **Solutions:**
  * Verify that the backend is indeed running at `http://localhost:5000`.
  * Check the frontend environment configuration for `VITE_API_BASE_URL` and verify it is pointing to the correct API endpoint.
  * Rebuild the frontend assets if deploying: `npm run build`.

---

## 12. Dataset Source

The brain MRI image dataset used to train and evaluate the Convolutional Neural Network (CNN) model is sourced from Kaggle:

* **Source Name:** Kaggle Brain Tumor Classification Dataset
* **Dataset URL:** [Kaggle Dataset Link](https://www.kaggle.com/datasets/rishiksaisanthosh/brain-tumour-classification)
* **Description:** Contains categorized brain MRI scans split into multiple tumor classes, used for supervised classification training.

> [!TIP]
> When testing the application locally, use MRI images from this dataset (or similar axial MRI slices with comparable resolution/quality) to get the most accurate and representative predictions, since the model was trained specifically on this dataset's image distribution.
