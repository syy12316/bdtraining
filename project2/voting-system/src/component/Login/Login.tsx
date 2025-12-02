import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true为登录，false为注册
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单的登录验证（实际项目中应该调用API）
    if (username && password) {
      // 保存登录状态到localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      // 登录成功后跳转到投票页面
      navigate('/vote');
    } else {
      setError('请输入用户名和密码');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 注册功能占位（实际项目中应该调用API）
    if (username && password) {
      // 注册成功后自动登录
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      // 跳转到投票页面
      navigate('/vote');
    } else {
      setError('请输入用户名和密码');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? '登录' : '注册'}</h2>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <div className="form-group">
          <label htmlFor="username">用户名：</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">密码：</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button">
          {isLogin ? '登录' : '注册'}
        </button>
        <div className="toggle-form">
          {isLogin ? '还没有账号？' : '已有账号？'}
          <button type="button" onClick={toggleForm} className="toggle-button">
            {isLogin ? '立即注册' : '立即登录'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
