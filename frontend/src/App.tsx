// Imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
