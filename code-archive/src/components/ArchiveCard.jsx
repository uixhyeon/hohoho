import { useState } from 'react';
import { Pencil, Trash2, Code, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { deleteArchive } from '../services/archiveService';
import '../styles/ArchiveCard.scss';

function ArchiveCard({ archive, onEdit, onDelete }) {
  const [showCode, setShowCode] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteArchive(archive.id);
        onDelete();
      } catch (error) {
        console.error('Error deleting archive:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(archive.code);
    alert('코드가 복사되었습니다!');
  };

  return (
    <div className="archive-card">
      <div className="card-header">
        <h3>{archive.title}</h3>
        <div className="card-actions">
          <button onClick={() => onEdit(archive)} className="edit-btn">
            <Pencil size={14} />
            수정
          </button>
          <button onClick={handleDelete} className="delete-btn">
            <Trash2 size={14} />
            삭제
          </button>
        </div>
      </div>

      {archive.description && (
        <p className="description">{archive.description}</p>
      )}

      <div className="code-section">
        <div className="code-header">
          <button onClick={() => setShowCode(!showCode)} className="toggle-code-btn">
            <Code size={14} />
            {showCode ? '숨기기' : '코드 보기'}
            {showCode ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showCode && (
            <button onClick={copyToClipboard} className="copy-btn">
              <Copy size={14} />
              복사
            </button>
          )}
        </div>

        {showCode && (
          <pre className="code-block">
            <code>{archive.code}</code>
          </pre>
        )}
      </div>

      {archive.tags && archive.tags.length > 0 && (
        <div className="tags">
          {archive.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArchiveCard;
