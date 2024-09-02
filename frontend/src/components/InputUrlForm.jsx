import React, { useState } from 'react';
import axios from 'axios';

const InputUrlForm = ({ onScrape }) => {

  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:5000/scrape`, {
        params: { url: url }
    });
      onScrape(response.data);
    } catch (error) {
      console.error('Error scraping URL:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      <button type="submit">Scrape</button>
    </form>
  )
}

export default InputUrlForm