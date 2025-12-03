import { create } from 'zustand';
import { useVoteStore } from './voteStore';

// 定义用户认证状态类型
interface AuthState {
  // 用户信息
  username: string;
  token: string;
  isLoggedIn: boolean;
  
  // 认证操作
  login: (username: string, token: string) => void;
  register: (username: string, token: string) => void;
  logout: () => void;
  
  // 错误信息
  error: string;
  setError: (error: string) => void;
}

// 创建zustand store
export const useAuthStore = create<AuthState>((set) => ({
  // 初始状态
  username: '',
  token: '',
  isLoggedIn: false,
  
  // 登录操作
  login: (username, token) => {
    useVoteStore.getState().resetVote();
    set({
      username,
      token,
      isLoggedIn: true,
      error: ''
    });
  },
  
  // 注册操作
  register: (username, token) => {
    useVoteStore.getState().resetVote();
    set({
      username,
      token,
      isLoggedIn: true,
      error: ''
    });
  },
  
  // 登出操作
  logout: () => set({
    username: '',
    token: '',
    isLoggedIn: false,
    error: ''
  }),
  
  // 错误信息处理
  error: '',
  setError: (error) => set({ error })
}));