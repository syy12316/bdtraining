import Aishop from './Aishop'
import styles from './ShopContent.module.css'
import { Flex, Pagination } from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import type { RootState } from '../../store'
import { setCurrentPage, setPageSize } from '../../store/productsSlice'
import RealShop from './RealShop'
import { List } from 'react-virtualized'



function ShopContent() {
  const dispatch = useDispatch()
  const { aiShopData, filteredProducts, currentPage, pageSize, showAiProducts } = useSelector((state: RootState) => state.products)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [listWidth, setListWidth] = useState<number>(1000)
  const [listHeight, setListHeight] = useState<number>(600)
  
  // 处理页码变化
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }
  // 处理每页大小变化
  const handleShowSizeChange = (_current: number, size: number) => {
    dispatch(setCurrentPage(1))
    dispatch(setPageSize(size))
  }
  
  // 动态获取容器宽度和高度
  useEffect(() => {
    const updateDimensions = () => {
      // 更新宽度
      if (containerRef.current) {
        setListWidth(containerRef.current.offsetWidth)
      }
      
      // 更新高度
      if (scrollContainerRef.current) {
        setListHeight(scrollContainerRef.current.offsetHeight)
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => window.removeEventListener('resize', updateDimensions)
  }, [showAiProducts])
  


  return (
    <>
      {showAiProducts && (
          <div key="ai-recommendations" className={styles.aiRemStyle}>
            <Flex className={styles.titleContainerStyle}>
              <div className={styles.titleStyle}>智能推荐</div>
              <div className={styles.aiRemContentStyle}>
                Ai为您推荐
              </div>
            </Flex>
            <Flex className={styles.shopContainerStyle} gap="16px">
              {
                aiShopData.map((item, index) => {
                  return (
                    <Aishop key={`ai-product-${index}`} data={item} />
                  );
                })
              }
            </Flex>
          </div>
        )}
      <div key="product-list" className={styles.productListStyle}>
        <div key="list-title" className={styles.titleStyle}>
          {`商品列表(${filteredProducts.length})`}
        </div>
        <div className={styles.scrollableContainer} ref={scrollContainerRef}>
          <div ref={containerRef} style={{ height: '100%' }}>
            <List
              width={listWidth}
              height={listHeight}
              rowCount={filteredProducts.length}
              rowHeight={178} // 商品项高度
              rowRenderer={({ index, key, style }) => (
                <div key={key} style={style} className={styles.realShopItem}>
                  <RealShop data={filteredProducts[index]} />
                </div>
              )}
              overscanRowCount={5}
            />
          </div>
        </div>
        {/* 分页组件 */}
        <Flex key="pagination" className={styles.paginationContainer} justify="center">
          <Pagination
            showSizeChanger
            onShowSizeChange={handleShowSizeChange}
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            showTotal={(total) => `共 ${total} 个商品`}
            onChange={handlePageChange}
          />
        </Flex>
      </div>
    </>
  )
}

export default ShopContent