# PostureIQ

AI-powered posture analysis platform built with React, FastAPI, MediaPipe, Supabase, Vercel, and Railway.

---

## Overview

PostureIQ is a real-time posture tracking and posture improvement platform that uses computer vision to analyze body alignment through a webcam feed.

The system detects posture issues such as:

* Forward head posture
* Rounded shoulders
* Neck misalignment
* Slouching
* Uneven posture alignment

Users receive:

* A posture score
* Letter-grade evaluation
* Detected posture issues
* Recommended corrective exercises
* Session history tracking
* Progress visualization over time

---

# Features

## Real-Time AI Posture Analysis

* Live webcam posture tracking
* Skeleton/keypoint visualization
* Real-time score updates
* Instant posture grading

## Exercise Recommendations

Provides corrective exercises based on detected posture problems.

Examples:

* Chin tucks
* Wall angels
* Shoulder blade squeezes
* Neck stretches

## User Authentication

* Sign up and login system
* Supabase Authentication integration
* Session-based user tracking

## Session History

* Save posture analysis sessions
* View previous scores
* Track improvement trends
* Interactive score-over-time graph

## Cloud Deployment

Frontend:

* Vercel

Backend:

* Railway

Database/Auth:

* Supabase

---

# Tech Stack

## Frontend

* React
* Vite
* TailwindCSS
* Recharts
* React Router

## Backend

* FastAPI
* Uvicorn
* Python
* Supabase Python SDK

## AI / Computer Vision

* MediaPipe
* TensorFlow.js
* Pose Detection

---

# Project Structure

```txt
postureiq/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── main.py
│   ├── database.py
│   └── requirements.txt
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/jshrihankumar-dev/postureiq.git
cd postureiq
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv .venv
```

Activate venv:

### Windows

```bash
.venv\Scripts\activate
```

### Mac/Linux

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create:

```txt
backend/.env
```

Add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Run backend:

```bash
cd backend
python -m uvicorn main:app --reload
```

Backend runs on:

```txt
http://127.0.0.1:8000
```

---

# Deployment

## Frontend (Vercel)

Framework:

* Vite

Root Directory:

```txt
frontend
```

Environment Variables:

```env
VITE_API_URL=your_railway_backend_url
```

---

## Backend (Railway)

Root Directory:

```txt
backend
```

Start Command:

```txt
python -m uvicorn main:app --host 0.0.0.0 --port $PORT
```

Environment Variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

# API Endpoints

## Authentication

### Signup

```http
POST /auth/signup
```

### Login

```http
POST /auth/login
```

---

## Sessions

### Save Session

```http
POST /sessions
```

### Get Session History

```http
GET /sessions/{user_id}
```

---

# Future Improvements

* AI posture coaching
* Personalized workout plans
* Mobile app version
* Posture streak tracking
* Daily reminders
* Advanced analytics dashboard
* Multi-angle posture detection
* Physical therapy integrations

---

# Inspiration

Poor posture has become increasingly common due to long hours of screen time, gaming, studying, and remote work.

PostureIQ was created to provide accessible real-time posture feedback using AI and computer vision directly through a browser.

---

# Author

Shrihan Jadigam

GitHub:
https://github.com/jshrihankumar-dev

---

# License

MIT License
