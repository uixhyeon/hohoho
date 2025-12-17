import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Copy, Check, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { getArchiveById, deleteArchive } from '../services/archiveService';
import { CATEGORIES } from '../constants/categories';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import ArchiveForm from '../components/ArchiveForm';
import '../styles/ArchiveDetail.scss';

function ArchiveDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [archive, setArchive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadArchive();
  }, [id]);

  const loadArchive = async () => {
    try {
      const data = await getArchiveById(id);
      setArchive(data);
      
      // 최근 본 코드에 추가
      addToRecentViews(data);
    } catch (error) {
      console.error('아카이브 로딩 실패:', error);
      navigate('/archives');
    } finally {
      setLoading(false);
    }
  };

  const addToRecentViews = (archive) => {
    try {
      const recent = JSON.parse(localStorage.getItem('recent-views') || '[]');
      const filtered = recent.filter(item => item.id !== archive.id);
      const updated = [{ id: archive.id, title: archive.title, category: archive.category }, ...filtered].slice(0, 20);
      localStorage.setItem('recent-views', JSON.stringify(updated));
    } catch (error) {
      console.error('최근 본 코드 저장 실패:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(archive.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('복사에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteArchive(id);
      navigate('/archives');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    loadArchive();
  };

  const getCategoryName = () => {
    const category = CATEGORIES.find(c => c.id === archive?.category);
    return category?.name || archive?.category || '기타';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="archive-detail">
        <Sidebar />
        <div className="detail-main">
          <div className="loading">불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (!archive) {
    return (
      <div className="archive-detail">
        <Sidebar />
        <div className="detail-main">
          <div className="not-found">문서를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: '홈', path: '/' },
    { label: getCategoryName(), path: `/archives?category=${archive.category}` },
    { label: archive.title }
  ];

  return (
    <div className="archive-detail">
      <Sidebar />

      <div className="detail-main">
        {showForm ? (
          <div className="edit-form-wrapper">
            <ArchiveForm
              category={archive.category}
              archive={archive}
              onClose={handleFormClose}
              inline={true}
            />
          </div>
        ) : (
          <article className="document">
            <Breadcrumb items={breadcrumbItems} />

            <header className="document-header">
              <h1>{archive.title}</h1>
              <div className="document-actions">
                <button onClick={() => setShowForm(true)} className="action-btn">
                  <Pencil size={16} />
                  수정
                </button>
                <button onClick={handleDelete} className="action-btn delete">
                  <Trash2 size={16} />
                  삭제
                </button>
              </div>
            </header>

            <div className="document-meta">
              {archive.language && (
                <span className="meta-language">{archive.language}</span>
              )}
              {archive.tags && archive.tags.length > 0 && (
                <span className="meta-tags">
                  {archive.tags.join(' · ')}
                </span>
              )}
              {archive.createdAt && (
                <span className="meta-date">{formatDate(archive.createdAt)}</span>
              )}
            </div>

            {archive.description && (
              <section className="document-section">
                <p className="description">{archive.description}</p>
              </section>
            )}

            <section className="document-section">
              <div className="code-header">
                <h2>코드</h2>
                <button onClick={copyToClipboard} className="copy-btn">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? '복사됨' : '복사'}
                </button>
              </div>
              <pre className="code-block">
                <code>{archive.code}</code>
              </pre>
            </section>

            <footer className="document-footer">
              <Link to="/archives" className="back-link">
                <ArrowLeft size={16} />
                목록으로 돌아가기
              </Link>
            </footer>
          </article>
        )}
      </div>
    </div>
  );
}

export default ArchiveDetail;

