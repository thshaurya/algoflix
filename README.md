# 🍿 AlgoFlix — The Netflix of Algorithms

<p align="center">
  <strong>Master Data Structures & Algorithms through interactive visualization. Stream, learn, and conquer coding interviews the Netflix way.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
</p>

---

## 🚀 Overview

**AlgoFlix** is a full-stack web application that gamifies and streamlines the process of learning Data Structures and Algorithms by wrapping educational content inside a cinematic, Netflix-inspired dark UI. 

Instead of reading dry text, users explore algorithm "titles" categorized into rows (Trending, Sorting, Searching, Graphs, Dynamic Programming), watch step-by-step frame visualizations with custom speed control, compare multi-language implementations with syntax highlighting, and save algorithms to their personal watchlist.

---

## ✨ Features

- **🎬 Netflix-Themed Cinematic UI**: Hero billboard with staggered animations, horizontal scrolling rows, movie-style detail modals, and backdrop blur.
- **⚡ Interactive Visualizer Studio**: Step-by-step animations with play/pause/step controls, speed sliders, and real-time execution tracking.
- **📊 4 Specialized Visualizer Engines**:
  - **Sorting Visualizer**: Bar charts tracking comparing, swapping, pivot, and partitioned states.
  - **Searching Visualizer**: Array cells with moving Low/Mid/High pointer indicators.
  - **Graph Visualizer**: Interactive responsive SVG graph showing BFS traversal and Dijkstra's shortest paths with distance tables.
  - **DP Visualizer**: Dynamic programming tables and subarray state visualization.
- **💻 Multi-Language Code Viewer**: Tabbed code implementations in **JavaScript**, **Python**, **C++**, and **Java** with full syntax highlighting and one-click copy.
- **🔍 Full-Text Search & Multi-Filter**: Debounced search by title, tag, or description, with instant category and difficulty filters.
- **⭐ Persistent Watchlist ("My List")**: Save algorithms to your personal watchlist backed by `localStorage`.
- **🛡️ In-Memory Fallback Engine**: Works out-of-the-box even without a running MongoDB instance by serving seeded algorithms directly in memory.
- **📱 Fully Responsive**: Custom CSS design system optimized for desktops, tablets, and mobile screens.

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** — Functional components with hooks
- **Vite 5.2** — Fast HMR build tool
- **React Router DOM v6** — Client-side routing
- **Framer Motion** — Fluid layout transitions and modal animations
- **Highlight.js** — Multi-language syntax highlighting
- **React Icons** — Feather and FontAwesome icons
- **Pure CSS** — 1350+ lines of custom CSS variables and responsive design (no Tailwind/Bootstrap dependency)

### Backend
- **Node.js & Express 4.19** — RESTful API architecture
- **MongoDB & Mongoose 8.4** — Document database with text indexing
- **CORS & Dotenv** — Middleware for security and configuration

---

## 📂 Project Structure

```
AlgoFlix/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── AlgorithmCard.jsx
│   │   │   ├── AlgorithmModal.jsx
│   │   │   ├── AlgorithmRow.jsx
│   │   │   ├── CodeViewer.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Visualizer.jsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useAlgorithmVisualizer.js
│   │   │   └── useFavorites.js
│   │   ├── pages/              # Route pages
│   │   │   ├── AlgorithmDetail.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── MyListPage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   └── VisualizerStudio.jsx
│   │   ├── services/           # Axios API services
│   │   ├── styles/             # Custom Netflix-themed CSS
│   │   └── utils/              # Helper utilities
│   └── vite.config.js
├── server/                     # Express Backend
│   ├── config/                 # DB connection & fallback logic
│   ├── controllers/            # Algorithm controllers
│   ├── middleware/             # Error handling & validators
│   ├── models/                 # Mongoose Schema
│   ├── routes/                 # Express API routes
│   ├── seed/                   # Seed data & CLI seeder
│   └── server.js               # Entry point
├── launch.bat                  # One-click Windows starter
├── package.json                # Monorepo root scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- *(Optional)* **MongoDB** running locally on `mongodb://127.0.0.1:27017/algoflix` (the app will run in fallback mode if MongoDB is not present).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/algoflix.git
   cd algoflix
   ```

2. **Install all dependencies** (root, client, and server):
   ```bash
   npm run install:all
   ```

3. **(Optional) Seed MongoDB**:
   ```bash
   npm run seed
   ```

4. **Start the development environment**:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   - **Frontend**: `http://localhost:5173`
   - **Backend API**: `http://localhost:5000/api/algorithms`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/algorithms` | Get all algorithms (supports `?category=`, `?difficulty=`, `?search=`, `?featured=`) |
| `GET` | `/api/algorithms/featured` | Get the hero featured algorithm |
| `GET` | `/api/algorithms/categories` | Get category names with count metadata |
| `GET` | `/api/algorithms/:slug` | Get full algorithm details by slug |
| `POST` | `/api/algorithms` | Create a new algorithm entry |
| `GET` | `/api/health` | Backend health check |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/algoflix/issues).

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
