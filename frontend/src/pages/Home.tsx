// Imports
import { Box, Typography, Container, useMediaQuery } from '@mui/material';
import ShortenForm from '../components/ShortenForm';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          ml: { md: '240px' },
        }}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          component="h1"
          fontWeight="bold"
          gutterBottom
        >
          ShortLink App
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ maxWidth: 600 }}
        >
          ShortLink App: shorten your long URLs into clean short links.
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <ShortenForm />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
