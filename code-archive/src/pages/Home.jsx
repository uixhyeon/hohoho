import { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants/categories';
import { getArchivesByCategory } from '../services/archiveService';
import CategoryTabs from '../components/CategoryTabs';
import ArchiveList from '../components/ArchiveList';
import ArchiveForm from '../components/ArchiveForm';
import SearchBar from '../components/SearchBar';
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
      <header className="header">
        <h1>Code Archive</h1>
        <div className="header-actions">
          <SearchBar onSearch={handleSearch} />
          <button
            className="add-button"
            onClick={() => setShowForm(true)}
          >
            + 새 아카이브
          </button>
        </div>
      </header>

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
