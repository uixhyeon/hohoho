import { useState, useEffect } from 'react';
import { createArchive, updateArchive } from '../services/archiveService';
import '../styles/ArchiveForm.scss';

function ArchiveForm({ category, archive, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    tags: '',
    category: category
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (archive) {
      setFormData({
        title: archive.title || '',
        description: archive.description || '',
        code: archive.code || '',
        tags: archive.tags ? archive.tags.join(', ') : '',
        category: archive.category || category
      });
    }
  }, [archive, category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const archiveData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== '')
      };

      if (archive) {
        await updateArchive(archive.id, archiveData);
      } else {
        await createArchive(archiveData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving archive:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="archive-form" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{archive ? '아카이브 수정' : '새 아카이브'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="설명을 입력하세요"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">코드 *</label>
            <textarea
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="코드를 입력하세요"
              rows={10}
              className="code-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">태그 (쉼표로 구분)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="예: react, hooks, custom"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              취소
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArchiveForm;
