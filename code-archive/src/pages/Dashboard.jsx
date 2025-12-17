import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Folder, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';
import { getAllArchives } from '../services/archiveService';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.scss';

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentArchives, setRecentArchives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentArchives();
  }, []);

  const loadRecentArchives = async () => {
    try {
      const archives = await getAllArchives();
      const sorted = [...archives].sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      });
      setRecentArchives(sorted.slice(0, 5));
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const codeCategories = CATEGORIES.filter(c => c.type === 'code');
  const conceptCategories = CATEGORIES.filter(c => c.type === 'concept');

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <section className="hero-section">
          <h1>CodeArchive</h1>
          <p>코드 스니펫과 개념을 정리하고 검색하세요.</p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-hint">Enter</span>
            </div>
          </form>
        </section>

        <section className="categories-section">
          <h2>카테고리</h2>
          
          <div className="category-group">
            <h3>실용 코드</h3>
            <div className="category-grid">
              {codeCategories.map(category => (
                <Link
                  key={category.id}
                  to={`/archives?category=${category.id}`}
                  className="category-card"
                >
                  <Folder size={18} />
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="category-group">
            <h3>개념 정리</h3>
            <div className="category-grid">
              {conceptCategories.map(category => (
                <Link
                  key={category.id}
                  to={`/archives?category=${category.id}`}
                  className="category-card"
                >
                  <Folder size={18} />
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="recent-section">
          <div className="section-header">
            <h2>최근 추가된 문서</h2>
            <Link to="/archives" className="view-all">
              전체 보기 <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="loading">불러오는 중...</div>
          ) : recentArchives.length === 0 ? (
            <div className="empty-message">아직 추가된 문서가 없습니다.</div>
          ) : (
            <ul className="recent-list">
              {recentArchives.map((archive) => (
                <li key={archive.id}>
                  <Link to={`/archives/${archive.id}`} className="recent-item">
                    <div className="item-info">
                      <span className="item-title">{archive.title}</span>
                      <span className="item-category">
                        {CATEGORIES.find(c => c.id === archive.category)?.name || archive.category}
                      </span>
                    </div>
                    {archive.language && (
                      <span className="item-language">{archive.language}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
