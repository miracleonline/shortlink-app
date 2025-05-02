import { useEffect, useState } from 'react';
import axios from 'axios';

// Type safety
interface UrlEntry {
  shortId: string;
  longUrl: string;
  shortUrl: string;
  createdAt: string;
  visits: number;
}

// State management
const ListPage = () => {
  const [data, setData] = useState<UrlEntry[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/list').then(res => {
      setData(res.data);
    });
  }, []);

  const filtered = data.filter(entry =>
    entry.longUrl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>All Shortened URLs</h2>
      <input
        type="text"
        placeholder="Search long URLs"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map(entry => (
          <li key={entry.shortId}>
            <a href={entry.shortUrl} target="_blank" rel="noopener noreferrer">{entry.shortUrl}</a>
            <div>Original: {entry.longUrl}</div>
            <div>Created: {new Date(entry.createdAt).toLocaleString()}</div>
            <div>Visits: {entry.visits}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
