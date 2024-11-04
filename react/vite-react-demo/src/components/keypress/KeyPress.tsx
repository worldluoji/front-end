import React from "react"
import useKeyPress from '../../hooks/useKeyPress'

function UseKeyPressExample() {
  const key = useKeyPress()
  return (
    <div>
      <h1>UseKeyPress</h1>
      <label>Key pressed: {key || "N/A"}</label>
    </div>
  )
}

export default UseKeyPressExample