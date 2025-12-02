import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Option {
  id: string;
  name: string;
  votes: number;
}

const VoteResults: React.FC = () => {
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
  
  // 根据options计算总票数
  const [totalVotes, setTotalVotes] = useState(0);
  
  // 当options变化时重新计算总票数
  useEffect(() => {
    const total = options.reduce((sum: number, option: Option) => sum + option.votes, 0);
    setTotalVotes(total);
  }, [options]);
  
  const navigate = useNavigate();

  useEffect(() => {
    // 检查用户是否已登录
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleBackToVote = () => {
    navigate('/vote');
  };

  const calculatePercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="results-container">
      <h2>投票结果</h2>
      
      <div className="results-summary">
        <p>总票数: {totalVotes}</p>
        <button onClick={handleBackToVote} className="back-button">
          返回投票页面
        </button>
      </div>
      
      <div className="results-list">
        {options.map(option => {
          const percentage = calculatePercentage(option.votes);
          return (
            <div key={option.id} className="result-item">
              <div className="result-header">
                <span className="option-name">{option.name}</span>
                <span className="vote-count">{option.votes} 票 ({percentage}%)</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VoteResults;
