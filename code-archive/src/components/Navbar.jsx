import { Link } from 'react-router-dom';
import { Code2, Home, Plus, Tag, Settings } from 'lucide-react';
import SearchBar from './SearchBar';
import '../styles/Navbar.scss';

export default function Navbar({ onSearch, onAddNew }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Code2 />
          Code Archive
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              <Home size={16} />
              홈
            </Link>
          </li>
          <li>
            <button className="navbar-link navbar-btn" onClick={onAddNew}>
              <Plus size={16} />
              새 코드
            </button>
          </li>
        </ul>

        <div className="navbar-search">
          <SearchBar onSearch={onSearch} />
        </div>

        <ul className="navbar-menu-right">
          <li>
            <Link to="/categories" className="navbar-link">
              <Tag size={16} />
              카테고리
            </Link>
          </li>
          <li>
            <Link to="/settings" className="navbar-link">
              <Settings size={16} />
              설정
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
