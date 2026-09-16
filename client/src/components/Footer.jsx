import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h4>ALGOFLIX</h4>
          <p>Stream, analyze, and interactively master Data Structures & Algorithms.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <strong>Navigation</strong>
            <Link to="/">Home Browse</Link>
            <Link to="/studio">Visualizer Studio</Link>
            <Link to="/search">Algorithm Catalog</Link>
            <Link to="/my-list">My Saved List</Link>
          </div>

          <div className="footer-col">
            <strong>Categories</strong>
            <Link to="/search?category=Sorting">Sorting Algorithms</Link>
            <Link to="/search?category=Searching">Searching Techniques</Link>
            <Link to="/search?category=Graph%20Theory">Graph Theory</Link>
            <Link to="/search?category=Dynamic%20Programming">Dynamic Programming</Link>
          </div>

          <div className="footer-col">
            <strong>Resources</strong>
            <a href="https://leetcode.com" target="_blank" rel="noreferrer">LeetCode Practice</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">Open Source GitHub</a>
            <a href="#privacy">Privacy & Terms</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AlgoFlix Inc. Built with React, Vite, Node.js, Express & MongoDB.</p>
      </div>
    </footer>
  );
};

export default Footer;
