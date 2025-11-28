import { Flex } from 'antd'
import styles from './Foot.module.css'
import { ShopOutlined } from '@ant-design/icons';

function Foot() {
  return (
    <Flex className={styles.footerStyle}>
      <Flex className={styles.footerLogo}>
        <ShopOutlined className={styles.Logo} />
        <div className={styles.footerLogoText}>科技生活馆 智能科技购物平台</div>
      </Flex>
      <Flex className={styles.footerTool}>
        <div className={styles.footerToolItem}>
          关于我们
        </div>
        <div className={styles.footerToolItem}>
          联系我们
        </div>
        <div className={styles.footerToolItem}>
          隐私政策
        </div>
        <div className={styles.footerToolItem}>
          帮助中心
        </div>
      </Flex>
    </Flex>
  )
}
export default Foot