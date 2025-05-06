// Imports
const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
const redirectRoutes = require('./routes/redirectRoutes');

// App setup
const app = express();
app.use(cors());
app.use(express.json()); // Parse requests in JSON format

// API route
app.use('/api', urlRoutes);

// Redirect route
app.use('/', redirectRoutes);

module.exports = app; // Export for tests

// PORT setup
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

