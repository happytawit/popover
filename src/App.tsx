import React from 'react'
import Popover from './componentts/Popover/Popover'

function App() {
  const content = <span>My content</span>

  return (
    <div className="app">
      <h1>My popover</h1>

      <Popover title="nytitle" content={content}>
        <button>Hover me</button>
      </Popover>
    </div>
  )
}

export default App
