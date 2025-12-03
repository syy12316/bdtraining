import { create } from 'zustand';

// 定义投票选项类型
interface Option {
  id: string;
  name: string;
  votes: number;
}

// 定义用户认证状态类型
interface AuthState {
  // 用户信息
  username: string;
  token: string;
  isLoggedIn: boolean;
  
  // 投票数据
  options: Option[];
  hasVoted: boolean;
  selectedOptions: string[];
  
  // 登录操作
  login: (username: string, token: string) => void;
  
  // 注册操作
  register: (username: string, token: string) => void;
  
  // 登出操作
  logout: () => void;
  
  // 投票相关操作
  setSelectedOptions: (optionId: string) => void;
  submitVote: () => void;
  resetVote: () => void;
  
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
  
  // 初始投票选项
  options: [
    { id: '1', name: '选项A', votes: 0 },
    { id: '2', name: '选项B', votes: 0 },
    { id: '3', name: '选项C', votes: 0 },
  ],
  hasVoted: false,
  selectedOptions: [],
  
  // 登录操作
  login: (username, token) => set({
    username,
    token,
    isLoggedIn: true,
    error: ''
  }),
  
  // 注册操作
  register: (username, token) => set({
    username,
    token,
    isLoggedIn: true,
    error: ''
  }),
  
  // 登出操作
  logout: () => set({
    username: '',
    token: '',
    isLoggedIn: false,
    hasVoted: false,
    selectedOptions: [],
    error: ''
  }),
  
  // 投票相关操作
  setSelectedOptions: (optionId) => set((state) => ({
    selectedOptions: state.selectedOptions.includes(optionId)
      ? state.selectedOptions.filter(id => id !== optionId)
      : [...state.selectedOptions, optionId]
  })),
  
  submitVote: () => set((state) => {
    // 更新投票结果
    const updatedOptions = state.options.map(option => 
      state.selectedOptions.includes(option.id) 
        ? { ...option, votes: option.votes + 1 } 
        : option
    );
    
    return {
      options: updatedOptions,
      hasVoted: true,
      selectedOptions: []
    };
  }),
  
  resetVote: () => set({
    hasVoted: false,
    selectedOptions: []
  }),
  
  // 错误信息处理
  error: '',
  setError: (error) => set({ error })
}));