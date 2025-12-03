import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import userRouter from './src/router/userRoute';
import voteRouter from './src/router/voteRoute';
import { initWebSocket } from './src/websocket';


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// 创建http服务器
const server = http.createServer(app);

// 初始化WebSocket服务器
initWebSocket(server);

// 解决跨域问题，兼容json输入
app.use(cors());
app.use(express.json());
// 解析urlencoded格式的请求体
app.use(express.urlencoded({ extended: false }))

// 注册用户路由
app.use('/api/user', userRouter);
// 注册投票路由
app.use('/api/vote', voteRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// 启动服务器
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('WebSocket server is ready');
});