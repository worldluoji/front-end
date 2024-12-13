// example一种远程加载js方案，可考虑用SystemJS代替
export const importScript = (() => {
  // 自执行函数，创建一个闭包，保存 cache 结果
  const cache = {}
  return (url) => {
    // 如果有缓存，则直接返回缓存内容
    if (cache[url]) return Promise.resolve(cache[url])

    return new Promise((resolve, reject) => {
      // 保存最后一个 window 属性 key
      const lastWindowKey = Object.keys(window).pop()

      // 创建 script
      const script = document.createElement('script')
      script.setAttribute('src', url)
      script.setAttribute('type', 'module')
      document.head.appendChild(script)

      // 监听加载完成事件
      script.addEventListener('load', () => {
        document.head.removeChild(script)
        // 最后一个新增的 key，就是 umd 挂载的，可自行验证
        const newLastWindowKey = Object.keys(window).pop()
        
        // 获取到导出的组件
        const res = lastWindowKey !== newLastWindowKey ? (window[newLastWindowKey]) : ({})
        const Com = res.default ? res.default : res
        
        cache[url] = Com
        
        resolve(Com)
      })

      // 监听加载失败情况
      script.addEventListener('error', (error) => {
        reject(error)
      })
    })
  }
})()