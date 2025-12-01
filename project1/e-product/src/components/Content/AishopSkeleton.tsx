import { Skeleton, Flex } from 'antd';
import styles from './Aishop.module.css';

function AishopSkeleton() {
  return (
    <Flex style={{flexDirection: 'column', gap: 12}}>
      <div className={styles.shopImgStyle}>
        <Skeleton.Image active />
      </div>
      <div className={styles.shopNameStyle}>
        <Skeleton.Input 
          active 
          style={{ width: '100%', height: 20 }} // 与原字体大小和行高匹配
        />
      </div>
      <div>
        <Skeleton.Input 
          active 
          style={{ width: '100%', height: 20 }} // 与原字体大小和行高匹配
        />
      </div>
      <div>
        <Skeleton.Input 
          active 
          style={{ width: '100%', height: 20 }} // 与原字体大小和行高匹配
        />
      </div>
    </Flex>
  );
}

export default AishopSkeleton;