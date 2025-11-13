// 아카이브 보기 페이지 (읽기 전용 - 로컬 스토리지 버전)
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import './ViewArchive.css';

export default function ViewArchive() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [archive, setArchive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArchive();
  }, [id]);

  const loadArchive = () => {
    try {
      const saved = localStorage.getItem('code-archives');
      if (saved) {
        const archives = JSON.parse(saved);
        const foundArchive = archives.find((a) => a.id === id);

        if (foundArchive) {
          setArchive(foundArchive);
        } else {
          alert('아카이브를 찾을 수 없습니다.');
          navigate('/');
        }
      } else {
        alert('아카이브를 찾을 수 없습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('불러오기 실패:', error);
      alert('아카이브를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!archive) {
    return null;
  }

  return (
    <div className="view-archive-container">
      {/* 헤더 */}
      <div className="view-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← 목록
        </button>
        <div className="title-section">
          <h1>{archive.title}</h1>
          <span className="category-badge">{archive.category}</span>
        </div>
        <button onClick={() => navigate(`/edit/${id}`)} className="edit-btn">
          ✏️ 수정
        </button>
      </div>

      {/* 설명 */}
      {archive.description && (
        <div className="description-section">
          <p>{archive.description}</p>
        </div>
      )}

      {/* 코드 + 메모 뷰 */}
      <div className="view-content">
        {/* 왼쪽: 코드 */}
        <div className="code-section">
          <h3>💻 코드</h3>
          <CodeMirror
            value={archive.code || '// 코드 없음'}
            height="calc(100vh - 250px)"
            theme={oneDark}
            extensions={[javascript({ jsx: true })]}
            editable={false}
            readOnly={true}
          />
        </div>

        {/* 오른쪽: 메모 */}
        <div className="memo-section">
          <h3>📝 메모 ({archive.annotations?.length || 0})</h3>
          <div className="memo-list-view">
            {archive.annotations && archive.annotations.length > 0 ? (
              archive.annotations.map((ann) => (
                <div
                  key={ann.id}
                  className="memo-item-view"
                  style={{ borderLeft: `4px solid ${ann.color}` }}
                >
                  <div className="memo-header-view">
                    <span className="line-badge">Line {ann.lineNumber}</span>
                  </div>
                  <p className="memo-text">{ann.memo}</p>
                </div>
              ))
            ) : (
              <p className="no-memos">메모가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
