import { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants/categories';
import { getArchivesByCategory } from '../services/archiveService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CategoryTabs from '../components/CategoryTabs';
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

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredArchives(archives);
      return;
    }

    const filtered = archives.filter(archive =>
      archive.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      archive.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      archive.code?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArchives(filtered);
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
      {/* 상단 네비게이션 바 */}
      <Navbar
        onSearch={handleSearch}
        onAddNew={() => setShowForm(true)}
      />

      {/* 사이드바 */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* 메인 콘텐츠 */}
      <div className="home-main">
        <CategoryTabs
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

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
