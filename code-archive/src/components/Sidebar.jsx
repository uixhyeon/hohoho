// 사이드바 컴포넌트 (접이식)
import { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants/categories';
import '../styles/Sidebar.scss';

export default function Sidebar({ onCategorySelect, selectedCategory }) {
  const [isOpen, setIsOpen] = useState(true);
  const [recentViews, setRecentViews] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  const handleCategoryClick = (categoryId) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  const handleRecentClick = (archiveId) => {
    // 아카이브 보기 기능 (나중에 구현)
    console.log('Recent archive:', archiveId);
  };

  const handleFavoriteClick = (archiveId) => {
    // 아카이브 보기 기능 (나중에 구현)
    console.log('Favorite archive:', archiveId);
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
            <div className="category-groups">
              {/* 실용 코드 */}
              <div className="category-group">
                <h4 className="category-group-title">실용 코드</h4>
                <ul className="sidebar-list">
                  {CATEGORIES.filter(cat => cat.type === 'code').map((category) => (
                    <li key={category.id} className="sidebar-item">
                      <button
                        onClick={() => handleCategoryClick(category.id)}
                        className={`sidebar-link category-link ${selectedCategory === category.id ? 'active' : ''}`}
                      >
                        <span className="category-name">{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 개념 정리 */}
              <div className="category-group">
                <h4 className="category-group-title">개념 정리</h4>
                <ul className="sidebar-list">
                  {CATEGORIES.filter(cat => cat.type === 'concept').map((category) => (
                    <li key={category.id} className="sidebar-item">
                      <button
                        onClick={() => handleCategoryClick(category.id)}
                        className={`sidebar-link category-link ${selectedCategory === category.id ? 'active' : ''}`}
                      >
                        <span className="category-name">{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
