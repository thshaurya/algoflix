import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AlgorithmDetail from './pages/AlgorithmDetail';
import VisualizerStudio from './pages/VisualizerStudio';
import SearchPage from './pages/SearchPage';
import MyListPage from './pages/MyListPage';

export const App = () => {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithms/:slug" element={<AlgorithmDetail />} />
          <Route path="/studio" element={<VisualizerStudio />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
