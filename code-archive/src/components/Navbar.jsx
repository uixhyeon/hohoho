// 상단 네비게이션 바 컴포넌트
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Navbar.scss';

export default function Navbar({ onSearch, onAddNew }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* 로고 */}
        <Link to="/" className="navbar-logo">
          📚 Code Archive
        </Link>

        {/* 네비게이션 메뉴 */}
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              🏠 홈 / 대시보드
            </Link>
          </li>
          <li>
            <button
              className="navbar-link navbar-btn"
              onClick={onAddNew}
            >
              ➕ 새 코드 추가
            </button>
          </li>
        </ul>

        {/* 검색 */}
        <div className="navbar-search">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* 추가 메뉴 */}
        <ul className="navbar-menu-right">
          <li>
            <Link to="/categories" className="navbar-link">
              🏷️ 카테고리 관리
            </Link>
          </li>
          <li>
            <Link to="/settings" className="navbar-link">
              ⚙️ 설정
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
