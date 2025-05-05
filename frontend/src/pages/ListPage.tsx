import { useEffect, useState } from 'react';
import axios from 'axios';

// Visit Log Type safety
interface VisitLog {
  timestamp: string;
  browser: string;
}

// Entry Type safety
interface UrlEntry {
  shortId: string;
  longUrl: string;
  shortUrl: string;
  createdAt: string;
  visits: number;
  visitLogs?: VisitLog[];
}

// State management
const ListPage = () => {
  const [data, setData] = useState<UrlEntry[]>([]);
  const [search, setSearch] = useState('');
  const [decodedUrl, setDecodedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = search
          ? `http://localhost:5000/api/search?query=${encodeURIComponent(search)}`
          : 'http://localhost:5000/api/list';

        const res = await axios.get(endpoint);
        setData(res.data);
      } catch (err) {
        setData([]);
      }
    };

    fetchData();
  }, [search]);

  const decodeUrl = async (shortUrl: string) => {
    try {
      const res = await axios.post('http://localhost:5000/api/decode', { shortUrl });
      setDecodedUrl(res.data.longUrl);
      alert(`Decoded URL: ${res.data.longUrl}`);
    } catch (err) {
      alert('Failed to decode URL');
    }
  };

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
        {data.map(entry => (
          <li key={entry.shortId}>
            <a href={entry.shortUrl} target="_blank" rel="noopener noreferrer">{entry.shortUrl}</a>
            <div>Original: {entry.longUrl}</div>
            <div>Created: {new Date(entry.createdAt).toLocaleString()}</div>
            <div>Visits: {entry.visits}</div>
            {entry.visitLogs && (
              <ul>
                {entry.visitLogs.map((log, idx) => (
                  <li key={idx}>
                    {new Date(log.timestamp).toLocaleString()} - {log.browser}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => decodeUrl(entry.shortUrl)}>Decode</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
