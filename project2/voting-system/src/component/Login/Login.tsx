import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true为登录，false为注册
  const [loading, setLoading] = useState(false); // 加载状态
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  // 处理登录请求
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.code === 0) {
        // 登录成功，使用zustand store保存用户信息和token
        login(data.data.username, data.data.token);
        
        // 跳转到投票页面
        navigate('/vote');
      } else {
        // 登录失败，显示错误信息
        setError(data.msg || '登录失败，请重试');
      }
    } catch (err) {
      console.error('登录请求错误:', err);
      setError('网络错误，请检查后端服务是否正常运行');
    } finally {
      setLoading(false);
    }
  };

  // 处理注册请求
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.code === 0) {
        // 注册成功，使用zustand store保存用户信息和token
        register(data.data.username, data.data.token);
        
        // 跳转到投票页面
        navigate('/vote');
      } else {
        // 注册失败，显示错误信息
        setError(data.msg || '注册失败，请重试');
      }
    } catch (err) {
      console.error('注册请求错误:', err);
      setError('网络错误，请检查后端服务是否正常运行');
    } finally {
      setLoading(false);
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? (isLogin ? '登录中...' : '注册中...') : (isLogin ? '登录' : '注册')}
        </button>
        <div className="toggle-form">
          {isLogin ? '还没有账号？' : '已有账号？'}
          <button type="button" onClick={toggleForm} className="toggle-button" disabled={loading}>
            {isLogin ? '立即注册' : '立即登录'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
