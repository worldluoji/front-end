import { PropsWithChildren, useEffect } from 'react'

// Taro 额外添加的 hooks 要从 '@tarojs/taro' 中引入
import { useDidShow, useDidHide } from '@tarojs/taro'

// 全局样式
import './app.scss'

function App(props: PropsWithChildren) {
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  // props.children 是将要被渲染的页面
  return (
    props.children
  )
}

export default App
