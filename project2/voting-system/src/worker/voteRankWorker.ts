// VoteRankWorker.ts - Web Worker to calculate vote option rankings

interface VoteOption {
  id: string;
  name: string;
  votes: number;
}

interface RankedOption extends VoteOption {
  rank: number;
}

// 处理消息事件
self.onmessage = (event: MessageEvent) => {
  const { type, data } = event.data;
  
  if (type === 'CALCULATE_RANKINGS') {
    const options: VoteOption[] = data;
    
    // 计算排名
    const rankedOptions = calculateRankings(options);
    
    // 将结果发送回主线程
    self.postMessage({
      type: 'RANKINGS_RESULT',
      data: rankedOptions
    });
  }
};

function calculateRankings(options: VoteOption[]): RankedOption[] {
  // 首先按票数降序排序
  const sortedOptions = [...options].sort((a, b) => b.votes - a.votes);
  
  // 然后计算排名（使用密集排名：1, 1, 2, 2...）
  let currentRank = 1;
  return sortedOptions.map((option, index) => {
    // 如果不是第一个选项且票数与前一个不同，则排名+1
    if (index > 0 && option.votes !== sortedOptions[index - 1].votes) {
      currentRank++;
    }
    
    return {
      ...option,
      rank: currentRank
    };
  });
}
