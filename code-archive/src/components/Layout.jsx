// 메인 레이아웃 컴포넌트
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* 상단 네비게이션 바 */}
      <Navbar />

      {/* 사이드바 */}
      <Sidebar />

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
