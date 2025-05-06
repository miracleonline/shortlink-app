# Indicina ShortLink

A simple URL shortener built with React + Node.js (in-memory).

### Running App

For more detailed instructions on how to run this project including
how to start the application and execute the tests, check INSTRUCTIONS.md file.

# Setup Instructions
npm install

### Backend
cd backend
node index.js

### Frontend
cd frontend
npm run dev

### Running Tests
cd backend
npm test

### API Samples

POST /api/encode
{ "longUrl": "https://indicina.co" }

POST /api/decode
{ "shortUrl": "http://localhost:5000/abc123" }

GET /api/stats/:shortId