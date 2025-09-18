// Imports
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent, Typography, TextField, Button, Modal
} from '@mui/material';
import Grid from '@mui/material/Grid';


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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = search
          ? `https://shortlink-app-u4vy.onrender.com/api/search?query=${encodeURIComponent(search)}`
          : 'https://shortlink-app-u4vy.onrender.com/api/list';

        const res = await axios.get(endpoint);
        setData(res.data);
      } catch (err) {
        setData([]);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // 5 seconds refresh
    return () => clearInterval(interval);
  }, [search]);

  const decodeUrl = async (shortUrl: string) => {
    try {
      const res = await axios.post('https://shortlink-app-u4vy.onrender.com/api/decode', { shortUrl });
      setDecodedUrl(res.data.longUrl);
      setOpen(true);
    } catch (err) {
      setDecodedUrl('Failed to decode URL');
      setOpen(true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>All Shortened URLs</Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Search URLs (Live filtering: start typing either short or long links to filter results)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {data.map((entry) => (
          <Grid {...{ item: true, xs: 12, md: 6, lg: 4 }} key={entry.shortId}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <a href={entry.shortUrl} target="_blank" rel="noopener noreferrer">{entry.shortId}</a>
                </Typography>
                <Typography variant="body2">Original: {entry.longUrl}</Typography>
                <Typography variant="body2">Created: {new Date(entry.createdAt).toLocaleString()}</Typography>
                <Typography variant="body2">Visits: {entry.visits}</Typography>
                {entry.visitLogs && (
                  <ul>
                    {entry.visitLogs.map((log, idx) => (
                      <li key={idx}>
                        {new Date(log.timestamp).toLocaleString()} - {log.browser}
                      </li>
                    ))}
                  </ul>
                )}
                <Button variant="contained" onClick={() => decodeUrl(entry.shortUrl)}>Decode</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
            mx: 'auto',
            mt: '15%',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6">Decoded URL:</Typography>
          <Typography sx={{ mt: 2 }}>{decodedUrl}</Typography>
          <Button sx={{ mt: 2 }} onClick={() => setOpen(false)} variant="contained">Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListPage;
