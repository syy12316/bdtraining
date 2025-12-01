import type { realShopDataType } from './type'
import styles from './RealShop.module.css'
import { Flex, Rate, Button } from 'antd';

function RealShop({data}: {data: realShopDataType}) {
  // 生成星级评分
  const renderStars = (score: number) => {
    return <Rate disabled defaultValue={score} />
  };

  // 格式化价格
  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString()}`;
  };

  return (
    <Flex className={styles.realShopStyle}>
      {/* 商品图片 */}
      <img key="image" src={data.shopImg} alt={data.shopName} className={styles.shopImg} />
      
      {/* 商品信息区域 */}
      <Flex key="info" className={styles.shopInfo}>
        {/* 商品名称 */}
        <div key="name" className={styles.shopName}>{data.shopName}</div>
        
        {/* 评分和评论数 */}
        <Flex key="rating" className={styles.ratingContainer} align="center">
          <div>{renderStars(data.score)}</div>
          <span className={styles.scoreText}>{data.score.toFixed(1)}</span>
          <span className={styles.commentCount}>-{data.shopCommentCount.toLocaleString()}评价</span>
        </Flex>
        
        {/* 商品详情 */}
        <div key="details" className={styles.shopDetails}>{data.shopInfo}</div>
        
        {/* 销量信息 */}
        <div key="sales" className={styles.salesInfo}>月销量: {data.shopCeilCount.toLocaleString()}</div>
      </Flex>
      
      {/* 价格和操作按钮区域 */}
      <Flex key="price-actions" className={styles.priceAndActions} align="flex-end" justify="space-between">
        {/* 价格信息 */}
        <Flex key="price" className={styles.priceContainer}>
          <span className={styles.currentPrice}>{formatPrice(data.currentPrice)}</span>
          <span className={styles.originalPrice}>{formatPrice(data.originalPrice)}</span>
        </Flex>
        
        {/* 操作按钮 */}
        <Flex key="actions" className={styles.actions} gap={8}>
          <Button key="collect" className={styles.collectButton}>收藏</Button>
          <Button key="add-to-cart" type="primary" className={styles.addToCartButton}>加入购物车</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default RealShop;