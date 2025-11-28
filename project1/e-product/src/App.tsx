import Nav from './components/Nav/Nav'
import Foot from './components/Foot/Foot'
import BrandSelector from './components/Selector/BrandSelector'
import ShopContent from './components/Content/ShopContent'
import {Flex, Layout } from 'antd'
import styles from './App.module.css'
const { Header, Footer, Sider, Content } = Layout



function App() {
  return (
    <Flex>
      <Layout className={styles.layoutStyle}>
        <Header className={styles.headerStyle}>
          <Nav />
        </Header>
        <Layout className={styles.contentLayoutStyle}>
          <Sider width="400px" className={styles.siderStyle}>
            <BrandSelector />
          </Sider>
          <Content className={styles.contentStyle}>
            <ShopContent />
          </Content>
        </Layout>
        <Footer className={styles.footerStyle}>
          <Foot />
        </Footer>
    </Layout>
    </Flex>
  )
}

export default App
