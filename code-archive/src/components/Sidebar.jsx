import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Home, Clock, Star, Folder, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';
import '../styles/Sidebar.scss';

export default function Sidebar({ onCategorySelect, selectedCategory }) {
  const [isOpen, setIsOpen] = useState(true);
  const [recentViews, setRecentViews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadRecentViews();
    loadFavorites();
  }, []);

  const loadRecentViews = () => {
    try {
      const recent = localStorage.getItem('recent-views');
      if (recent) {
        setRecentViews(JSON.parse(recent));
      }
    } catch (error) {
      console.error('최근 본 코드 불러오기 실패:', error);
    }
  };

  const loadFavorites = () => {
    try {
      const fav = localStorage.getItem('favorites');
      if (fav) {
        setFavorites(JSON.parse(fav));
      }
    } catch (error) {
      console.error('즐겨찾기 불러오기 실패:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/archives?category=${categoryId}`);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="사이드바 토글"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <Link to="/" className="sidebar-logo">
          <span className="logo-title">CodeArchive</span>
          <span className="logo-subtitle">uixhyeon</span>
        </Link>

        <form onSubmit={handleSearch} className="sidebar-search">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <Home size={16} />
              홈
            </Link>
            <Link to="/recent" className={`nav-link ${isActive('/recent') ? 'active' : ''}`}>
              <Clock size={16} />
              최근 본 문서
            </Link>
            <Link to="/favorites" className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}>
              <Star size={16} />
              즐겨찾기
            </Link>
          </nav>

          <section className="sidebar-section">
            <h3 className="sidebar-title">
              <Folder size={14} />
              실용 코드
            </h3>
            <ul className="sidebar-list">
              {CATEGORIES.filter(cat => cat.type === 'code').map((category) => (
                <li key={category.id} className="sidebar-item">
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`sidebar-link ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="sidebar-section">
            <h3 className="sidebar-title">
              <Folder size={14} />
              개념 정리
            </h3>
            <ul className="sidebar-list">
              {CATEGORIES.filter(cat => cat.type === 'concept').map((category) => (
                <li key={category.id} className="sidebar-item">
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`sidebar-link ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </aside>
    </>
  );
}
