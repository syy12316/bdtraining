"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../../db");
// JWT配置
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
const jwtExpiresIn = '1h';
// 生成JWT token
const generateToken = (userId, username) => {
    return jsonwebtoken_1.default.sign({ id: userId, username }, jwtSecret, { expiresIn: jwtExpiresIn });
};
// 注册请求的处理函数
const register = (req, res) => {
    try {
        // 获取请求体中的数据
        const { username, password } = req.body;
        // 1. 检查用户名是否已经存在
        const checkUserSql = 'SELECT * FROM user WHERE username = ?';
        db_1.db.query(checkUserSql, [username], (err, result) => {
            if (err) {
                console.error('查询用户名失败:', err);
                return res.status(500).json({ code: 500, msg: '服务器内部错误' });
            }
            if (result.length > 0) {
                return res.status(400).json({ code: 400, msg: '用户名已被注册' });
            }
            // 2. 对密码进行加密处理
            const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
            // 3. 插入新用户到数据库
            const insertUserSql = 'INSERT INTO user (username, password) VALUES (?, ?)';
            db_1.db.query(insertUserSql, [username, hashedPassword], (err, result) => {
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
    }
    catch (error) {
        console.error('注册失败:', error);
        res.status(500).json({ code: 500, msg: '服务器内部错误' });
    }
};
exports.register = register;
// 登录请求的处理函数
const login = (req, res) => {
    try {
        // 获取请求体中的数据
        const { username, password } = req.body;
        // 1. 根据用户名查询用户信息
        const loginSql = 'SELECT * FROM user WHERE username = ?';
        db_1.db.query(loginSql, [username], (err, result) => {
            if (err) {
                console.error('查询用户失败:', err);
                return res.status(500).json({ code: 500, msg: '服务器内部错误' });
            }
            if (result.length === 0) {
                return res.status(400).json({ code: 400, msg: '用户名或密码错误' });
            }
            const user = result[0];
            // 2. 验证密码
            const isPasswordValid = bcryptjs_1.default.compareSync(password, user.password);
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
    }
    catch (error) {
        console.error('登录失败:', error);
        res.status(500).json({ code: 500, msg: '服务器内部错误' });
    }
};
exports.login = login;
//# sourceMappingURL=user.js.map