import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import {
  Button, TextField, CircularProgress, Modal, Box, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type ApiErrorResponse = {
  error: string;
};

const ShortenForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(''); 
  const [timer, setTimer] = useState(5); 
  const [timerActive, setTimerActive] = useState(false); 
  const navigate = useNavigate();

  // API call
  const handleShorten = async () => {
    setLoading(true);
    setError('');
    setMessage('Service starting in a few seconds...'); 
    setTimer(30); 
    setTimerActive(true); 
    try {
      const res = await axios.post('https://shortlink-app-u4vy.onrender.com/api/encode', { longUrl });
      setShortUrl(res.data.shortUrl);
      setOpen(true);
      setMessage('Service started, thanks for waiting! Test the app now.'); 
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      console.error('Axios Error:', axiosError);
      console.error('Response Data:', axiosError.response?.data);

      if (axiosError.response?.data?.error) {
        setError(axiosError.response.data.error);
      } else {
        setError('Failed to shorten URL. Please try again.');
      }
      setTimerActive(false); 
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1); 
        if (timer === 15) {
          setMessage('Almost there!'); 
        }
      }, 1000);
    } else if (timer === 0) {
      if (interval) clearInterval(interval);
    }

    return () => clearInterval(interval); 
  }, [timerActive, timer]);

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
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          This project is deployed on Render. The delay is due to the free plan's cold start, which typically takes a few seconds to initialize.
        </Typography>

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
        {message && !loading && (
          <Typography sx={{ mt: 2 }}>
            {message}
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