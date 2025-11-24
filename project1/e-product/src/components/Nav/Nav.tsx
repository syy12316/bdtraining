import styles from './Nav.module.css'
import { Input, Flex } from 'antd';
import SearchResult from './SearchResult'
import { ShopOutlined, ShoppingCartOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const { Search } = Input;

function Nav(){
  return (
    <>
      <Flex className={styles.main}> 
        <Flex className={styles.searchArea}>
          <Flex align="center" className={styles.searchIcon}>
            <ShopOutlined className={styles.Logo} />
            科技生活馆
          </Flex>
          <Search placeholder="搜索商品" enterButton className={styles.search} />
          <Flex className={styles.searchTools}>
            <ShoppingCartOutlined className={styles.Logo}/>
            <BellOutlined className={styles.Logo}/>
            <UserOutlined className={styles.Logo}/>
          </Flex>
        </Flex>
        <SearchResult />
      </Flex>
    </>
  )
}

export default Nav