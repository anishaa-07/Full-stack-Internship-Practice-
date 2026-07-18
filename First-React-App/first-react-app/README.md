# 🎬 GIF Generator

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/Vite-8-purple?logo=vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript" />
  <img src="https://img.shields.io/badge/API-GIPHY%20%2F%20Tenor-green" />
  <img src="https://img.shields.io/badge/Status-In%20Progress-orange" />
  <img src="https://img.shields.io/github/license/anishaa-07/Full-stack-Internship-Practice" />
</p>

<p align="center">
  <b>A modern React application to search, discover, and explore animated GIFs using a public GIF API.</b>
</p>

---

## 📖 Overview

GIF Generator is a React-based web application that allows users to search for animated GIFs in real time. It demonstrates API integration, reusable React components, responsive UI design, and state management.

This project is built as part of my **Full Stack Development Internship Practice**.

---

# ✨ Features

- 🔍 Search GIFs instantly
- 🎲 Random GIF Generator
- ⚡ Fast API Integration
- 📱 Responsive Design
- 🎨 Clean & Modern UI
- 🔄 Dynamic Rendering
- ⏳ Loading State
- ❌ Error Handling
- ♻️ Reusable Components

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend Framework |
| Vite | Development Tool |
| JavaScript | Programming Language |
| CSS | Styling |
| Axios | API Requests |
| GIF API | Fetch GIFs |

---

# 📂 Project Structure

```text
gif-generator/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchGif.jsx
│   │   ├── RandomGif.jsx
│   │   ├── Header.css
│   │   ├── SearchGif.css
│   │   └── RandomGif.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🏗 Application Architecture

```text
                     User
                       │
                       ▼
                React Application
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
   Search GIF                  Random GIF
        │                             │
        └──────────────┬──────────────┘
                       │
                  Axios Request
                       │
                       ▼
                  GIF API Server
                       │
                       ▼
                GIF Response (JSON)
                       │
                       ▼
                React Components
                       │
                       ▼
                   Browser UI
```

---

# 🔄 Application Flow

```text
User enters keyword
          │
          ▼
Search Button Clicked
          │
          ▼
Axios sends API request
          │
          ▼
API returns GIF data
          │
          ▼
React updates state
          │
          ▼
GIF displayed on screen
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/anishaa-07/Full-stack-Internship-Practice.git
```

Move into the project

```bash
cd gif-generator
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

---

# 🎯 Learning Outcomes

- React Fundamentals
- Functional Components
- Props
- State Management
- API Integration
- Axios
- Conditional Rendering
- Responsive UI Design
- Git & GitHub Workflow

---

# 🔮 Future Improvements

- ❤️ Favorite GIFs
- ⬇️ Download GIF
- 📋 Copy GIF Link
- 🌙 Dark Mode
- 🔥 Trending GIFs
- 📜 Infinite Scroll
- 🏷 Category Filters
- ⚡ Debounced Search

---

# 👩‍💻 Author

**Anisha Ranjan**

- 💼 Full Stack Developer
- 🌱 Currently learning React, Node.js & Full Stack Development
- 🚀 Passionate about building modern web applications

---

## ⭐ Support

If you like this project, consider giving it a **⭐ Star** on GitHub.
