import { Flex, Slider, InputNumber, Button } from 'antd'
import { useState } from 'react'
import debounce from 'lodash/debounce'

import styles from './BrandSelector.module.css'

function BrandSelector() {
  // 设置价格范围的默认值和限制
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  
  // 价格范围限制
  const PRICE_MIN = 0;
  const PRICE_MAX = 50000;
  
  // 处理Slider值变化 - 实时更新
  const handleSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };
  
  // 处理最小价格输入变化,做一个防抖处理,避免频繁触发
  const handleMinPriceChange = debounce((value: number | null) => {
    const newMin = value || PRICE_MIN;
    setMinPrice(newMin);
    setPriceRange([newMin, maxPrice]);
  }, 300);
  
  // 处理最大价格输入变化,做一个防抖处理,避免频繁触发
  const handleMaxPriceChange = debounce((value: number | null) => {
    const newMax = value || PRICE_MAX;
    setMaxPrice(newMax);
    setPriceRange([minPrice, newMax]);
  }, 300);

  return (
    <>
      <Flex className={styles.containerStyle} gap="16px">
        <Flex className={styles.categoryStyle}>
          <div className={styles.titleStyle}>分类</div>
          <Flex className={styles.categoryItemContainerStyle}>
            <Flex justify="space-between">
              <div className={styles.categoryItemStyle}>智能手机</div>
              <div className={styles.itemCountStyle}>1286</div>
            </Flex>
            <Flex justify="space-between">
              <div className={styles.categoryItemStyle}>笔记本</div>
              <div className={styles.itemCountStyle}>1286</div>
            </Flex>
            <Flex justify="space-between">
              <div className={styles.categoryItemStyle}>平板电脑</div>
              <div className={styles.itemCountStyle}>1286</div>
            </Flex>
          </Flex>
        </Flex>
        <Flex className={styles.categoryStyle}>
          <div className={styles.titleStyle}>价格</div>
          <Flex className={styles.priceInputStyle}>
            <Flex justify='space-between' align="center" className={styles.priceRangeStyle}>
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
              value={priceRange}
              onChange={handleSliderChange}
              min={PRICE_MIN}
              max={PRICE_MAX}
              style={{ width: '100%', marginTop: 10 }}
              className={styles.sliderStyle}
            />
          </Flex>
        </Flex>
        <Flex className={styles.categoryStyle}>
          <div className={styles.titleStyle}>品牌</div>
          <Flex className={styles.brandItemContainerStyle}>
            <div className={styles.brandItemStyle}>Apple</div>
            <div className={styles.brandItemStyle}>Samsung</div>
            <div className={styles.brandItemStyle}>Huawei</div>
          </Flex>
        </Flex>
      </Flex>
      <Button type="primary" >筛选</Button>
    </>
  )
}

export default BrandSelector