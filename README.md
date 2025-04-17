Quizio is a dynamic and interactive quiz platform built using the powerful **MERN stack** (MongoDB, Express, React, Node.js) — with a twist of real-time magic via **WebSockets**. Inspired by Kahoot, Quizio lets users create and host live quizzes, engage participants in real-time, and store results for later review.

Whether you're a teacher, trainer, or just a trivia enthusiast, **Quizio** delivers a smooth and responsive experience backed by modern technologies and robust architecture.

---

## 🚀 Features

- 🔐 **Authentication via [Authecho](#authentication)**  
  Secure sign-up and log-in with Quizio's custom auth service.

- ✍️ **Create & Manage Quizzes**  
  Authenticated users can build quizzes, customize questions, and set correct answers.

- 🎮 **Host Live Quizzes**  
  Start a quiz session and let others join in real time using WebSocket-powered rooms.

- 📊 **Real-Time Answer Sync**  
  Every answer submitted is synced instantly to all participants using **Socket.IO**.

- 🧠 **Score Tracking & Leaderboards**  
  Participants see live feedback, rankings, and results, adding a competitive edge.

- 💾 **Persistent Storage with MongoDB**  
  All quiz data and user scores are securely stored for future reference.

---

## 🛠️ Tech Stack

### Frontend
- **React** – Building a responsive, modular UI
- **Tailwind CSS** – Rapid UI styling with utility-first CSS
- **React Router** – Page navigation and routing
- **React Hook Form + Zod** – Efficient form handling with schema validation
- **React Query** – Seamless data fetching and caching
- **Redux Toolkit** – Global state management

### Backend
- **Node.js + Express** – RESTful API and server logic
- **WebSocket (Socket.IO)** – Real-time quiz hosting and participation
- **MongoDB** – NoSQL database for persistent data storage
- **Authecho** – Custom authentication service for user management

---

## 🔐 Authentication

Quizio uses **Authecho**, a proprietary authentication system, to handle:
- User registration
- Secure login
- Protected routes and API endpoints

All quiz creation, hosting, and result storage are gated behind authenticated sessions for a secure experience.

---

## 📋 How It Works

1. **User signs up** or logs in via Authecho.
2. From the dashboard, users can **create new quizzes** or view past ones.
3. When ready, the user can **launch a quiz session** and share a session code.
4. Other participants **join the session** using the code, in real time.
5. Questions are broadcast via WebSockets and players **answer live**.
6. After the quiz, results are **saved in MongoDB** and can be viewed anytime.

---

## 🧪 Dev Setup

To run Quizio locally:

```bash
# Clone the repo
git clone https://github.com/yourusername/quizio.git

# Client - pull Client branch
npm install
npm run dev

# Server - pull Server branch
npm install
npm start
```

Check out **Quizio** in action:  
👉 [https://quizioapp.onrender.com/](https://quizioapp.onrender.com/)
