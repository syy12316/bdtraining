"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./src/router/userRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// 解决跨域问题，兼容json输入
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 解析urlencoded格式的请求体
app.use(express_1.default.urlencoded({ extended: false }));
// 注册用户路由
app.use('/api/user', userRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map