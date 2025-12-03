import { Request, Response } from 'express';
import { db } from '../../db';
import jwt from 'jsonwebtoken';
// 导入WebSocket广播函数，用于投票后广播结果
import { broadcastVoteUpdate } from '../websocket';

// JWT配置
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

// 解析JWT token的函数
const parseToken = (token: string): any => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

// 定义投票相关的接口
interface Vote {
  id: number;
  user_id: number;
  username: string;
  record: any[];
  voted_at: Date;
}

// 提交投票
export const submitVote = (req: Request, res: Response) => {
  try {
    const { userId, username, record } = req.body;

    // 解析JWT token获取真实用户ID
    const decodedToken = parseToken(userId);
    if (!decodedToken) {
      return res.status(401).json({ code: 401, msg: '无效的令牌' });
    }

    const realUserId = decodedToken.id;

    // 检查用户是否已经投过票
    const checkVoteSql = 'SELECT * FROM votes WHERE user_id = ?';
    db.query(checkVoteSql, [realUserId], (err, result: Vote[]) => {
      if (err) {
        console.error('查询投票记录失败:', err);
        return res.status(500).json({ code: 500, msg: '服务器内部错误' });
      }

      // 将record数组转换为JSON字符串存储
      const recordJson = JSON.stringify(record);

      if (result.length > 0) {
        // 用户已投票，更新投票记录
        const updateVoteSql = 'UPDATE votes SET record = ?, voted_at = NOW() WHERE user_id = ?';
        db.query(updateVoteSql, [recordJson, realUserId], (err, result) => {
          if (err) {
            console.error('更新投票记录失败:', err);
            return res.status(500).json({ code: 500, msg: '服务器内部错误' });
          }

          res.status(200).json({ code: 0, msg: '投票更新成功' });

          // 通过WebSocket广播投票结果更新
          broadcastVoteUpdate({
            user_id: realUserId,
            username: username,
            record: record,
            voted_at: new Date().toISOString()
          });
        });
      } else {
        // 用户未投票，插入新投票记录
        const insertVoteSql = 'INSERT INTO votes (user_id, username, record, voted_at) VALUES (?, ?, ?, NOW())';
        db.query(insertVoteSql, [realUserId, username, recordJson], (err, result) => {
          if (err) {
            console.error('插入投票记录失败:', err);
            return res.status(500).json({ code: 500, msg: '服务器内部错误' });
          }

          res.status(200).json({ code: 0, msg: '投票成功' });

          // 通过WebSocket广播投票结果更新
          broadcastVoteUpdate({
            user_id: realUserId,
            username: username,
            record: record,
            voted_at: new Date().toISOString()
          });
        });
      }
    });
  } catch (error) {
    console.error('投票失败:', error);
    res.status(500).json({ code: 500, msg: '服务器内部错误' });
  }
};

// 获取投票结果
export const getVoteResults = (req: Request, res: Response) => {
  try {
    // 查询所有投票记录
    const sql = 'SELECT * FROM votes';

    db.query(sql, (err, result: Vote[]) => {
      if (err) {
        console.error('查询投票结果失败:', err);
        return res.status(500).json({ code: 500, msg: '服务器内部错误' });
      }

      // 解析record字段 - 确保正确处理类型
        const votes = result.map(vote => ({
          ...vote,
          record: typeof vote.record === 'string' ? JSON.parse(vote.record) : vote.record
        }));

      res.status(200).json({
        code: 0,
        msg: '获取投票结果成功',
        data: votes
      });
    });
  } catch (error) {
    console.error('获取投票结果失败:', error);
    res.status(500).json({ code: 500, msg: '服务器内部错误' });
  }
};

// 获取用户投票记录
export const getUserVoteRecords = (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // 查询用户的投票记录
    const sql = 'SELECT * FROM votes WHERE user_id = ? ORDER BY voted_at DESC';

    db.query(sql, [userId], (err, result: Vote[]) => {
      if (err) {
        console.error('查询用户投票记录失败:', err);
        return res.status(500).json({ code: 500, msg: '服务器内部错误' });
      }

      // 解析record字段 - 确保正确处理类型
        const votes = result.map(vote => ({
          ...vote,
          record: typeof vote.record === 'string' ? JSON.parse(vote.record) : vote.record
        }));

      res.status(200).json({
        code: 0,
        msg: '获取用户投票记录成功',
        data: votes
      });
    });
  } catch (error) {
    console.error('获取用户投票记录失败:', error);
    res.status(500).json({ code: 500, msg: '服务器内部错误' });
  }
};

// 导出所有处理函数
export const voteHandler = {
  submitVote,
  getVoteResults,
  getUserVoteRecords
};