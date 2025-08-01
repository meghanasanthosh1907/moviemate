import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditMovie.css';
import Navbar from './Navbar';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    genre: '',
    platform: '',
    status: '',
    type: '',
    totalEpisodes: '',
    episodesWatched: '',
    rating: '',
    review: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/movies/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
        if (error.response?.data) {
          console.log(error.response.data);
        }
      });
  }, [id, token]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'type' && value === 'Movie') {
      setMovieData((prev) => ({
        ...prev,
        type: value,
        totalEpisodes: null,
        episodesWatched: null,
      }));
    } else {
      setMovieData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

const updatedData = {
  title: movieData.title,
  director: movieData.director,
  genre: movieData.genre,
  platform: movieData.platform,
  status: movieData.status,
  type: movieData.type.toLowerCase(), 
  total_episodes: movieData.type === 'tvshow' ? Number(movieData.totalEpisodes) : null,
  episodes_watched: movieData.type === 'tvshow' ? Number(movieData.episodesWatched) : null,
  rating: movieData.rating ? Number(movieData.rating) : null,
  review: movieData.review,
};


    axios
      .put(`http://localhost:8000/movies/${id}/edit/`, updatedData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        alert('Movie updated successfully!');
        navigate('/movies');
      })
      .catch((error) => {
        console.error('Error updating movie:', error);
        if (error.response?.data) {
          console.log('Validation errors:', error.response.data);
          alert('Validation failed: ' + JSON.stringify(error.response.data));
        } else {
          alert('Failed to update movie');
        }
      });
  };

  return (
     <>
    <Navbar />
    <div className="edit-movie-container">
      <h2>Edit Movie</h2>
      <form className="edit-movie-form" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={movieData.title} onChange={handleChange} required />

        <label>Director:</label>
        <input type="text" name="director" value={movieData.director} onChange={handleChange} required />

        <label>Genre:</label>
        <input type="text" name="genre" value={movieData.genre} onChange={handleChange} required />

        <label>Platform:</label>
        <select name="platform" value={movieData.platform} onChange={handleChange} required>
          <option value="">-- Select Platform --</option>
          <option value="netflix">Netflix</option>
          <option value="prime">Prime</option>
          <option value="hotstar">Hotstar</option>
          <option value="other">Other</option>
        </select>
    {movieData.platform === 'other' && (
          <input
            type="text"
            name="customPlatform"
            placeholder="Enter Platform Name"
            onChange={handleChange}
            required
          />
        )}

        <label>Status:</label>
<select name="status" value={movieData.status} onChange={handleChange} required>
  <option value="">-- Select --</option>
  <option value="watching">Watching</option>
  <option value="completed">Completed</option>
  <option value="wishlist">Wishlist</option>
</select>


        <label>Type:</label>
        <select name="type" value={movieData.type} onChange={handleChange} required>
          <option value="">-- Select --</option>
          <option value="Movie">Movie</option>
          <option value="tvshow">TV Show</option>
        </select>

        {movieData.type === 'tvshow' && (
          <>
            <label>Total Episodes:</label>
            <input
              type="number"
              name="totalEpisodes"
              value={movieData.totalEpisodes || ''}
              onChange={handleChange}
              min="1"
            />

            <label>Episodes Watched:</label>
            <input
              type="number"
              name="episodesWatched"
              value={movieData.episodesWatched || ''}
              onChange={handleChange}
              min="0"
              max={movieData.totalEpisodes || ''}
            />
          </>
        )}

        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={movieData.rating || ''}
          onChange={handleChange}
          min="1"
          max="5" step="0.1"
        />

        <label>Review:</label>
        <textarea name="review" value={movieData.review} onChange={handleChange} />

        <button type="submit" className="edit-submit-btn">
          Save Changes
        </button>
      </form>
    </div>
    </>
  );
};

export default EditMovie;
