// Imports
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ListPage from './pages/ListPage';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '10px', padding: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
