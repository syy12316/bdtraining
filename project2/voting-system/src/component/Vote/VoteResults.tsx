import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface Option {
  id: string;
  name: string;
  votes: number;
}

const VoteResults: React.FC = () => {
  // 从store中获取投票数据
  const { options, isLoggedIn } = useAuthStore();
  
  // 使用useMemo缓存总票数计算结果
  const totalVotes = useMemo(() => {
    return options.reduce((sum: number, option: Option) => sum + option.votes, 0);
  }, [options]);
  
  const navigate = useNavigate();

  useEffect(() => {
    // 检查用户是否已登录
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

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
