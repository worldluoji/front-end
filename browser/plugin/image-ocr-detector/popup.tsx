import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <p>
        Welcome to Image OCR Detector.
      </p>
    </div>
  )
}

export default IndexPopup
