import { create } from 'zustand';

// 定义投票选项类型
export interface Option {
  id: string;
  name: string;
  votes: number;
}

// 定义投票记录类型
export interface VoteRecord {
  id: number;
  user_id: string;
  username: string;
  record: string[];
  voted_at: string;
}

// 定义投票状态类型
interface VoteState {
  // 投票数据
  options: Option[];
  hasVoted: boolean;
  selectedOptions: string[];
  voteRecords: VoteRecord[];
  
  // 投票相关操作
  setSelectedOptions: (optionId: string) => void;
  resetVote: () => void;
  setVoteRecords: (records: VoteRecord[]) => void;
  updateVoteResults: (votes: VoteRecord[]) => void;
  checkIfVoted: (userId: string) => void;
}

// 创建zustand store
export const useVoteStore = create<VoteState>((set) => ({
  // 初始状态
  options: [
    { id: '1', name: '春天', votes: 0 },
    { id: '2', name: '夏天', votes: 0 },
    { id: '3', name: '秋天', votes: 0 },
    { id: '4', name: '冬天', votes: 0 },
  ],
  hasVoted: false,
  selectedOptions: [],
  voteRecords: [],
  
  // 投票相关操作
  setSelectedOptions: (optionId) => set((state) => ({
    selectedOptions: state.selectedOptions.includes(optionId)
      ? state.selectedOptions.filter(id => id !== optionId)
      : [...state.selectedOptions, optionId]
  })),
  
  resetVote: () => set({
    hasVoted: false,
    selectedOptions: [],
    voteRecords: [],
    options: [
      { id: '1', name: '春天', votes: 0 },
      { id: '2', name: '夏天', votes: 0 },
      { id: '3', name: '秋天', votes: 0 },
      { id: '4', name: '冬天', votes: 0 },
    ]
  }),
  
  // 设置投票记录
  setVoteRecords: (records) => set({ voteRecords: records }),
  
  // 更新投票结果
  updateVoteResults: (votes) => set((state) => {
    // 统计每个选项的投票数
    const optionCounts: { [key: string]: number } = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
    };
    
    // 遍历所有投票记录，统计每个选项的票数
    votes.forEach(vote => {
      vote.record.forEach(optionId => {
        if (optionCounts[optionId] !== undefined) {
          optionCounts[optionId]++;
        }
      });
    });
    
    // 更新options数组中的票数
    const updatedOptions = state.options.map(option => ({
      ...option,
      votes: optionCounts[option.id] || 0
    }));
    
    return { options: updatedOptions };
  }),
  
  // 检查用户是否已投票
  checkIfVoted: (userId) => set((state) => {
    const hasVoted = state.voteRecords.some(record => record.user_id === userId);
    return { hasVoted };
  }),
}));
