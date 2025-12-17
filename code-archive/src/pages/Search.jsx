import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, ChevronRight } from 'lucide-react';
import { searchArchives } from '../services/archiveService';
import { CATEGORIES } from '../constants/categories';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/Search.scss';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term) => {
    setLoading(true);
    try {
      const data = await searchArchives(term);
      setResults(data);
    } catch (error) {
      console.error('검색 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const breadcrumbItems = [
    { label: '홈', path: '/' },
    { label: `검색: ${query}` }
  ];

  return (
    <div className="search-page">
      <Sidebar />

      <div className="search-main">
        <Breadcrumb items={breadcrumbItems} />

        <header className="search-header">
          <form onSubmit={handleSearch} className="search-form">
            <SearchIcon size={20} className="search-icon" />
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              autoFocus
            />
          </form>
        </header>

        <main className="search-content">
          {loading ? (
            <div className="loading">검색 중...</div>
          ) : query ? (
            <>
              <p className="results-count">
                "{query}" 검색 결과 {results.length}건
              </p>

              {results.length === 0 ? (
                <div className="no-results">
                  <p>검색 결과가 없습니다.</p>
                  <p className="hint">다른 키워드로 검색해보세요.</p>
                </div>
              ) : (
                <ul className="results-list">
                  {results.map(archive => (
                    <li key={archive.id} className="result-item">
                      <Link to={`/archives/${archive.id}`} className="result-link">
                        <div className="result-info">
                          <h3 className="result-title">{archive.title}</h3>
                          {archive.description && (
                            <p className="result-description">
                              {archive.description.length > 120
                                ? archive.description.slice(0, 120) + '...'
                                : archive.description}
                            </p>
                          )}
                          <div className="result-meta">
                            <span className="meta-category">
                              {CATEGORIES.find(c => c.id === archive.category)?.name || archive.category}
                            </span>
                            {archive.language && (
                              <span className="meta-language">{archive.language}</span>
                            )}
                          </div>
                        </div>
                        <ChevronRight size={18} className="arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className="no-query">
              <p>검색어를 입력하세요.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Search;

