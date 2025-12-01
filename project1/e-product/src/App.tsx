import Nav from './components/Nav/Nav'
import Foot from './components/Foot/Foot'
import BrandSelector from './components/Selector/BrandSelector'
import ShopContent from './components/Content/ShopContent'
import {Flex, Layout } from 'antd'
import styles from './App.module.css'
const { Header, Footer, Sider, Content } = Layout



function App() {
  return (
    <Flex key="app-container">
      <Layout key="layout" className={styles.layoutStyle}>
        <Header key="header" className={styles.headerStyle}>
          <Nav />
        </Header>
        <Layout key="contentLayout" className={styles.contentLayoutStyle}>
          <Sider key="sider" width="400px" className={styles.siderStyle}>
            <BrandSelector />
          </Sider>
          <Content key="content" className={styles.contentStyle}>
            <ShopContent />
          </Content>
        </Layout>
        <Footer key="footer" className={styles.footerStyle}>
          <Foot />
        </Footer>
      </Layout>
    </Flex>
  )
}

export default App
