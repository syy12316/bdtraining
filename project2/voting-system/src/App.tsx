import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './component/Login/Login'
import Vote from './component/Vote/Vote.tsx'
import VoteResults from './component/Vote/VoteResults.tsx'
import UserProfile from './component/UserProfile/UserProfile.tsx'
import { useAuthStore } from './store/authStore'

// 反向路由守卫组件（已登录用户不能访问登录页）
const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Navigate to="/vote" replace /> : <>{children}</>
}

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>实时投票系统</h1>
      </header>
      <main className="app-main">
        <Routes>
          {/* 登录页面 - 只有未登录用户可以访问 */}
          <Route path="/login" element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } />
          
          {/* 投票页面 - 所有用户都可以访问 */}
          <Route path="/vote" element={<Vote />} />
          
          {/* 投票结果页面 - 所有用户都可以访问 */}
          <Route path="/results" element={<VoteResults />} />
          
          {/* 用户信息页面 */}
          <Route path="/profile" element={<UserProfile />} />
          
          {/* 默认路由重定向 */}
          <Route path="/" element={<Navigate to="/vote" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
