import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN';
import Board from '../components/board/board'
import Counter from '../components/counter/counter'
import Counter2 from '../components/counter/countUseReducer'
import ListWithMore from './listwithmore/ListWithMore'
import Form from './form/Form'
import Form1 from './form/Form1'
import Modal from './modal/ModalDemo'
import Loadable from './loadable/LoadableDemo'
import Suspense from './suspense/Suspense'

import './App.css'

const { Header, Content, Footer } = Layout

const menuItems = [
  {
    key: 'board',
    icon: <Link to="/board" />,
    label: '看板'
  },
  {
    key: 'counter',
    icon: <Link to="/counter" />,
    label: '计数器'
  },
  {
    key: 'counter2',
    icon: <Link to="/counter2" />,
    label: '计数器2'
  },
  {
    key: 'listwithmore',
    icon: <Link to="/listwithmore" />,
    label: 'listwithmore'
  },
  {
    key: 'form',
    icon: <Link to="/form" />,
    label: 'Form by hooks'
  },
  {
    key: 'form1',
    icon: <Link to="/form1" />,
    label: '非受控form'
  },
  {
    key: 'modal',
    icon: <Link to="/modal" />,
    label: 'modal'
  },
  {
    key: 'loadable',
    icon: <Link to="/loadable" />,
    label: 'loadable'
  },
  {
    key: 'suspense',
    icon: <Link to="/suspense" />,
    label: 'suspense'
  }
]

// router/index.tsx 路由的优先级高于App里用Route配置的优先级
const App = () => {
  const defaultKey = 'board'
  return <ConfigProvider locale={zh_CN}>
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[defaultKey]}
          className="menu"
          items = { menuItems }
        />

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
            <Route path="/suspense" element={<Suspense />} />
          </Routes>
        </div>
      </Content>
      <Footer className="footer">TypeScript in Action By React</Footer>
    </Layout>
  </ConfigProvider>
}

export default App
