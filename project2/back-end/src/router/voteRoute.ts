import express from 'express';
import { voteHandler } from '../router_handler/vote';

// 创建投票路由对象
const router = express.Router();

// 提交投票路由
router.post('/submit', voteHandler.submitVote);

// 获取投票结果路由
router.get('/results', voteHandler.getVoteResults);

// 获取用户投票记录路由
router.get('/user-records/:userId', voteHandler.getUserVoteRecords);

export default router;