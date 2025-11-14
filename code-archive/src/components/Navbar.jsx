// 상단 네비게이션 바 컴포넌트
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

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
            <Link to="/create" className="navbar-link">
              ➕ 새 코드 추가
            </Link>
          </li>
          <li>
            <button
              className="navbar-link navbar-search-btn"
              onClick={() => {
                // 검색 기능은 홈에서 제공
                navigate('/');
                setTimeout(() => {
                  const searchInput = document.querySelector('.search-input');
                  if (searchInput) searchInput.focus();
                }, 100);
              }}
            >
              🔍 검색
            </button>
          </li>
          <li>
            <Link to="/categories" className="navbar-link">
              🏷️ 카테고리/태그 관리
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
