import { Flex, Slider, InputNumber, Checkbox } from 'antd'
import debounce from 'lodash/debounce'

import styles from './BrandSelector.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { updatePriceRange, updateCategories, updateBrands, } from '../../store/filterSlice'
import { calculateFilteredProducts } from '../../store/productsSlice'

// 价格范围常量
const PRICE_MIN = 0;
const PRICE_MAX = 10000;

function BrandSelector() {
  const dispatch = useDispatch<AppDispatch>()
  const filterParams = useSelector((state: RootState) => state.filter)
  
  // 直接从Redux store获取筛选参数，不维护本地状态
  const { minPrice, maxPrice, categories: selectedCategories, brands: selectedBrands } = filterParams
  
  // 分类和品牌选项
  const categoryOptions = ['手机', '平板电脑', '笔记本电脑', '智能手表', '耳机']
  const brandOptions = ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'OnePlus', 'Vivo', 'OPPO', 'Sony']
  

  


  // 处理滑块变化
  const handleSliderChange = debounce((value: number[]) => {
    // 更新Redux中的筛选条件
    dispatch(updatePriceRange({ minPrice: value[0], maxPrice: value[1] }))
    
    // 使用thunk计算筛选结果
    dispatch(calculateFilteredProducts())
  }, 500)

  // 处理最小值输入变化
  const handleMinPriceChange = debounce((value: number | null) => {
    const newMinPrice = value || 0
    
    // 更新Redux中的筛选条件
    dispatch(updatePriceRange({ minPrice: newMinPrice, maxPrice }))
    
    // 使用thunk计算筛选结果
    dispatch(calculateFilteredProducts())
  }, 500)

  // 处理最大值输入变化
  const handleMaxPriceChange = debounce((value: number | null) => {
    const newMaxPrice = value || 10000
    
    // 更新Redux中的筛选条件
    dispatch(updatePriceRange({ minPrice, maxPrice: newMaxPrice }))
    
    // 使用thunk计算筛选结果
    dispatch(calculateFilteredProducts())
  }, 500)
  
  // 处理分类选择变化
  const handleCategoryChange = debounce((values: string[]) => {
    // 更新Redux中的筛选条件
    dispatch(updateCategories(values))
    
    // 使用thunk计算筛选结果
    dispatch(calculateFilteredProducts())
  }, 500)
  
  // 处理品牌选择变化
  const handleBrandChange = debounce((values: string[]) => {
    // 更新Redux中的筛选条件
    dispatch(updateBrands(values))
    
    // 使用thunk计算筛选结果
    dispatch(calculateFilteredProducts())
  }, 500)

  return (
    <>
      <Flex className={styles.containerStyle} gap="16px">
        <Flex key="category" className={styles.categoryStyle}>
          <div className={styles.titleStyle}>分类</div>
          <Checkbox.Group 
            className={styles.categoryItemContainerStyle}
            value={selectedCategories}
            onChange={handleCategoryChange}
          >
            {categoryOptions.map(category => (
              <Checkbox 
                key={category} 
                className={styles.checkboxItem}
                value={category}
              >
                {category}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Flex>
        <Flex key="price" className={styles.categoryStyle}>
          <div className={styles.titleStyle}>价格</div>
          <Flex className={styles.priceInputStyle}>
            <Flex key="price-range" justify='space-between' align="center" className={styles.priceRangeStyle}>
              <InputNumber 
                value={minPrice}
                onChange={handleMinPriceChange}
                min={PRICE_MIN}
                max={maxPrice}
                style={{ width: 80 }}
              />
              —
              <InputNumber 
                value={maxPrice}
                onChange={handleMaxPriceChange}
                min={minPrice}
                max={PRICE_MAX}
                style={{ width: 80 }}
              />
            </Flex>
            <Slider 
              range={true} 
              value={[minPrice, maxPrice]}
              onChange={handleSliderChange}
              min={PRICE_MIN}
              max={PRICE_MAX}
              style={{ width: '100%', marginTop: 10 }}
              className={styles.sliderStyle}
            />
          </Flex>
        </Flex>
        <Flex key="brand" className={styles.categoryStyle}>
          <div className={styles.titleStyle}>品牌</div>
          <Checkbox.Group 
            className={styles.brandItemContainerStyle}
            value={selectedBrands}
            onChange={handleBrandChange}
          >
            {brandOptions.map(brand => (
              <Checkbox 
                key={brand} 
                className={styles.checkboxItem}
                value={brand}
              >
                {brand}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Flex>
      </Flex>
    </>
  )
}

export default BrandSelector