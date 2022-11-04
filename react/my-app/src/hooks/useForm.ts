
import { useState, useCallback } from "react"

interface ValuesType {
    [key: string]: any
}

const useForm = (initialValues: ValuesType) => {
  // 设置整个 form 的状态：values
  const [values, setValues] = useState(initialValues)
  
  // 提供一个方法用于设置 form 上的某个字段的值
  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }))
  }, [])

  // 返回整个 form 的值以及设置值的方法
  return { values, setFieldValue }
}

export default useForm