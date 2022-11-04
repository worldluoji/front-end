
import React, { useRef } from "react"

// 所谓非受控组件，就是表单元素的值不是由父组件决定的，而是完全内部的状态。
function Form1() {
  // 定义一个 ref 用于保存 input 节点的引用
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit:React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault()
    // 使用的时候直接从 input 节点获取值
    if (inputRef.current) {
        alert("Name: " + inputRef.current.value)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={inputRef} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

// 通过非受控组件的方式，input 的输入过程对整个组件状态没有任何影响(没有useState)，自然也就不会导致组件的重新渲染。

// 不过缺点也是明显的，输入过程因为没有对应的状态变化，因此要动态地根据用户输入做 UI 上的调整就无法做到了。

export default Form1