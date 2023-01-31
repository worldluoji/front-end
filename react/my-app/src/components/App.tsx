import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import Board from '../components/board/board'
import Counter from '../components/counter/counter'
import Counter2 from '../components/counter/countUseReducer'
import ListWithMore from './listwithmore/ListWithMore'
import Form from './form/Form'
import Form1 from './form/Form1'
import Modal from './modal/ModalDemo'
import Loadable from './loadable/LoadableDemo'



import './App.css'

const { Header, Content, Footer } = Layout

// router/index.tsx 路由的优先级高于App里用Route配置的优先级
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
          <Menu.Item key="counter2"><Link to="/counter2">计数器2</Link></Menu.Item>
          <Menu.Item key="listwithmore"><Link to="/listwithmore">ListWithMore</Link></Menu.Item>
          <Menu.Item key="form"><Link to="/form">Form by hooks</Link></Menu.Item>
          <Menu.Item key="form1"><Link to="/form1">非受控Form</Link></Menu.Item>
          <Menu.Item key="modal"><Link to="/modal">Modal</Link></Menu.Item>
          <Menu.Item key="loadable"><Link to="/loadable">Loadable</Link></Menu.Item>
        </Menu>
        
      </Header>
      <Content className="contentWrap">
        <div className="content">
          <Routes>
            <Route path="/board" element={<Board />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/counter2" element={<Counter2 />} />
            <Route path="/listwithmore" element={<ListWithMore />} />
            <Route path="/form" element={<Form />} />
            <Route path="/form1" element={<Form1 />} />
            <Route path="/modal" element={<Modal />} />
            <Route path="/loadable" element={<Loadable />} />
          </Routes>
        </div>
      </Content>
      <Footer className="footer">TypeScript in Action By React</Footer>
    </Layout>
  </ConfigProvider>
}

export default App
