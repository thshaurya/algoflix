import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h4>🍿 ALGOFLIX</h4>
          <p>Master Data Structures & Algorithms through interactive visualization. Stream, learn, and conquer coding interviews the Netflix way.</p>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <strong>Platform</strong>
            <Link to="/">Home</Link>
            <Link to="/studio">Interactive Studio</Link>
            <Link to="/search">Algorithm Catalog</Link>
            <Link to="/my-list">My Saved List</Link>
          </div>

          <div className="footer-col">
            <strong>Categories</strong>
            <Link to="/search?category=Sorting">Sorting</Link>
            <Link to="/search?category=Searching">Searching</Link>
            <Link to="/search?category=Graph%20Theory">Graph Theory</Link>
            <Link to="/search?difficulty=Easy">Easy Algorithms</Link>
          </div>

          <div className="footer-col">
            <strong>Resources</strong>
            <a href="https://leetcode.com" target="_blank" rel="noreferrer">LeetCode Practice</a>
            <a href="https://www.bigocheatsheet.com" target="_blank" rel="noreferrer">Big O Cheat Sheet</a>
            <a href="https://visualgo.net" target="_blank" rel="noreferrer">VisuAlgo</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">Contribute on GitHub</a>
          </div>

          <div className="footer-col">
            <strong>Support</strong>
            <a href="#help">Help Center</a>
            <a href="#about">About AlgoFlix</a>
            <a href="#contact">Contact Us</a>
            <a href="#privacy">Privacy & Terms</a>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} AlgoFlix. Built with <FaHeart style={{ color: '#e50914', margin: '0 4px', verticalAlign: 'middle' }} /> using React, Vite, Node.js, Express & MongoDB.
        </p>
        <p className="footer-tagline">
          Learn algorithms the way you binge Netflix. Interactive. Visual. Addictive.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
