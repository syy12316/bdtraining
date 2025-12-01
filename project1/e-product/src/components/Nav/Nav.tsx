import styles from './Nav.module.css'
import { Input, Flex } from 'antd';
import SearchResult from './SearchResult'
import { ShopOutlined, ShoppingCartOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateSearchKeyword } from '../../store/filterSlice';
import { calculateFilteredProducts } from '../../store/productsSlice';
import type { AppDispatch } from '../../store';

const { Search } = Input;

function Nav(){
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState('');
  
  // 防抖搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateSearchKeyword(searchValue));
      dispatch(calculateFilteredProducts());
    }, 300); // 300ms防抖延迟
    
    return () => clearTimeout(timer);
  }, [searchValue, dispatch]);
  
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  
  return (
    <>
      <Flex className={styles.main}> 
        <Flex key="search-area" className={styles.searchArea}>
          <Flex key="logo" align="center" className={styles.searchIcon}>
            <ShopOutlined className={styles.Logo} />
            科技生活馆
          </Flex>
          <Search 
            placeholder="搜索商品" 
            enterButton 
            className={styles.search}
            onSearch={handleSearch}
            onChange={handleInputChange}
            value={searchValue}
          />
          <Flex key="tools" className={styles.searchTools}>
            <ShoppingCartOutlined key="cart" className={styles.Logo}/>
            <BellOutlined key="bell" className={styles.Logo}/>
            <UserOutlined key="user" className={styles.Logo}/>
          </Flex>
        </Flex>
        <SearchResult key="search-result" />
      </Flex>
    </>
  )
}

export default Nav