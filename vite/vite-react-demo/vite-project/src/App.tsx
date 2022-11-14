import { Header } from "./components/header"
import fib from 'virtual:fib'
// 这里我们使用了 virtual:fib 这个虚拟模块，虽然这个模块不存在真实的文件系统中，但你打开浏览器后可以发现这个模块导入的函数可以正常执行
import env from 'virtual:env'
console.log(env)

function App() {
  return (
    <div>
      <Header />
      <div>
        ${ fib(10) }
      </div>
    </div>
  )
}

export default App