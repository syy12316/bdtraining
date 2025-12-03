import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuthStore } from '../../store/authStore';
import { useVoteStore } from '../../store/voteStore';
import type {VoteRecord} from '../../store/voteStore';
import './VoteResults.css';

const VoteResults: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const {voteRecords, setVoteRecords, updateVoteResults } = useVoteStore();

  
  // 检查用户是否已登录
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // 从后端API获取投票结果
  const fetchVoteResults = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/vote/results');
      const result = await response.json();
      if (result.code === 0) {
        setVoteRecords(result.data);
        updateVoteResults(result.data);
      }
    } catch (error) {
      console.error('获取投票结果失败:', error);
    }
  };

  // 初始化WebSocket连接
  useEffect(() => {
    // 创建WebSocket连接
    const newSocket = io('http://localhost:8000');

    // 监听所有投票数据
    newSocket.on('allVotes', (votes: VoteRecord[]) => {
      console.log('接收到所有投票数据:', votes);
      setVoteRecords(votes);
      updateVoteResults(votes);
    });

    // 监听投票更新
    newSocket.on('voteUpdate', (data: VoteRecord) => {
      console.log('接收到投票更新:', data);
      // 重新获取最新的投票结果
      fetchVoteResults();
    });

    // 组件挂载时获取初始投票结果
    fetchVoteResults();

    return () => {
      // 断开WebSocket连接
      newSocket.disconnect();
    };
  }, [setVoteRecords, updateVoteResults]);

  // // 计算总票数
  // const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  // // 计算每个选项的百分比
  // const calculatePercentage = (votes: number) => {
  //   if (totalVotes === 0) return 0;
  //   return Math.round((votes / totalVotes) * 100);
  // };

  // 格式化日期时间
  // const formatDateTime = (dateTimeString: string) => {
  //   const date = new Date(dateTimeString);
  //   return date.toLocaleString('zh-CN');
  // };

  return (
    <div className="results-container">
      <h2>投票结果</h2>
      {JSON.stringify(voteRecords, null, 2)}
    </div>
  );
};

export default VoteResults;