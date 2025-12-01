import { Flex } from "antd"
import styles from './Aishop.module.css'
import type { aiShopDataType } from "./type"

function Aishop({data}: { data: aiShopDataType }) {
  return (
    <Flex className={styles.shopContainerStyle}>
      <div key="image" className={styles.shopImgStyle}>
        <img src={data.shopImg} alt="" />
      </div>
      <div key="name" className={styles.shopNameStyle}>
        {data.shopName}
      </div>
      <Flex key="price" className={styles.shopPriceStyle}>
        <div className={styles.currentPriceStyle}>
          {`¥${data.currentPrice}`}
        </div>
        <div className={styles.originalPriceStyle}>
          {`¥${data.originalPrice}`}
        </div>
      </Flex>
    </Flex>
  )
}

export default Aishop