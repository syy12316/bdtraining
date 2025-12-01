import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import productsReducer from './productsSlice';

// 创建Redux store
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    products: productsReducer,
  },
});

// 导出RootState类型
export type RootState = ReturnType<typeof store.getState>;

// 导出AppDispatch类型
export type AppDispatch = typeof store.dispatch;