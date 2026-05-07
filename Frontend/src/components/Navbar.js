import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="logo-badge">YC</div>
          HN Reader
        </Link>

        <div className="navbar-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Stories
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/bookmarks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Bookmarks
            </NavLink>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <div className="user-chip">
                <div className="user-dot" />
                <span>{user?.username}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
