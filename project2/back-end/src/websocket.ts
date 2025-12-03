import { Server, Socket } from 'socket.io';
import { db } from '../db';

export let io: Server;

// 初始化WebSocket服务器
export const initWebSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // WebSocket连接处理
  io.on('connection', (socket: Socket) => {
    console.log('新用户连接:', socket.id);

    // 发送当前所有投票结果
    const sendAllVotes = () => {
      const sql = 'SELECT * FROM votes';
      db.query(sql, (err, result: any[]) => {
        if (!err) {
          // 解析record字段
          const votes = result.map(vote => ({
            ...vote,
            record: JSON.parse(vote.record)
          }));
          socket.emit('allVotes', votes);
        }
      });
    };

    // 初始连接时发送所有投票
    sendAllVotes();

    // 监听客户端投票事件
    socket.on('newVote', (data: any) => {
      // 广播新投票给所有客户端
      io.emit('voteUpdate', data);
      // 重新发送所有投票结果
      sendAllVotes();
    });

    // 断开连接处理
    socket.on('disconnect', () => {
      console.log('用户断开连接:', socket.id);
    });
  });

  return io;
};

// 广播投票更新
export const broadcastVoteUpdate = (data: any) => {
  if (io) {
    io.emit('voteUpdate', data);
    // 发送所有投票结果
    const sql = 'SELECT * FROM votes';
    db.query(sql, (err, result: any[]) => {
      if (!err) {
        const votes = result.map(vote => ({
          ...vote,
          record: JSON.parse(vote.record)
        }));
        io.emit('allVotes', votes);
      }
    });
  }
};