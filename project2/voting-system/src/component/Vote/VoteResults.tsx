import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuthStore } from '../../store/authStore';
import { useVoteStore } from '../../store/voteStore';
import type {VoteRecord} from '../../store/voteStore';
import VoteChart from './VoteChart';
import './VoteResults.css';
import VoteRecordItem from './VoteReocrdItem';

const VoteResults: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const {voteRecords, setVoteRecords, updateVoteResults, options } = useVoteStore();
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

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
// 检查用户是否已登录
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
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


  // 转换投票数据为图表所需格式
  const chartData = options.map(option => ({
    option: option.name,
    count: option.votes
  }));

  return (
    <div className="results-container">
      <h2>投票结果</h2>
      
      {/* 图表类型切换按钮 */}
      <div className="chart-controls">
        <button 
          className={`chart-type-btn ${chartType === 'pie' ? 'active' : ''}`}
          onClick={() => setChartType('pie')}
        >
          饼图
        </button>
        <button 
          className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
          onClick={() => setChartType('bar')}
        >
          柱状图
        </button>
      </div>
      
      {/* 投票图表 */}
      <VoteChart 
        voteData={chartData} 
        chartType={chartType} 
        title="投票结果统计"
      />
      
      {/* 投票记录列表 */}
      <div className="vote-records">
        <h3>投票记录</h3>
        {/*数据统计：几人已投票，各选项的投票排名*/}
        
        {voteRecords.length > 0 ? (
          voteRecords.map((record, index) => (
            <VoteRecordItem key={index} voteRecord={record} />
          ))
        ) : (
          <div>暂无投票记录</div>
        )}
      </div>
    </div>
  );
};

export default VoteResults;