// 최근 본 코드 페이지
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants/categories';
import Sidebar from '../components/Sidebar';
import ArchiveCard from '../components/ArchiveCard';
import ArchiveForm from '../components/ArchiveForm';
import '../styles/RecentViews.scss';

function RecentViews() {
  const [recentViews, setRecentViews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecentViews();
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

  const handleEdit = (archive) => {
    // 수정 기능 - 나중에 구현
    console.log('Edit:', archive);
  };

  const handleDelete = (archiveId) => {
    if (!confirm('최근 기록에서 삭제하시겠습니까?')) return;

    try {
      const updated = recentViews.filter(item => item.id !== archiveId);
      setRecentViews(updated);
      localStorage.setItem('recent-views', JSON.stringify(updated));
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    loadRecentViews();
  };

  return (
    <div className="recent-views-page">
      <Sidebar />

      <div className="recent-views-main">
        <header className="page-header">
          <div className="header-content">
            <div>
              <h1>🕒 최근 본 코드</h1>
              <p>최근에 확인한 코드 아카이브 목록입니다.</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="write-btn"
            >
              ✏️ 글쓰기
            </button>
          </div>
        </header>

        <main className="recent-views-content">
          {recentViews.length === 0 ? (
            <div className="empty-state">
              <p>최근 본 코드가 없습니다.</p>
              <button onClick={() => navigate('/')} className="go-home-btn">
                홈으로 가기
              </button>
            </div>
          ) : (
            <div className="archives-grid">
              {recentViews.map((archive) => (
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

      {showForm && (
        <ArchiveForm
          category={CATEGORIES[0].id}
          archive={null}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default RecentViews;
