import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewMovies.css';
import axios from 'axios';
import Navbar from './Navbar';

const ViewMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('');
  const navigate = useNavigate();


useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get('http://localhost:8000/movies/', {
    headers: {
      Authorization: `Token ${token}`,
    }
  })
  .then((response) => {
    setMovies(response.data);
    setFilteredMovies(response.data);
  })
  .catch((error) => {
    console.error('Error fetching movies:', error);
  });
}, []);


    useEffect(() => {
    let updated = [...movies];

    if (filterStatus) {
      const statusRegex = new RegExp(filterStatus, 'i');
      updated = updated.filter((movie) => statusRegex.test(movie.status));
    }

    if (filterGenre) {
      const genreRegex = new RegExp(filterGenre, 'i');
      updated = updated.filter((movie) => genreRegex.test(movie.genre));
    }

    if (filterPlatform) {
      const platformRegex = new RegExp(filterPlatform, 'i');
      updated = updated.filter((movie) => platformRegex.test(movie.platform));
    }

    setFilteredMovies(updated);
  }, [filterStatus, filterGenre, filterPlatform, movies]);

   
   const handleEdit = (movie) => {
     navigate(`/edit/${movie.id}`);
   };

  return (
    <>
    <Navbar />
    <div className="view-container">
      <h2 className="view-title">🎬 My Watchlist</h2>

      <div className="controls">
        <div className="control-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>

        <div className="control-group">
          <label>Genre:</label>
          <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
            <option value="">All</option>
            <option value="Crime">Crime</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Comedy">Comedy</option>
          </select>
        </div>

        <div className="control-group">
          <label>Platform:</label>
          <select value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)}>
            <option value="">All</option>
            <option value="Netflix">Netflix</option>
            <option value="Prime">Prime</option>
            <option value="Hotstar">Hotstar</option>
             <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <p className="empty-msg">No content added yet.</p>
      ) : (
        <ul className="movie-list">
          {filteredMovies.map((movie) => (
            <li key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Platform:</strong> {movie.platform}</p>
              <p><strong>Status:</strong> {movie.status}</p>
              {movie.type === 'tvshow' && (
  <>
    <p><strong>Type:</strong> 📺 TV Show</p>
    <p><strong>Episodes Watched:</strong> {movie.episodes_watched || 0}</p>
    <p><strong>Progress:</strong> {movie.episodes_watched || 0}/{movie.total_episodes || 0}</p>
  </>
)}

{movie.type === 'movie' && (
  <p><strong>Type:</strong> 🎬 Movie</p>
)}


              {movie.rating && <p><strong>Rating:</strong> ⭐ {movie.rating}/5</p>}
              {movie.review && <p><strong>Review:</strong> {movie.review}</p>}

              <button className="edit-btn" onClick={() => handleEdit(movie)}>✏️ Edit</button>
             
            </li>
          ))}
        </ul>
      )}
    </div>
     </>
  );
};

export default ViewMovies;




