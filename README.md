# AlgoFlix 🍿⚡
> The Netflix of Algorithms — Learn, Explore, and Interactively Visualize Data Structures & Algorithms.

![AlgoFlix Preview](https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80)

AlgoFlix is a modern, full-stack educational web application designed like Netflix for discovering, learning, and visualizing Data Structures and Algorithms. It features cinematic dark UI, animated carousels, step-by-step interactive visualizers, multi-language code viewers, live search, and a personal "My List" bookmarking system.

---

## 🛠 Tech Stack

### Frontend (`/client`)
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: React Icons (Lucide / Feather / Ionicons)
- **HTTP Client**: Axios
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism)

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Configuration**: Dotenv
- **Cross-Origin**: CORS
- **Dev Tool**: Nodemon

---

## 📁 Project Architecture

```text
AlgoFlix/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Netflix-style header with scroll effect & search
│   │   │   ├── Footer.jsx              # Branded streaming footer
│   │   │   ├── HeroBanner.jsx          # Cinematic featured algorithm billboard
│   │   │   ├── AlgorithmCard.jsx       # Hover-expand card with badges and quick actions
│   │   │   ├── AlgorithmRow.jsx        # Horizontal smooth carousel with scroll arrows
│   │   │   ├── AlgorithmModal.jsx      # Detail preview modal popup
│   │   │   ├── Visualizer.jsx          # Interactive animated bar sorting/searching visualizer
│   │   │   └── CodeViewer.jsx          # Tabbed code viewer (JS, Python, C++, Java) with copy button
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Netflix browse page with categorized rows
│   │   │   ├── AlgorithmDetail.jsx     # Deep dive theory, complexity breakdown, and code
│   │   │   ├── VisualizerStudio.jsx    # Dedicated interactive sandbox with custom array inputs
│   │   │   ├── SearchPage.jsx          # Live search and category/difficulty filtering
│   │   │   └── MyListPage.jsx          # Bookmarked algorithms collection
│   │   ├── services/
│   │   │   ├── api.js                  # Axios instance with base URL & timeout
│   │   │   └── algorithmService.js     # API methods for algorithms and categories
│   │   ├── hooks/
│   │   │   ├── useFavorites.js         # LocalStorage-backed bookmarking hook
│   │   │   └── useAlgorithmVisualizer.js # Visualizer playback engine (play, pause, step, speed)
│   │   ├── styles/
│   │   │   └── index.css               # Global styles, dark theme, typography, keyframes
│   │   ├── App.jsx                     # Root router and global layout
│   │   └── main.jsx                    # React 18 DOM mount
│   ├── index.html                      # HTML5 template with Netflix dark styling
│   ├── vite.config.js                  # Vite configuration with API proxy
│   └── package.json                    # Frontend dependencies
│
├── server/
│   ├── config/
│   │   └── db.js                       # MongoDB connection with graceful in-memory fallback
│   ├── controllers/
│   │   └── algorithmController.js      # REST API handlers
│   ├── middleware/
│   │   └── errorHandler.js             # 404 & centralized error handlers
│   ├── models/
│   │   └── Algorithm.js                # Mongoose schema for algorithms
│   ├── routes/
│   │   └── algorithmRoutes.js          # REST endpoints
│   ├── utils/
│   │   └── apiResponse.js              # Standardized API response formatters
│   ├── seed/
│   │   ├── seedData.js                 # Rich DSA dataset (Sorting, Graphs, DP, Trees)
│   │   └── seeder.js                   # Standalone database population script
│   ├── .env                            # Backend environment configuration
│   ├── server.js                       # Express app bootstrap & middleware
│   └── package.json                    # Backend dependencies & scripts
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start (Launch with One Command)

To run the entire full-stack application (both Backend API and Frontend UI simultaneously):

```bash
# In the project root (d:/Algoflix)
npm start
```
*(Or on Windows, simply double-click **`launch.bat`**)*

- **Frontend Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Database**: Automatically connected to MongoDB (with built-in fallback mode)
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
```bash
# In another terminal, navigate to the client folder
cd client

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
The client will start on `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/algorithms` | Fetch all algorithms (supports `?category=`, `?difficulty=`, `?search=`) |
| `GET` | `/api/algorithms/featured` | Fetch spotlight hero algorithm |
| `GET` | `/api/algorithms/categories` | Fetch all available algorithm categories |
| `GET` | `/api/algorithms/:slug` | Fetch a single algorithm by slug |
| `POST` | `/api/algorithms` | Create a new algorithm |

---

## ✨ Features
- **Cinematic Dark UI**: Netflix-inspired theme with red accents (`#E50914`), deep blacks, and smooth hover scaling.
- **Interactive Visualizer**: Play, pause, step-forward, step-backward, adjust speed, and generate random arrays.
- **Multi-Language Code Studio**: View and copy clean implementations in JavaScript, Python, C++, and Java.
- **Complexity Analysis**: Big-O notation cards for best, average, and worst-case time and space complexities.
- **Dynamic Search & Filters**: Filter by category (Sorting, Searching, Graphs, DP) or difficulty (Easy, Medium, Hard).
- **My List / Bookmarking**: Persistent saved algorithm collection.
- **Zero Configuration Fallback**: If MongoDB is not active, the backend gracefully serves seed algorithms in-memory so you can start right away!
