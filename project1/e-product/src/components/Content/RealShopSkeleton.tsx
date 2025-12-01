import { Skeleton, Flex } from 'antd';
import styles from './RealShop.module.css';

function RealShopSkeleton() {
  return (
    <Flex className={styles.realShopStyle}>
      {/* 商品图片 */}
      <div className={styles.shopImgStyle}>
        <Skeleton.Image active/>
      </div>
      
      {/* 简化的商品信息区域 - 四行输入框 */}
      <Flex className={styles.shopInfo} style={{ gap: '12px', flex: 1, padding: '0 16px' }}>
        <Skeleton.Input active style={{ width: '100%', height: 20 }} />
        <Skeleton.Input active style={{ width: '100%', height: 20 }} />
        <Skeleton.Input active style={{ width: '100%', height: 20 }} />
        <Skeleton.Input active style={{ width: '100%', height: 20 }} />
      </Flex>
    </Flex>
  );
}

export default RealShopSkeleton;