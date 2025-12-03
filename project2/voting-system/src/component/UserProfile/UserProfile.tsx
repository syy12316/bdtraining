import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuthStore();

  // 登出处理函数
  const handleLogout = () => {
    // 使用store的logout方法清除状态
    logout();
    
    // 登出后跳转到登录页面
    navigate('/login');
  };

  // 已经从store中获取了isLoggedIn状态
  
  // 如果用户未登录，跳转到登录页面
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>用户信息</h2>
        
        <div className="form-group">
          <label htmlFor="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            readOnly 
            className="form-control"
          />
        </div>
        
        <div className="button-group">
          <button 
            onClick={handleLogout} 
            className="login-button"
          >
            退出登录
          </button>
          
          <button 
            onClick={() => navigate('/vote')} 
            className="register-button"
          >
            返回投票
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;