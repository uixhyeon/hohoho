// 즐겨찾기 페이지
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ArchiveCard from '../components/ArchiveCard';
import '../styles/Favorites.scss';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

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

  const handleEdit = (archive) => {
    // 수정 기능 - 나중에 구현
    console.log('Edit:', archive);
  };

  const handleDelete = (archiveId) => {
    if (!confirm('즐겨찾기에서 삭제하시겠습니까?')) return;

    try {
      const updated = favorites.filter(item => item.id !== archiveId);
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleToggleFavorite = (archiveId) => {
    // 즐겨찾기 토글 기능
    handleDelete(archiveId);
  };

  return (
    <div className="favorites-page">
      <Sidebar />

      <div className="favorites-main">
        <header className="page-header">
          <h1>⭐ 즐겨찾기</h1>
          <p>자주 보는 중요한 코드 아카이브를 모아보세요.</p>
        </header>

        <main className="favorites-content">
          {favorites.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⭐</div>
              <p>즐겨찾기한 코드가 없습니다.</p>
              <p className="empty-description">
                아카이브 카드에서 별 아이콘을 클릭하여 즐겨찾기에 추가하세요.
              </p>
              <button onClick={() => navigate('/')} className="go-home-btn">
                홈으로 가기
              </button>
            </div>
          ) : (
            <div className="archives-grid">
              {favorites.map((archive) => (
                <ArchiveCard
                  key={archive.id}
                  archive={archive}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Favorites;
