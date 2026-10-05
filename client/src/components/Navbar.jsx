import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaBookmark, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { count } = useFavorites();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <>
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
                end
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
            aria-label="View My List"
            onClick={() => navigate('/my-list')}
          >
            <FaBookmark />
            {count > 0 && <span className="badge-count">{count}</span>}
          </button>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                className="nav-icon-btn"
                aria-label="User menu"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    border: '2px solid #e50914',
                  }}
                />
              </button>

              {userMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    background: '#181818',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '4px',
                    padding: '0.5rem 0',
                    minWidth: '180px',
                    zIndex: 1000,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
                  }}
                >
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e5e5' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '0.6rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      color: '#e5e5e5',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                    onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.05)')}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="nav-icon-btn"
              aria-label="Sign in"
              onClick={() => openAuthModal('login')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaUser />
            </button>
          )}

          <button
            className="nav-icon-btn mobile-menu-btn"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Slide-Down Menu */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/studio" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
            Visualizer Studio
          </NavLink>
          <NavLink to="/my-list" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
            My List
          </NavLink>

          {user ? (
            <>
              <div
                style={{
                  padding: '0.75rem 1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  marginTop: '0.5rem',
                  color: '#888',
                  fontSize: '0.85rem',
                }}
              >
                Signed in as <strong style={{ color: '#e5e5e5' }}>{user.name}</strong>
              </div>
              <button
                className="mobile-nav-item"
                onClick={handleLogout}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  color: '#e50914',
                  fontWeight: 600,
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className="mobile-nav-item"
                onClick={() => openAuthModal('login')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  marginTop: '0.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                Sign In
              </button>
              <button
                className="mobile-nav-item"
                onClick={() => openAuthModal('signup')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  color: '#e50914',
                  fontWeight: 600,
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </>
  );
};

export default Navbar;
