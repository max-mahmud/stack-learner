import React, { useEffect, useState } from 'react'
import Home from './page/Home'
import Check from './page/Check'

const App = () => {
  const [color, setcolor] = useState("red")
  const handleClick = () => {
    if (color === "red") {
      setcolor("blue")
    } else {
      setcolor("red")
    }
  }
  const [text, setText] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setText("newText")
    }, 1000)

  }, [])
  return (
    <div>
      <button style={{ backgroundColor: color }} onClick={handleClick} data-testid="btn">Change to Blue</button>
      <h4>title</h4>
      <span data-testid="mytest">{text}</span>
      <div>
        <Home />
        <Check />
      </div>
    </div>
  )
}

export default App
