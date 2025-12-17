import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ArchiveDetail from './pages/ArchiveDetail';
import Search from './pages/Search';
import RecentViews from './pages/RecentViews';
import Favorites from './pages/Favorites';
import './styles/App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/archives" element={<Home />} />
        <Route path="/archives/:id" element={<ArchiveDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recent" element={<RecentViews />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
