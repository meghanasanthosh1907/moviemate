import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from './Navbar';

function Home() {
  return (
     <>
        <Navbar />
    <div className="home-container">
      <h1 className="home-title">Welcome to MovieMate 🎬</h1>
      <div className="home-links">
        <Link to="/add" className="home-link">➕ Add Movie/Show</Link>
        <Link to="/movies" className="home-link">📂 View Collection</Link>
      </div>
    </div>
    </>
  );
}

export default Home;

