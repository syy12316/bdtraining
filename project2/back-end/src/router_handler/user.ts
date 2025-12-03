import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../db';

// JWT配置
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
const jwtExpiresIn = '1h';

// 生成JWT token
const generateToken = (userId: number, username: string): string => {
  return jwt.sign(
    { id: userId, username },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
};

// 定义User接口
interface User {
  id: number;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

// 注册请求的处理函数
export const register = (req: Request, res: Response) => {
  try {
    // 获取请求体中的数据
    const { username, password } = req.body;

    // 1. 检查用户名是否已经存在
    const checkUserSql = 'SELECT * FROM user WHERE username = ?';
    db.query(checkUserSql, [username], (err, result: any[]) => {
      if (err) {
        console.error('查询用户名失败:', err);
        return res.status(500).json({ code: 500, msg: '服务器内部错误' });
      }

      if (result.length > 0) {
        return res.status(400).json({ code: 400, msg: '用户名已被注册' });
      }

      // 2. 对密码进行加密处理
      const hashedPassword = bcrypt.hashSync(password, 10);

      // 3. 插入新用户到数据库
      const insertUserSql = 'INSERT INTO user (username, password) VALUES (?, ?)';
      db.query(insertUserSql, [username, hashedPassword], (err, result: any) => {
        if (err) {
          console.error('插入用户失败:', err);
          return res.status(500).json({ code: 500, msg: '服务器内部错误' });
        }

        // 4. 生成JWT token
        const token = generateToken(result.insertId, username);

        // 5. 返回注册成功信息
        res.status(201).json({
          code: 0,
          msg: '注册成功',
          data: {
            id: result.insertId,
            username,
            token
          }
        });
      });
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ code: 500, msg: '服务器内部错误' });
  }
};

// 登录请求的处理函数
export const login = (req: Request, res: Response) => {
  try {
    // 获取请求体中的数据
    const { username, password } = req.body;

    // 1. 根据用户名查询用户信息
    const loginSql = 'SELECT * FROM user WHERE username = ?';
    db.query(loginSql, [username], (err, result: any[]) => {
      if (err) {
        console.error('查询用户失败:', err);
        return res.status(500).json({ code: 500, msg: '服务器内部错误' });
      }

      if (result.length === 0) {
        return res.status(400).json({ code: 400, msg: '用户名或密码错误' });
      }

      const user = result[0];

      // 2. 验证密码
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ code: 400, msg: '用户名或密码错误' });
      }

      // 3. 生成JWT token
      const token = generateToken(user.id, user.username);

      // 4. 返回登录成功信息
      res.status(200).json({
        code: 0,
        msg: '登录成功',
        data: {
          id: user.id,
          username: user.username,
          token
        }
      });
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ code: 500, msg: '服务器内部错误' });
  }
};

