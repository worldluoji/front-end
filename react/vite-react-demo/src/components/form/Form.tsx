
import React, { useCallback } from "react"
import useForm from '../../hooks/useForm'

/*
基本上一些开源的表单方案都是基于这么一个核心的原理：把表单的状态管理单独提取出来，成为一个可重用的 Hook。
这样在表单的实现组件中，我们就只需要更多地去关心 UI 的渲染，而无需关心状态是如何存储和管理的，从而方便表单组件的开发。
*/

export default () => {
  // 使用 useForm 得到表单的状态管理逻辑
  const { values, setFieldValue } = useForm({name: '', email: ''})
  // 处理表单的提交事件
  const handleSubmit: React.FormEventHandler = useCallback (
    (evt) => {
      // 使用 preventDefault() 防止页面被刷新
      evt.preventDefault()
      console.log(values)
    },
    [values],
  )

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          value={values.name || ''}
          onChange={(evt) => setFieldValue("name", evt.target.value)}
        />
      </div>

      <div>
        <label>Email: </label>
        <input
          value={values.email || ''}
          onChange={(evt) => setFieldValue("email", evt.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
