import { Flex } from 'antd'
import styles from './Foot.module.css'
import { ShopOutlined } from '@ant-design/icons';

function Foot() {
  return (
    <Flex className={styles.footerStyle}>
      <Flex key="logo" className={styles.footerLogo}>
        <ShopOutlined key="icon" className={styles.Logo} />
        <div key="text" className={styles.footerLogoText}>科技生活馆 智能科技购物平台</div>
      </Flex>
      <Flex key="tools" className={styles.footerTool}>
        <div key="about" className={styles.footerToolItem}>
          关于我们
        </div>
        <div key="contact" className={styles.footerToolItem}>
          联系我们
        </div>
        <div key="privacy" className={styles.footerToolItem}>
          隐私政策
        </div>
        <div key="help" className={styles.footerToolItem}>
          帮助中心
        </div>
      </Flex>
    </Flex>
  )
}
export default Foot