// 홈 페이지 - 아카이브 목록 (로컬 스토리지 버전)
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [archives, setArchives] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 아카이브 목록 불러오기 (로컬 스토리지)
  useEffect(() => {
    loadArchives();
  }, []);

  const loadArchives = () => {
    try {
      const saved = localStorage.getItem('code-archives');
      if (saved) {
        const archivesData = JSON.parse(saved);
        setArchives(archivesData);
      }
    } catch (error) {
      console.error('아카이브 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 아카이브 삭제
  const handleDelete = (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const newArchives = archives.filter((archive) => archive.id !== id);
      setArchives(newArchives);
      localStorage.setItem('code-archives', JSON.stringify(newArchives));
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  // 검색 필터
  const filteredArchives = archives.filter(
    (archive) =>
      archive.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      archive.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="home-container">
      {/* 헤더 */}
      <header className="header">
        <h1>📚 Code Archive</h1>
        <div className="header-actions">
          <span className="user-email">로컬 모드</span>
        </div>
      </header>

      {/* 검색 및 추가 */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="🔍 검색 (제목, 카테고리)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => navigate('/create')}
          className="create-btn"
        >
          ➕ 새 아카이브
        </button>
      </div>

      {/* 아카이브 목록 */}
      <div className="archives-grid">
        {filteredArchives.length === 0 ? (
          <div className="empty-state">
            <p>아카이브가 없습니다.</p>
            <button onClick={() => navigate('/create')} className="create-btn">
              첫 아카이브 만들기
            </button>
          </div>
        ) : (
          filteredArchives.map((archive) => (
            <div key={archive.id} className="archive-card">
              <div className="card-header">
                <h3>{archive.title || '제목 없음'}</h3>
                <span className="category">{archive.category || '기타'}</span>
              </div>

              <div className="card-body">
                <p className="description">
                  {archive.description || '설명 없음'}
                </p>
                <div className="meta">
                  <span>📝 {archive.annotations?.length || 0}개 메모</span>
                  <span>
                    📅{' '}
                    {archive.createdAt
                      ? new Date(archive.createdAt).toLocaleDateString()
                      : '날짜 없음'}
                  </span>
                </div>
              </div>

              <div className="card-actions">
                <button
                  onClick={() => navigate(`/view/${archive.id}`)}
                  className="view-btn"
                >
                  보기
                </button>
                <button
                  onClick={() => navigate(`/edit/${archive.id}`)}
                  className="edit-btn"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(archive.id)}
                  className="delete-btn"
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
