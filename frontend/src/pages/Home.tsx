// Imports
import { useState } from 'react';
import axios from 'axios';

// State management
const Home = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  // API call
  const handleShorten = async () => {
    const res = await axios.post('http://localhost:5000/api/encode', { longUrl });
    setShortUrl(res.data.shortUrl);
  };

  return (
    <div>
      <h1>ShortLink</h1>
      <input value={longUrl} onChange={e => setLongUrl(e.target.value)} placeholder="Enter URL" />
      <button onClick={handleShorten}>Shorten</button>
      {shortUrl && <p>Short URL: {shortUrl}</p>}
    </div>
  );
};

export default Home;
