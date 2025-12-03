"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../router_handler/user");
const express_joi_1 = __importDefault(require("@escook/express-joi"));
const user_2 = require("../schema/user");
// 创建用户路由对象
const userRouter = express_1.default.Router();
// 注册路由 - 使用expressJoi包装验证规则
userRouter.post('/register', (0, express_joi_1.default)(user_2.reg_login_schema), user_1.register);
// 登录路由 - 使用expressJoi包装验证规则
userRouter.post('/login', (0, express_joi_1.default)(user_2.reg_login_schema), user_1.login);
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map