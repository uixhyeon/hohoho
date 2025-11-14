// 메인 App 컴포넌트 - 라우팅 설정
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
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
        {/* 로그인 페이지 (레이아웃 없이) */}
        <Route path="/login" element={<Login />} />

        {/* 레이아웃이 적용되는 페이지들 */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
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

                {/* 카테고리/태그 관리 페이지 (임시) */}
                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute>
                      <div style={{ padding: '2rem' }}>
                        <h2>카테고리/태그 관리</h2>
                        <p>카테고리 관리 기능은 준비 중입니다.</p>
                      </div>
                    </ProtectedRoute>
                  }
                />

                {/* 설정 페이지 (임시) */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <div style={{ padding: '2rem' }}>
                        <h2>설정</h2>
                        <p>설정 기능은 준비 중입니다.</p>
                      </div>
                    </ProtectedRoute>
                  }
                />

                {/* 404 - 존재하지 않는 경로 */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
