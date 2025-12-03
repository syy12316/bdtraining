import mysql from 'mysql';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'project2'
})