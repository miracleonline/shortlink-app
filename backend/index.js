// Imports
const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

// App setup
const app = express();
app.use(cors());
app.use(express.json()); // Parse requests in JSON format

app.use('/api', urlRoutes);

// Redirect to original URL
app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const entry = urlRoutes.urlDatabase?.get(shortId);
  
  entry.visits += 1;
  res.redirect(entry.longUrl);
});

// PORT setup
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

