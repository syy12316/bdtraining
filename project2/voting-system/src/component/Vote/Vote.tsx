import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Option {
  id: string;
  name: string;
  votes: number;
}

const Vote: React.FC = () => {
  // 初始化时从localStorage加载投票数据
  const [options, setOptions] = useState<Option[]>(() => {
    const savedVotes = localStorage.getItem('votes');
    if (savedVotes) {
      return JSON.parse(savedVotes);
    }
    return [
      { id: '1', name: '选项A', votes: 0 },
      { id: '2', name: '选项B', votes: 0 },
      { id: '3', name: '选项C', votes: 0 },
    ];
  });
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 多选支持
  const [error, setError] = useState('');
  
  // 初始化时从localStorage加载用户名
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // 检查用户是否已登录
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // 检查用户是否已投票
    const hasVoted = localStorage.getItem('hasVoted');
    if (hasVoted) {
      navigate('/results');
    }
  }, [navigate]);

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const handleVote = () => {
    if (selectedOptions.length === 0) {
      setError('请至少选择一个选项');
      return;
    }

    // 更新投票结果
    const updatedOptions = options.map(option => 
      selectedOptions.includes(option.id) 
        ? { ...option, votes: option.votes + 1 } 
        : option
    );

    setOptions(updatedOptions);
    
    // 保存投票状态和结果到localStorage
    localStorage.setItem('hasVoted', 'true');
    localStorage.setItem('votes', JSON.stringify(updatedOptions));
    
    // 投票成功后跳转到结果页面
    navigate('/results');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="vote-container">
      <h2>投票</h2>
      
      {/* 登录用户显示问候语 */}
      {isLoggedIn && username && (
        <div className="welcome-message">
          您好，{username}，请投票
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
