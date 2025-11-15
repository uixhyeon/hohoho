import { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants/categories';
import { getArchivesByCategory } from '../services/archiveService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ArchiveList from '../components/ArchiveList';
import ArchiveForm from '../components/ArchiveForm';
import '../styles/Home.scss';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [archives, setArchives] = useState([]);
  const [filteredArchives, setFilteredArchives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArchive, setEditingArchive] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  // 선택된 카테고리 이름 가져오기
  const getCategoryName = () => {
    const category = CATEGORIES.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'All';
  };

  const handleEdit = (archive) => {
    setEditingArchive(archive);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingArchive(null);
    loadArchives();
  };

  const handleDelete = () => {
    loadArchives();
  };

  return (
    <div className="home">
      {/* 상단 네비게이션 바 - 임시 비활성화 */}
      {/* <Navbar
        onSearch={handleSearch}
        onAddNew={() => setShowForm(true)}
      /> */}

      {/* 사이드바 */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* 메인 콘텐츠 */}
      <div className="home-main">
        <header className="page-header">
          <div className="header-content">
            <div className="title-section">
              <h1>📚 {getCategoryName()}</h1>
            </div>
            <div className="actions-section">
              <input
                type="text"
                placeholder="🔍 검색..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              <button
                onClick={() => setShowForm(true)}
                className="write-btn"
              >
                ✏️ 글쓰기
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <ArchiveList
              archives={filteredArchives}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>

      {showForm && (
        <ArchiveForm
          category={selectedCategory}
          archive={editingArchive}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default Home;
