import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface Option {
  id: string;
  name: string;
  votes: number;
}

const Vote: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isLoggedIn, 
    username, 
    hasVoted, 
    options, 
    selectedOptions, 
    setSelectedOptions, 
    submitVote 
  } = useAuthStore();
  const [error, setError] = useState('');

  useEffect(() => {
    // 检查用户是否已登录且已投票
    if (isLoggedIn && hasVoted) {
      navigate('/results');
    }
  }, [isLoggedIn, hasVoted, navigate]);

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(optionId);
  };

  const handleVote = () => {
    if (selectedOptions.length === 0) {
      setError('请至少选择一个选项');
      return;
    }

    // 使用store提交投票
    submitVote();
    
    // 投票成功后跳转到结果页面
    navigate('/results');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // 已经从store中获取了isLoggedIn状态

  return (
    <div className="vote-container">
      <h2>投票</h2>
      
      {/* 登录用户显示问候语 */}
      {isLoggedIn && username && (
        <div className="welcome-message">
          您好，
          <span 
            className="username-link" 
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer', color: '#0066cc', textDecoration: 'underline' }}
          >
            {username}
          </span>，请投票
        </div>
      )}
      
      {/* 未登录用户显示提示 */}
      {!isLoggedIn && (
        <div className="login-prompt">
          您尚未登陆，无法进行投票，
          <button onClick={handleLoginRedirect} className="login-prompt-button">
            点击去登陆
          </button>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="vote-options">
        {options.map(option => (
          <div key={option.id} className="vote-option">
            <input
              type="checkbox"
              id={`option-${option.id}`}
              value={option.id}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionChange(option.id)}
              disabled={!isLoggedIn} // 未登录用户禁用选项
            />
            <label htmlFor={`option-${option.id}`}>{option.name}</label>
          </div>
        ))}
        
        <button 
          onClick={handleVote} 
          className="vote-button"
          disabled={!isLoggedIn || selectedOptions.length === 0}
        >
          提交投票
        </button>
      </div>
    </div>
  );
};

export default Vote;
