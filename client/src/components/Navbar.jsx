import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaBookmark } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { count } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <NavLink to="/" className="brand-logo">
          <span>ALGOFLIX</span>
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/studio"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Visualizer Studio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-list"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              My List
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <button
          className="nav-icon-btn"
          aria-label="Search algorithms"
          onClick={() => navigate('/search')}
        >
          <FaSearch />
        </button>

        <button
          className="nav-icon-btn"
          aria-label="View My List"
          onClick={() => navigate('/my-list')}
        >
          <FaBookmark />
          {count > 0 && <span className="badge-count">{count}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
