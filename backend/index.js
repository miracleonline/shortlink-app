// Imports
const app = require('./app');
const { PORT } = require('./config');

// PORT setup
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

