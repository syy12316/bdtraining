import express from 'express';
import { login, register } from '../router_handler/user'
import expressJoi from '@escook/express-joi'
import { reg_login_schema } from '../schema/user'

// 创建用户路由对象
const userRouter = express.Router();

// 注册路由 - 使用expressJoi包装验证规则
userRouter.post('/register', expressJoi(reg_login_schema), register)
// 登录路由 - 使用expressJoi包装验证规则
userRouter.post('/login', expressJoi(reg_login_schema), login)

export default userRouter;