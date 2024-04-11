import React, { useEffect, useRef, useState } from 'react'
import Popover from './componentts/Popover/Popover'
import PopoverPortals from './componentts/popoverPortals/PopoverPortals'
import Text from './componentts/Text/Text'

function App() {
  const content = <span>My content</span>

  return (
    <>
      <div className="app">
        <h1>My popover</h1>
        <Text />
        <div className="wrapperForTest">
          <Popover title="nytitle" content={content}>
            <button>Hover me</button>
          </Popover>

          <PopoverPortals title="portalTile" content={content}>
            <button>Hover me with portal</button>
          </PopoverPortals>
        </div>
        <Text />
      </div>
      <div id="portal-root"></div>
    </>
  )
}

export default App
