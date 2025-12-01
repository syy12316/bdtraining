import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { aiShopDataType, realShopDataType } from '../components/Content/type';
import Mock from 'mockjs';
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

// 异步获取AI商品数据
export const fetchAiShopDataAsync = createAsyncThunk(
  'products/fetchAiShopData',
  async () => {
    // 直接返回mock数据，不通过fetch请求
    // 这确保了数据总是可用的
    return Mock.mock({
      'list|4': [
        {
          shopImg: `https://picsum.photos/200/200?random=@integer(1, 100)`,
          shopName: '智能推荐商品@id',
          currentPrice: '@float(800, 1200, 2, 2)',
          originalPrice: '@float(1000, 1500, 2, 2)'
        }
      ]
    }).list;
  }
)

// 异步获取真实商品数据
export const fetchRealShopDataAsync = createAsyncThunk(
  'products/fetchRealShopData',
  async () => {
    // 直接返回mock数据，不通过fetch请求
    // 这确保了数据总是可用的
    return Mock.mock({
      'list|20': [
        {
          shopImg: `https://picsum.photos/200/200?random=@integer(1, 100)`,
          shopName: '@pick(["Apple iPhone 15 Pro", "Samsung Galaxy S24 Ultra", "Xiaomi 14 Pro", "Huawei Mate 60 Pro", "OPPO Find X7 Ultra", "vivo X100 Pro"])',
          shopCeilCount: '@integer(1000, 2000)',
          shopInfo: '@csentence(10, 20)',
          score: '@float(4.5, 5.0, 1, 1)',
          shopCommentCount: '@integer(500, 2000)',
          currentPrice: '@float(5000, 12000, 2, 2)',
          originalPrice: '@float(6000, 13000, 2, 2)',
          category: '@pick(["手机", "电脑", "平板", "耳机", "手表"])',
          brand: '@pick(["Apple", "Samsung", "Xiaomi", "Huawei", "OPPO", "vivo"])'
        }
      ]
    }).list;
  }
)

// 异步获取所有商品数据的thunk
export const fetchAllShopDataAsync = createAsyncThunk(
  'products/fetchAllShopData',
  async (_, { dispatch }) => {
    // 并行获取AI推荐商品和真实商品数据
    const [aiData, realData] = await Promise.all([
      dispatch(fetchAiShopDataAsync()),
      dispatch(fetchRealShopDataAsync())
    ]);
    
    // 模拟网络请求延迟，以便骨架屏能够显示
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 返回组合后的数据
    return { 
      aiData: aiData.payload, 
      realData: realData.payload 
    };
  }
)

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

// 初始状态
const initialState: ProductsState = {
  aiShopData: [],
  realShopData: [],
  filteredProducts: [],
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
  extraReducers: (builder) => {
    builder
      // 处理AI推荐商品获取
      .addCase(fetchAiShopDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAiShopDataAsync.fulfilled, (state, action) => {
        state.aiShopData = action.payload;
      })
      .addCase(fetchAiShopDataAsync.rejected, (state) => {
        state.loading = false;
      })
      // 处理真实商品获取
      .addCase(fetchRealShopDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRealShopDataAsync.fulfilled, (state, action) => {
        state.realShopData = action.payload;
      })
      .addCase(fetchRealShopDataAsync.rejected, (state) => {
        state.loading = false;
      })
      // 处理所有商品数据获取
      .addCase(fetchAllShopDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllShopDataAsync.fulfilled, (state, action) => {
        // 从action.payload中获取数据并更新状态
        state.aiShopData = action.payload.aiData;
        state.realShopData = action.payload.realData;
        state.filteredProducts = action.payload.realData;
        state.loading = false;
      })
      .addCase(fetchAllShopDataAsync.rejected, (state) => {
        state.loading = false;
      })
      // 处理筛选商品
      .addCase(calculateFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(calculateFilteredProducts.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(calculateFilteredProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

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