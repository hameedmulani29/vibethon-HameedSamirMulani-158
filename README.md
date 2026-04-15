# 🚀 CareerPilot AI — Gamified AIML Learning Platform

> Learn AI/ML the way it should be learned — **interactive, visual, and practical**

---

## 🧠 Overview

**CareerPilot AI** is a modern, gamified learning platform designed to help students master **Artificial Intelligence and Machine Learning (AIML)** through:

* 📚 Structured learning paths
* 💻 Hands-on coding practice
* 🎮 Concept-based mini-games
* 🌍 Real-world simulations
* 📝 Interactive quizzes
* 🏆 Leaderboards & gamification

Unlike traditional platforms, CareerPilot AI focuses on **learning by doing**, not just watching.

---

## 🔐 Authentication System

The platform includes a full authentication system with the following features:

### Features
- **Signup**: Name, Email, Password with validation
- **Login**: Email, Password with "Remember Me" option
- **Session Management**: JWT-based with httpOnly cookies
- **Security**: Password hashing with bcrypt, input validation
- **Database**: MongoDB for user storage

### Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start MongoDB**:
   Make sure MongoDB is installed and running on `mongodb://localhost:27017`

3. **Start the Server**:
   ```bash
   node server.js
   ```

4. **Access the App**:
   Open `http://localhost:3001` in your browser

### API Endpoints
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/auth/status` - Check authentication status

### User Flow
1. Visit the app → Redirected to Login page
2. Click "Create Account" → Go to Signup page
3. Signup → Auto-login and redirect to Dashboard
4. Login → Redirect to Dashboard
5. Logout → Redirect to Login

---

## 🚨 Problem

Most platforms like Coursera and Udemy are:

* Passive (video-heavy)
* Low engagement
* Lack real-time feedback

Students struggle with:

* Understanding ML concepts deeply
* Applying knowledge practically
* Staying consistent

---

## 💡 Solution

CareerPilot AI introduces a **full learning loop**:

> **Learn → Practice → Play → Simulate → Test → Compete**

This ensures:

* Better retention
* Higher engagement
* Real-world readiness

---

## 🎯 Features

### 🔐 Authentication System

* Secure login & signup
* Session management
* User profile tracking

---

### 📚 Structured Learning Modules

* Beginner → Intermediate → Advanced levels
* Concept explanations
* Code examples
* Visual learning aids

---

### 💻 Interactive Coding Playground

* In-browser Python editor
* Run & modify code
* Output console
* Preloaded scripts

---

### 🎮 AIML Arcade (Mini-Games)

* Gradient Descent Runner
* Bias Hunter
* Neural Architect
* Overfitting Simulator

Learn complex concepts through **interactive gameplay**.

---

### 📝 Quiz & Assessment System

* MCQs + logic-based questions
* Instant feedback
* XP-based rewards

---

### 🌍 Real-World Simulations

* Spam Detection
* Sentiment Analysis
* Price Prediction

Apply concepts to **real-life scenarios**.

---

### 📊 Progress Dashboard

* Track learning progress
* XP & streaks
* Performance analytics

---

### 🏆 Leaderboard & Gamification

* Global rankings
* Badges & achievements
* Competitive learning environment

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend (Planned)

* Node.js / Firebase

### AI/ML (Simulation Layer)

* Python APIs (future integration)

---

## 📁 Project Structure

```
Vibethon/
│
├── .vscode/
│
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│
├── frontend/
│   ├── codelab.html
│   ├── dashboard.html
│   ├── games.html
│   ├── hero.html
│   ├── leaderboard.html
│   ├── learningPath.html
│   ├── learningPath.js
│   ├── progress.html
│   ├── quiz.html
│   ├── sandbox.html
│   ├── signin.html
│   ├── simulations.html
│   ├── signup.html
│
├── README.md
├── server.js
```


## 💥 One-Line Pitch

> ** NuralPlay transforms AI/ML learning into an interactive, gamified experience that makes students job-ready faster.**

---

## 🙌 Acknowledgements

Built with ❤️ for innovation, learning, and impact.

---

## 📬 Contact

For queries or collaboration:
📧 [EMAIL_ADDRESS](mailto:[EMAIL_ADDRESS])

---
