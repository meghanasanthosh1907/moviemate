import React, { useState } from 'react';
import './AddMovie.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const AddMovie = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
  director: '',
  genre: '',
  platform: '',
  customPlatform: '',
  status: '',
  episodesWatched: '',
  rating: '',
  review: '',
  contentType: '',     
  totalEpisodes: '', 
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Unauthorized: Please login first');
      return;
    }

    const finalData = {
      title: formData.title.trim(),
      director: formData.director,
      genre: formData.genre,
      platform: formData.platform === 'other' ? formData.customPlatform : formData.platform,
      status: formData.status,
      type: formData.contentType, 
      rating: formData.rating,
      review: formData.review,
    };

    // Add TV-specific fields if contentType is TV
 if (formData.contentType === 'tvshow') {
  if (formData.totalEpisodes !== '') {
    finalData.total_episodes = parseInt(formData.totalEpisodes);
  }
  if (formData.episodesWatched !== '') {
    finalData.episodes_watched = parseInt(formData.episodesWatched);
  }
}


    try {
      const response = await axios.post('http://127.0.0.1:8000/addmovie', finalData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setMessage('✅ Movie/TV Show added successfully!');
      console.log(response.data);
      navigate('/movies');
    } catch (error) {
        console.error('Full error:', error.response?.data);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`❌ ${error.response.data.error}`);
      } else {
        setMessage('❌ Failed to add. Please check your input or login again.');
      }
    }
  };

  return (
     <>
    <Navbar />
    <div className="add-container">
      <h2>Add Movie/TV Show 🎥</h2>
       {message && <p className="message">{message}</p>}
      <form className="add-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="director" placeholder="Director" onChange={handleChange} />
        <input type="text" name="genre" placeholder="Genre" onChange={handleChange} />

        <select name="platform" value={formData.platform} onChange={handleChange} required>
          <option value="">-- Select Platform --</option>
          <option value="netflix">Netflix</option>
          <option value="prime">Prime</option>
          <option value="hotstar">Hotstar</option>
          <option value="other">Other</option>
        </select>

        {formData.platform === 'other' && (
          <input
            type="text"
            name="customPlatform"
            placeholder="Enter Platform Name"
            onChange={handleChange}
            required
          />
        )}

        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">-- Select Status --</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
          <option value="wishlist">Wishlist</option>
        </select>

        {/* Content Type */}
        <select name="contentType" value={formData.contentType} onChange={handleChange} required>
          <option value="">-- Select Content Type --</option>
          <option value="movie">Movie</option>
          <option value="tvshow">TV Show</option>
        </select>

        {/* Conditional for TV Show */}
        {formData.contentType === 'tvshow' && (
          <>
            <input
              type="number"
              name="totalEpisodes"
              placeholder="Total Episodes"
              onChange={handleChange}
            />
            <input
              type="number"
              name="episodesWatched"
              placeholder="Episodes Watched"
              onChange={handleChange}
            />
          </>
        )}
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          onChange={handleChange}
          min="1"
          max="5" step="0.1"
        />
        <textarea
          name="review"
          placeholder="Write a short review..."
          onChange={handleChange}
        ></textarea>

        <button type="submit">➕ Add</button>
      </form>
    </div>
    </>
  );
};

export default AddMovie;
