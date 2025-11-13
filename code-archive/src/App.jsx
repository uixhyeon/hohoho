// 메인 App 컴포넌트 - 라우팅 설정
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateArchive from './pages/CreateArchive';
import ViewArchive from './pages/ViewArchive';
import './App.css';

// 보호된 라우트 (로그인 필요) - 임시로 비활성화
function ProtectedRoute({ children }) {
  // 로그인 체크 비활성화 - 바로 통과
  return children;

  // const { user, loading } = useAuth();
  // if (loading) {
  //   return <div className="loading">로딩 중...</div>;
  // }
  // return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 홈 (목록) - 보호된 라우트 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 새 아카이브 생성 - 보호된 라우트 */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateArchive />
            </ProtectedRoute>
          }
        />

        {/* 아카이브 수정 - 보호된 라우트 */}
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <CreateArchive />
            </ProtectedRoute>
          }
        />

        {/* 아카이브 보기 - 보호된 라우트 */}
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <ViewArchive />
            </ProtectedRoute>
          }
        />

        {/* 404 - 존재하지 않는 경로 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
