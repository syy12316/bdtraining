import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 定义筛选参数类型
export interface FilterParams {
  minPrice: number;
  maxPrice: number;
  categories: string[];
  brands: string[];
  sortBy: string;
  searchKeyword: string;
}

// 初始状态
const initialState: FilterParams = {
  minPrice: 0,
  maxPrice: 10000,
  categories: [],
  brands: [],
  sortBy: 'price',
  searchKeyword: '',
}

// 创建筛选条件slice
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // 更新价格范围
    updatePriceRange: (state, action: PayloadAction<{ minPrice: number; maxPrice: number }>) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    // 更新分类
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    // 更新品牌
    updateBrands: (state, action: PayloadAction<string[]>) => {
      state.brands = action.payload;
    },
    // 更新排序方式
    updateSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    // 更新搜索关键词
    updateSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    // 重置筛选条件
    resetFilters: (state) => {
      state.minPrice = initialState.minPrice;
      state.maxPrice = initialState.maxPrice;
      state.categories = initialState.categories;
      state.brands = initialState.brands;
      state.sortBy = initialState.sortBy;
      state.searchKeyword = initialState.searchKeyword;
    },
    // 更新全部筛选条件
    updateFilters: (state, action: PayloadAction<Partial<FilterParams>>) => {
      return { ...state, ...action.payload };
    },
  },
});

// 导出actions
export const { 
  updatePriceRange, 
  updateCategories, 
  updateBrands, 
  updateSortBy,
  updateSearchKeyword,
  resetFilters,
  updateFilters 
} = filterSlice.actions;

// 导出reducer
export default filterSlice.reducer;