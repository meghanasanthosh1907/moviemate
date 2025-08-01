import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

const handleLogout = async () => {
  const token = localStorage.getItem('token');

  try {
    await axios.post('http://localhost:8000/logout/', {}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    localStorage.removeItem('token');
    navigate('/login');
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/home" className="nav-link">🏠 Home</Link>
        <Link to="/add" className="nav-link">➕ Add</Link>
        <Link to="/movies" className="nav-link">🎞️ View</Link>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
