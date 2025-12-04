import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useVoteStore } from '../../store/voteStore';
import './Vote.css';

const Vote: React.FC = () => {
  const navigate = useNavigate();
  const { token, username, isLoggedIn } = useAuthStore();
  const { selectedOptions, setSelectedOptions, options, hasVoted, setVoteRecords, setUserVoteRecord, resetVote } = useVoteStore();
  const [error, setError] = useState('');

  // 检查用户是否已登录且已投票
  useEffect(() => {
    if (isLoggedIn && hasVoted) {
      navigate('/vote/results');
    }
  }, [isLoggedIn, hasVoted, navigate]);

  // 当用户登录状态变化时，加载用户的投票记录
  useEffect(() => {
    if (isLoggedIn && token) {
      // 首先获取最新的投票记录
      fetch('http://localhost:8000/api/vote/results')
        .then(response => response.json())
        .then(data => {
          if (data.code === 0) {
            setVoteRecords(data.data);
            // 设置用户的投票记录
            setUserVoteRecord(token);
          }
        })
        .catch(error => console.error('获取投票记录失败:', error));
    } else {
      // 用户未登录时，重置投票选项
      resetVote();
    }
  }, [isLoggedIn, token, setVoteRecords, setUserVoteRecord, resetVote]);



  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions(optionId);
    setError('');
  };

  const handleVote = async () => {
    if (selectedOptions.length === 0) {
      setError('请至少选择一个选项');
      return;
    }

    try {
      // 向后端API提交投票
      const response = await fetch('http://localhost:8000/api/vote/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: token,
          username: username,
          record: selectedOptions
        }),
      });

      const result = await response.json();
      if (result.code === 0) {
        // 投票成功，跳转到结果页面
        navigate('/vote/results');
      } else {
        setError(result.message || '投票失败');
      }
    } catch (error) {
      console.error('投票请求失败:', error);
      setError('投票请求失败，请稍后重试');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="vote-container">
      <h2>投票系统</h2>
      <h3>请选择您的选项</h3>
      
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
              onChange={() => handleOptionSelect(option.id)}
              disabled={!isLoggedIn || hasVoted} // 未登录或已投票用户禁用选项
            />
            <label htmlFor={`option-${option.id}`}>{option.name}</label>
          </div>
        ))}
        
        <div className="button-group">
          <button 
            onClick={handleVote} 
            className="vote-button"
            disabled={!isLoggedIn || hasVoted || selectedOptions.length === 0}
          >
            {hasVoted ? '已投票' : '提交投票'}
          </button>
          <Link to="/vote/results" className="view-results-button">
            查看结果
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vote;
