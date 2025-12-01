import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { aiShopDataType, realShopDataType } from '../components/Content/type';
import type { RootState } from './index';

// 定义商品状态类型
interface ProductsState {
  aiShopData: aiShopDataType[];
  realShopData: realShopDataType[];
  filteredProducts: realShopDataType[];
  currentPage: number;
  pageSize: number;
  showAiProducts: boolean;
  // 添加加载状态
  loading: boolean;
}

// 模拟更多商品数据
const mockAiShopData: aiShopDataType[] = [
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: '智能推荐商品1',
    currentPrice: 999,
    originalPrice: 1299,
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: '智能推荐商品2',
    currentPrice: 888,
    originalPrice: 1199,
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: '智能推荐商品3',
    currentPrice: 777,
    originalPrice: 1099,
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: '智能推荐商品4',
    currentPrice: 666,
    originalPrice: 999,
  },
];

// 模拟更多商品数据
const mockRealShopData: realShopDataType[] = [
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: 'Apple iPhone 15 Pro',
    shopCeilCount: 1200,
    shopInfo: 'iPhone 15 Pro 256GB 原色钛金属',
    score: 4.8,
    shopCommentCount: 1234,
    currentPrice: 9999,
    originalPrice: 10999,
    category: '手机',
    brand: 'Apple',
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: 'Samsung Galaxy S24 Ultra',
    shopCeilCount: 800,
    shopInfo: 'Galaxy S24 Ultra 512GB 曜夜黑',
    score: 4.7,
    shopCommentCount: 890,
    currentPrice: 8999,
    originalPrice: 9999,
    category: '手机',
    brand: 'Samsung',
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: 'Huawei Mate 60 Pro',
    shopCeilCount: 1500,
    shopInfo: 'Mate 60 Pro 512GB 雅川青',
    score: 4.9,
    shopCommentCount: 2345,
    currentPrice: 7999,
    originalPrice: 8999,
    category: '手机',
    brand: 'Huawei',
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: 'Xiaomi 14 Ultra',
    shopCeilCount: 1000,
    shopInfo: 'Xiaomi 14 Ultra 512GB 钛金属黑',
    score: 4.6,
    shopCommentCount: 1567,
    currentPrice: 6999,
    originalPrice: 7999,
    category: '手机',
    brand: 'Xiaomi',
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: 'OnePlus 12 Pro',
    shopCeilCount: 700,
    shopInfo: 'OnePlus 12 Pro 256GB 黑洞',
    score: 4.5,
    shopCommentCount: 987,
    currentPrice: 5999,
    originalPrice: 6999,
    category: '手机',
    brand: 'OnePlus',
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: 'Vivo X100 Pro',
    shopCeilCount: 600,
    shopInfo: 'Vivo X100 Pro 256GB 辰夜黑',
    score: 4.4,
    shopCommentCount: 765,
    currentPrice: 4999,
    originalPrice: 5999,
    category: '手机',
    brand: 'Vivo',
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: 'OPPO Find X7 Ultra',
    shopCeilCount: 500,
    shopInfo: 'OPPO Find X7 Ultra 256GB 黑岩',
    score: 4.3,
    shopCommentCount: 654,
    currentPrice: 5999,
    originalPrice: 6999,
    category: '手机',
    brand: 'OPPO',
  },
  {
    shopImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    shopName: 'Sony Xperia 1 V',
    shopCeilCount: 300,
    shopInfo: 'Sony Xperia 1 V 256GB 黑色',
    score: 4.2,
    shopCommentCount: 432,
    currentPrice: 7999,
    originalPrice: 8999,
    category: '手机',
    brand: 'Sony',
  },
];

// 初始状态
const initialState: ProductsState = {
  aiShopData: mockAiShopData,
  realShopData: mockRealShopData,
  filteredProducts: mockRealShopData,
  currentPage: 1,
  pageSize: 10,
  showAiProducts: true,
  // 初始加载状态为true
  loading: true,
}

// 创建商品slice
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // 设置当前页码
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // 设置每页大小
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      // 当每页大小改变时，重置到第一页
      state.currentPage = 1;
    },
    // 更新筛选后的商品
    updateFilteredProducts: (state, action: PayloadAction<realShopDataType[] | undefined>) => {
      // 如果提供了明确的商品列表，则直接使用
      if (action.payload) {
        state.filteredProducts = action.payload;
      }
      // 当筛选结果改变时，重置到第一页
      state.currentPage = 1;
    },
    // 添加AI推荐商品
    addAiShopData: (state, action: PayloadAction<aiShopDataType[]>) => {
      state.aiShopData = [...state.aiShopData, ...action.payload];
    },
    // 添加真实商品
    addRealShopData: (state, action: PayloadAction<realShopDataType[]>) => {
      state.realShopData = [...state.realShopData, ...action.payload];
    },
    // 切换AI商品的显示和隐藏
    toggleAiProducts: (state) => {
      state.showAiProducts = !state.showAiProducts;
    },
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// 导出actions
// 异步thunk用于基于筛选条件更新商品列表
export const calculateFilteredProducts = createAsyncThunk(
  'products/calculateFilteredProducts',
  async (_, { getState, dispatch }) => {
    // 设置加载状态为true
    dispatch(setLoading(true));
    
    const state = getState() as RootState;
    const { realShopData } = state.products;
    const { minPrice, maxPrice, categories, brands, sortBy, searchKeyword } = state.filter;
    
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 根据筛选条件过滤商品
    let filtered = realShopData.filter(product => {
      // 价格过滤
      const priceMatch = product.currentPrice >= minPrice && 
                        product.currentPrice <= maxPrice;
      
      // 分类过滤
      const categoryMatch = categories.length === 0 || 
                           categories.includes(product.category);
      
      // 品牌过滤
      const brandMatch = brands.length === 0 || 
                         brands.includes(product.brand);
      
      // 搜索关键词过滤
      const searchMatch = !searchKeyword || 
                         product.shopName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                         product.shopInfo.toLowerCase().includes(searchKeyword.toLowerCase());
      
      return priceMatch && categoryMatch && brandMatch && searchMatch;
    });
    
    // 根据排序方式排序商品
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.currentPrice - b.currentPrice;
        case 'rating':
          return b.score - a.score;
        case 'sales':
          return b.shopCeilCount - a.shopCeilCount;
        default:
          return a.currentPrice - b.currentPrice;
      }
    });
    
    // 更新筛选后的商品
    dispatch(updateFilteredProducts(filtered));
    
    // 设置加载状态为false
    dispatch(setLoading(false));
    
    return filtered;
  }
);

export const { 
  setCurrentPage, 
  setPageSize, 
  updateFilteredProducts,
  addAiShopData,
  addRealShopData,
  toggleAiProducts,
  setLoading
} = productsSlice.actions;

// 导出reducer
export default productsSlice.reducer;