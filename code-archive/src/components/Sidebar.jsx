// 사이드바 컴포넌트 (접이식)
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [recentViews, setRecentViews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // 카테고리 목록
  const categories = [
    { name: 'JavaScript', icon: '📜', count: 0 },
    { name: 'React', icon: '⚛️', count: 0 },
    { name: 'CSS/Styling', icon: '🎨', count: 0 },
    { name: 'Firebase', icon: '🔥', count: 0 },
    { name: 'API 연동', icon: '🔌', count: 0 },
    { name: '알고리즘', icon: '🧮', count: 0 },
    { name: '기타', icon: '📦', count: 0 },
  ];

  // 로컬 스토리지에서 데이터 불러오기
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

  // 카테고리별 아카이브 개수 계산
  const getCategoryCounts = () => {
    try {
      const archives = JSON.parse(localStorage.getItem('code-archives') || '[]');
      const counts = {};

      categories.forEach((cat) => {
        counts[cat.name] = archives.filter(
          (archive) => archive.category === cat.name
        ).length;
      });

      return counts;
    } catch (error) {
      return {};
    }
  };

  const categoryCounts = getCategoryCounts();

  const handleCategoryClick = (categoryName) => {
    // 카테고리 필터 적용하여 홈으로 이동
    navigate(`/?category=${encodeURIComponent(categoryName)}`);
  };

  const handleRecentClick = (archiveId) => {
    navigate(`/view/${archiveId}`);
  };

  const handleFavoriteClick = (archiveId) => {
    navigate(`/view/${archiveId}`);
  };

  return (
    <>
      {/* 토글 버튼 */}
      <button
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="사이드바 토글"
      >
        {isOpen ? '◀' : '▶'}
      </button>

      {/* 사이드바 */}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          {/* 최근 본 코드 */}
          <section className="sidebar-section">
            <h3 className="sidebar-title">
              🕒 최근 본 코드
            </h3>
            <ul className="sidebar-list">
              {recentViews.length === 0 ? (
                <li className="sidebar-empty">최근 기록 없음</li>
              ) : (
                recentViews.slice(0, 5).map((item) => (
                  <li key={item.id} className="sidebar-item">
                    <button
                      onClick={() => handleRecentClick(item.id)}
                      className="sidebar-link"
                    >
                      {item.title}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* 즐겨찾기/북마크 */}
          <section className="sidebar-section">
            <h3 className="sidebar-title">
              ⭐ 즐겨찾기
            </h3>
            <ul className="sidebar-list">
              {favorites.length === 0 ? (
                <li className="sidebar-empty">즐겨찾기 없음</li>
              ) : (
                favorites.slice(0, 5).map((item) => (
                  <li key={item.id} className="sidebar-item">
                    <button
                      onClick={() => handleFavoriteClick(item.id)}
                      className="sidebar-link"
                    >
                      {item.title}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* 카테고리별 분류 */}
          <section className="sidebar-section">
            <h3 className="sidebar-title">
              📂 카테고리
            </h3>
            <ul className="sidebar-list">
              {categories.map((category) => (
                <li key={category.name} className="sidebar-item">
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className="sidebar-link category-link"
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">
                      {categoryCounts[category.name] || 0}
                    </span>
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
