// Imports
import { useState } from 'react';
import axios from 'axios';

// State management
const ShortenForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  // API call
  const handleShorten = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/encode', { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error('Shortening failed', err);
    }
  };

  return (
    <div>
      <input
        value={longUrl}
        onChange={e => setLongUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={handleShorten}>Shorten</button>
      {shortUrl && <p>Short URL: {shortUrl}</p>}
    </div>
  );
};

export default ShortenForm;
