import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import Board from '../components/board/board'
import Counter from '../components/counter/counter'

import './App.css'

const { Header, Content, Footer } = Layout

const App = ({ match }: any) => {
  const defaultKey = 'board'
  return <ConfigProvider locale={zh_CN}>
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[defaultKey]}
          className="menu"
        >
          <Menu.Item key="board"><Link to="/board">看板</Link></Menu.Item>
          <Menu.Item key="counter"><Link to="/counter">计数器</Link></Menu.Item>
        </Menu>
        
      </Header>
      <Content className="contentWrap">
        <div className="content">
          <Routes>
            <Route path="/board" element={<Board />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </div>
      </Content>
      <Footer className="footer">TypeScript in Action By React</Footer>
    </Layout>
  </ConfigProvider>
}

export default App
