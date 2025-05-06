// Imports
import { useState } from 'react';
import axios from 'axios';
import {
  Button, TextField, CircularProgress, Modal, Box, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// State management
const ShortenForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // API call
  const handleShorten = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/encode', { longUrl });
      setShortUrl(res.data.shortUrl);
      setOpen(true);
    } catch (err) {
      setError('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: 2,
          mx: 'auto',
          maxWidth: 500,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleShorten} disabled={loading} fullWidth>
          {loading ? <CircularProgress size={24} /> : 'Shorten'}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            backgroundColor: 'white',
            margin: 'auto',
            mt: '15%',
            width: 400,
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6">Short URL Created:</Typography>
          <Typography sx={{ mt: 2 }}>{shortUrl}</Typography>
          <Button sx={{ mt: 2 }} onClick={() => navigate('/list')} variant="contained">
            View All Links
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ShortenForm;
