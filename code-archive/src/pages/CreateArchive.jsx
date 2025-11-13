// 아카이브 생성/수정 페이지 (로컬 스토리지 버전)
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import './CreateArchive.css';

export default function CreateArchive() {
  const { id } = useParams(); // 수정 모드인 경우 id가 있음
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMetaForm, setShowMetaForm] = useState(true);

  const navigate = useNavigate();

  // 수정 모드: 기존 데이터 불러오기
  useEffect(() => {
    if (isEditMode) {
      loadArchive();
    }
  }, [id]);

  const loadArchive = () => {
    try {
      const saved = localStorage.getItem('code-archives');
      if (saved) {
        const archives = JSON.parse(saved);
        const archive = archives.find((a) => a.id === id);

        if (archive) {
          setTitle(archive.title || '');
          setCategory(archive.category || '');
          setDescription(archive.description || '');
          setCode(archive.code || '');
          setAnnotations(archive.annotations || []);
          setShowMetaForm(false); // 바로 에디터 화면으로
        }
      }
    } catch (error) {
      console.error('불러오기 실패:', error);
      alert('아카이브를 불러올 수 없습니다.');
    }
  };

  // 저장
  const handleSave = (editorData) => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const archiveData = {
        id: isEditMode ? id : Date.now().toString(),
        title,
        category,
        description,
        code: editorData.code,
        annotations: editorData.annotations,
        createdAt: isEditMode ? undefined : Date.now(),
        updatedAt: Date.now(),
      };

      // 로컬 스토리지에서 불러오기
      const saved = localStorage.getItem('code-archives');
      let archives = saved ? JSON.parse(saved) : [];

      if (isEditMode) {
        // 수정
        archives = archives.map((a) => (a.id === id ? { ...a, ...archiveData, createdAt: a.createdAt } : a));
        alert('수정되었습니다!');
      } else {
        // 새로 생성
        archives.push(archiveData);
        alert('저장되었습니다!');
      }

      localStorage.setItem('code-archives', JSON.stringify(archives));
      navigate('/');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-archive-container">
      {/* 메타 정보 입력 폼 */}
      {showMetaForm && (
        <div className="meta-form-overlay">
          <div className="meta-form">
            <h2>{isEditMode ? '아카이브 수정' : '새 아카이브 만들기'}</h2>

            <div className="form-group">
              <label>제목 *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: useState 사용법"
                required
              />
            </div>

            <div className="form-group">
              <label>카테고리</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="예: React, JavaScript, CSS..."
              />
            </div>

            <div className="form-group">
              <label>설명</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="이 코드에 대한 간단한 설명..."
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button onClick={() => navigate('/')} className="cancel-btn">
                취소
              </button>
              <button
                onClick={() => {
                  if (!title.trim()) {
                    alert('제목을 입력해주세요.');
                    return;
                  }
                  setShowMetaForm(false);
                }}
                className="next-btn"
              >
                다음 (코드 작성)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 코드 에디터 */}
      {!showMetaForm && (
        <>
          <div className="editor-header">
            <button onClick={() => setShowMetaForm(true)} className="back-btn">
              ← 정보 수정
            </button>
            <h2>{title}</h2>
            <span className="category-badge">{category}</span>
          </div>

          <CodeEditor
            initialCode={code}
            initialAnnotations={annotations}
            onSave={handleSave}
          />
        </>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner">저장 중...</div>
        </div>
      )}
    </div>
  );
}
