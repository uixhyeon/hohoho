import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, X, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';
import { getArchivesByCategory, getAllArchives } from '../services/archiveService';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import ArchiveForm from '../components/ArchiveForm';
import '../styles/Home.scss';

function Home() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || CATEGORIES[0].id);
  const [archives, setArchives] = useState([]);
  const [filteredArchives, setFilteredArchives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArchive, setEditingArchive] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    loadArchives();
  }, [selectedCategory]);

  const loadArchives = async () => {
    setLoading(true);
    try {
      const data = await getArchivesByCategory(selectedCategory);
      setArchives(data);
      setFilteredArchives(data);
    } catch (error) {
      console.error('Error loading archives:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredArchives(archives);
      return;
    }

    const filtered = archives.filter(archive =>
      archive.title?.toLowerCase().includes(value.toLowerCase()) ||
      archive.description?.toLowerCase().includes(value.toLowerCase()) ||
      archive.code?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredArchives(filtered);
  };

  const getCategoryInfo = () => {
    const category = CATEGORIES.find(cat => cat.id === selectedCategory);
    return category || { name: 'All', id: 'all' };
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingArchive(null);
    loadArchives();
  };

  const breadcrumbItems = [
    { label: '홈', path: '/' },
    { label: getCategoryInfo().name }
  ];

  return (
    <div className="home">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="home-main">
        {showForm ? (
          <div className="inline-form-wrapper">
            <div className="form-header-bar">
              <h2>새 문서 작성</h2>
              <button onClick={() => setShowForm(false)} className="close-form-btn">
                <X size={18} />
              </button>
            </div>
            <ArchiveForm
              category={selectedCategory}
              archive={editingArchive}
              onClose={handleFormClose}
              inline={true}
            />
          </div>
        ) : (
          <>
            <Breadcrumb items={breadcrumbItems} />

            <header className="page-header">
              <div className="header-content">
                <div className="title-section">
                  <h1>{getCategoryInfo().name}</h1>
                  <p className="category-description">
                    {filteredArchives.length}개의 문서
                  </p>
                </div>
                <div className="actions-section">
                  <input
                    type="text"
                    placeholder="이 카테고리에서 검색..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                  />
                  <button onClick={() => setShowForm(true)} className="write-btn">
                    <Plus size={16} />
                    새 문서
                  </button>
                </div>
              </div>
            </header>

            <main className="main-content">
              {loading ? (
                <div className="loading">불러오는 중...</div>
              ) : filteredArchives.length === 0 ? (
                <div className="empty-state">
                  <p>이 카테고리에 문서가 없습니다.</p>
                  <button onClick={() => setShowForm(true)} className="add-first-btn">
                    첫 문서 작성하기
                  </button>
                </div>
              ) : (
                <ul className="document-list">
                  {filteredArchives.map(archive => (
                    <li key={archive.id} className="document-item">
                      <Link to={`/archives/${archive.id}`} className="document-link">
                        <div className="document-info">
                          <h3 className="document-title">{archive.title}</h3>
                          {archive.description && (
                            <p className="document-description">
                              {archive.description.length > 100
                                ? archive.description.slice(0, 100) + '...'
                                : archive.description}
                            </p>
                          )}
                          <div className="document-meta">
                            {archive.language && (
                              <span className="meta-language">{archive.language}</span>
                            )}
                            {archive.tags && archive.tags.length > 0 && (
                              <span className="meta-tags">{archive.tags.slice(0, 3).join(', ')}</span>
                            )}
                          </div>
                        </div>
                        <ChevronRight size={18} className="arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
