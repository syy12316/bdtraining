import Mock from 'mockjs';

// 定义AI推荐商品数据结构
interface AiShopData {
  shopImg: string;
  shopName: string;
  currentPrice: number;
  originalPrice: number;
}

// 定义真实商品数据结构
interface RealShopData {
  shopImg: string;
  shopName: string;
  shopCeilCount: number;
  shopInfo: string;
  score: number;
  shopCommentCount: number;
  currentPrice: number;
  originalPrice: number;
  category: string;
  brand: string;
}

// 确保mock数据生成和拦截
// 显式配置mock.js，确保拦截所有请求
Mock.setup({
  timeout: '200-600' // 设置响应时间范围
});

// 直接生成和返回mock数据，不使用环境判断
console.log('Mock data is being initialized...');

// 生成AI推荐商品数据
const aiShopData = Mock.mock({
  'list|4': [
    {
      shopImg: `https://picsum.photos/200/200?random=@integer(1, 100)`,
      'shopName': '智能推荐商品@id',
      'currentPrice|800-1200': 1,
      'originalPrice|1000-1500': 1
    }
  ]
}).list as AiShopData[];

// 生成真实商品数据
const realShopData = Mock.mock({
  'list|20': [
    {
      shopImg: `https://picsum.photos/200/200?random=@integer(1, 100)`,
      'shopName|1': [
        'Apple iPhone 15 Pro',
        'Samsung Galaxy S24 Ultra',
        'Xiaomi 14 Pro',
        'Huawei Mate 60 Pro',
        'OPPO Find X7 Ultra',
        'vivo X100 Pro'
      ],
      'shopCeilCount|1000-2000': 1,
      'shopInfo': '@csentence(10, 20)',
      'score|4.5-5.0': 1,
      'shopCommentCount|500-2000': 1,
      'currentPrice|5000-12000': 1,
      'originalPrice|6000-13000': 1,
      'category|1': ['手机', '电脑', '平板', '耳机', '手表'],
      'brand|1': ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OPPO', 'vivo']
    }
  ]
}).list as RealShopData[];

// 拦截API请求并返回mock数据
Mock.mock('/api/ai-shop', 'get', () => {
  console.log('Mock API /api/ai-shop called');
  return {
    code: 200,
    message: 'success',
    data: aiShopData
  };
});

Mock.mock('/api/real-shop', 'get', () => {
  console.log('Mock API /api/real-shop called');
  return {
    code: 200,
    message: 'success',
    data: realShopData
  };
});

console.log('Mock data initialized successfully:', {
  aiShopDataLength: aiShopData.length,
  realShopDataLength: realShopData.length
});

export default Mock;