import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './src/router/userRoute';


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// 解决跨域问题，兼容json输入
app.use(cors());
app.use(express.json());
// 解析urlencoded格式的请求体
app.use(express.urlencoded({ extended: false }))

// 注册用户路由
app.use('/api/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});