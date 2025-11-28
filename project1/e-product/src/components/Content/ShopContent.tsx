import Aishop from './Aishop'
import styles from './ShopContent.module.css'
import { Flex } from 'antd'
import type { aiShopDataType, realShopDataType } from './type'



function ShopContent() {
  const aiShopData: aiShopDataType[] = [
    {
      shopImg: 'https://img1.baidu.com/it/u=3422245222,2225282222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      shopName: '商品1',
      currentPrice: 100,
      originalPrice: 1000,
    },
    {
      shopImg: 'https://img2.baidu.com/it/u=3422245222,2225282222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      shopName: '商品2',
      currentPrice: 200,
      originalPrice: 2000,
    },
  ]
  const realShopdata: realShopDataType[] = [
    {
      shopImg: 'https://img3.baidu.com/it/u=3422245222,2225282222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      shopName: '商品3',
      shopCeilCount: 100,
      shopInfo: '这是一个商品3',
      score: 4.5,
      shopCommentCount: 1000,
      currentPrice: 300,
      originalPrice: 3000,
    },
  ]

  return (
    <>
      <div className={styles.aiRemStyle}>
        <Flex className={styles.titleContainerStyle}>
          <div className={styles.titleStyle}>智能推荐</div>
          <div className={styles.aiRemContentStyle}>
          Ai为您推荐
          </div>
        </Flex>
        <Flex className={styles.shopContainerStyle} gap="16px">
          {
            aiShopData.map((item) => {
              return (
                <Aishop key={item.shopImg} data={item} />
              )
            })
          }
        </Flex>
        
      </div>
      <div className={styles.productListStyle}>
        <div className={styles.titleStyle}>
          {`商品列表(${realShopdata.length})`}
        </div>
      </div>
      
    </>
  )
}

export default ShopContent