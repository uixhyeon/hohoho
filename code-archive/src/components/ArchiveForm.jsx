import { useState, useEffect } from 'react';
import { FilePlus, X } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { createArchive, updateArchive } from '../services/archiveService';
import '../styles/ArchiveForm.scss';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', extension: javascript },
  { id: 'python', name: 'Python', extension: python },
  { id: 'html', name: 'HTML', extension: html },
  { id: 'css', name: 'CSS', extension: css },
  { id: 'json', name: 'JSON', extension: json },
  { id: 'plaintext', name: 'Plain Text', extension: null },
];

function ArchiveForm({ category, archive, onClose, inline = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    tags: '',
    category: category,
    language: 'javascript'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (archive) {
      setFormData({
        title: archive.title || '',
        description: archive.description || '',
        code: archive.code || '',
        tags: archive.tags ? archive.tags.join(', ') : '',
        category: archive.category || category,
        language: archive.language || 'javascript'
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

  const handleCodeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      code: value
    }));
  };

  const getLanguageExtension = () => {
    const lang = LANGUAGES.find(l => l.id === formData.language);
    return lang?.extension ? [lang.extension()] : [];
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

  // 인라인 모드
  if (inline) {
    return (
      <div className="archive-form-inline">
        <div className="form-header">
          <h2>
            <FilePlus size={18} />
            {archive ? '아카이브 수정' : '새 아카이브'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
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
              <label htmlFor="language">언어</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">태그</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="쉼표로 구분"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="설명을 입력하세요"
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">코드 *</label>
            <div className="code-editor-wrapper">
              <CodeMirror
                value={formData.code}
                minHeight="200px"
                theme={oneDark}
                extensions={getLanguageExtension()}
                onChange={handleCodeChange}
                placeholder="코드를 입력하세요..."
              />
            </div>
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
    );
  }

  // 모달 모드 (기존)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="archive-form" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>
            <FilePlus />
            {archive ? '아카이브 수정' : '새 아카이브'}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
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
            <label htmlFor="language">코드 언어</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="code">코드 *</label>
            <div className="code-editor-wrapper">
              <CodeMirror
                value={formData.code}
                height="300px"
                theme={oneDark}
                extensions={getLanguageExtension()}
                onChange={handleCodeChange}
                placeholder="코드를 입력하세요..."
              />
            </div>
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
