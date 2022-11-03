import React from 'react';
import {Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Setting from './setting';
import './App.css';

const { Header, Content, Footer } = Layout;

const App = ({ match }: any) => {
  // let defaultKey = match.url.replace('/', '') || 'employee';
  const defaultKey = 'employee'
  return <ConfigProvider locale={zh_CN}>
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[defaultKey]}
          className="menu"
        >
          <Menu.Item key="setting"><Link to="/setting">系统设置</Link></Menu.Item>
        </Menu>
        
      </Header>
      <Content className="contentWrap">
        <div className="content">
          <Routes>
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </Content>
      <Footer className="footer">TypeScript in Action By React</Footer>
    </Layout>
  </ConfigProvider>
}

export default App;
