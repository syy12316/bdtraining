import styles from './SearchResult.module.css'
import { Flex, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { updatePriceRange, updateCategories, updateBrands, updateSortBy } from '../../store/filterSlice';
import { calculateFilteredProducts, toggleAiProducts } from '../../store/productsSlice';

interface dataItem {
  title: string,
  option: string,
  value?: string,
}

interface SearchResultCardProps {
  data: dataItem,
  index: number,
  onDelete: (title: string, value?: string) => void,
}

function SearchResultCard(props: SearchResultCardProps){  
  return (
    <Flex className={styles.searchResultCard}>
      <Flex key="info" align="center">
        <div key="title">{props.data.title}</div>
        <div key="option">：{props.data.option}</div>
      </Flex>
      <CloseCircleOutlined key="close" className={styles.closeIcon} onClick={()=>props.onDelete(props.data.title, props.data.value)}/>
    </Flex>
  )
}

function AiRecommend({ dispatch }: { dispatch: AppDispatch }){  
  return (
    <Flex className={styles.aiRecommend} onClick={() => dispatch(toggleAiProducts())}>
      <div key="ai-text">Ai智能推荐</div>
    </Flex>
  )
}

function SearchResult() {
  const dispatch = useDispatch<AppDispatch>();
  const filterParams = useSelector((state: RootState) => state.filter);
  const { filteredProducts } = useSelector((state: RootState) => state.products);
  
  // 清除筛选条件的通用函数
  const clearFilter = (title: string, value?: string) => {
    switch (title) {
      case '价格':
        // 清除价格筛选
        dispatch(updatePriceRange({ minPrice: 0, maxPrice: 10000 }));
        break;
      case '分类':
        // 清除特定分类筛选
        if (value) {
          const newCategories = filterParams.categories.filter(c => c !== value);
          dispatch(updateCategories(newCategories));
        }
        break;
      case '品牌':
        // 清除特定品牌筛选
        if (value) {
          const newBrands = filterParams.brands.filter(b => b !== value);
          dispatch(updateBrands(newBrands));
        }
        break;
      default:
        break;
    }
    // 使用thunk计算筛选结果
    dispatch(calculateFilteredProducts());
  };
  
  return (
    <Flex className={styles.resultContainer}>
      <Flex key="search-result" className={styles.searchResult}>
        <p key="result-count">搜索结果: 共{filteredProducts.length}条</p>
        
        {/* 价格筛选条件 */}
        {(filterParams.minPrice > 0 || filterParams.maxPrice < 10000) && (
          <SearchResultCard 
            key="price-filter"
            data={{ 
              title: '价格', 
              option: `¥${filterParams.minPrice}-¥${filterParams.maxPrice}` 
            }}
            index={0}
            onDelete={clearFilter}
          />
        )}
        
        {/* 分类筛选条件 */}
        {filterParams.categories.map((category, index) => (
          <SearchResultCard 
            key={`category-${category}`}
            data={{ 
              title: '分类', 
              option: category, 
              value: category 
            }}
            index={index + 1}
            onDelete={clearFilter}
          />
        ))}
        
        {/* 品牌筛选条件 */}
        {filterParams.brands.map((brand, index) => (
          <SearchResultCard 
            key={`brand-${brand}`}
            data={{ 
              title: '品牌', 
              option: brand, 
              value: brand 
            }}
            index={index + filterParams.categories.length + 2}
            onDelete={clearFilter}
          />
        ))}
      </Flex>
      <Flex key="select-result" className={styles.selectResult}>
        <Flex key="sort" className={styles.selectInput}>
          <div key="label" className={styles.selectLabel}>排序方式:</div>
          <Select
            key="select"
            options={[
              {
                label: '价格',
                value: 'price',
              },
              {
                label: '评分',
                value: 'rating',
              },
              {
                label:'销量',
                value: 'sales',
              }
            ]}
            value={filterParams.sortBy}
            onChange={(value) => {
              dispatch(updateSortBy(value));
              dispatch(calculateFilteredProducts());
            }}
          />
        </Flex>
        <AiRecommend key="ai-recommend" dispatch={dispatch} />
      </Flex>
    </Flex>
  )
}

export default SearchResult