"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
// 加载环境变量
dotenv_1.default.config();
exports.db = mysql_1.default.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'project2'
});
//# sourceMappingURL=index.js.map