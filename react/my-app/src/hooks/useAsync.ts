
import { useState, useCallback }from 'react'

interface Reponse {
  data: any[]
}

const useAsync = (asyncFunction: () => Promise<Reponse>) => {
  // 设置三个异步逻辑相关的 state
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // 定义一个 callback 用于执行异步逻辑
  const execute = useCallback(async () => {
    // 请求开始时，设置 loading 为 true，清除已有数据和 error 状态
    setLoading(true)
    setData([])
    setError(null)
    return asyncFunction()
      .then((response) => {
        // 请求成功时，将数据写进 state，设置 loading 为 false
        setData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        // 请求失败时，设置 loading 为 false，并设置错误状态
        setError(error)
        setLoading(false)
      })
  }, [])

  return { execute, loading, data, error }
};

export default useAsync

/*
这种类型的封装我写一个工具类不就可以了？为什么一定要通过 Hooks 进行封装呢？
这是因为 在 Hooks 中，你可以管理当前组件的 state，从而将更多的逻辑写在可重用的 Hooks 中。
但是要知道，在普通的工具类中是无法直接修改组件 state 的，那么也就无法在数据改变的时候触发组件的重新渲染。
*/