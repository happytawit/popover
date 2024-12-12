import React, { useEffect, useRef, useState } from 'react'
import Popover from './componentts/Popover/Popover'
import PopoverPortals from './componentts/popoverPortals/PopoverPortals'
import Text from './componentts/Text/Text'

function App() {
  const content = (
    <span>
      My contentMy contentMy contentMy contentMy contentMy contentMy contentMy
      contentMy contentMy contentMy contentMy contentMy contentMy contentMy
      contentMy content
    </span>
  )

  // добавить параметром отступ от блока, ширину поповера
  // прикруить на onScroll пересчет позиции поповера и чтобы была проверка относительно границ вьюпорта
  // добавить пропс placement bottom | bottomLeft | bottomRight | top | topLeft | topRight

  return (
    <>
      <div className="app">
        <h1>My popover</h1>
        <Text />
        <div className="wrapperForTest">
          {/* <Popover title="nytitle" content={content}>
            <button>Hover me</button>
          </Popover> */}

          <PopoverPortals
            title="portalTile"
            content={content}
            offset={10}
            placement="top"
            width={300}
          >
            <button>Hover me with portal Hover me with portal </button>
          </PopoverPortals>
        </div>
        <Text />
      </div>
    </>
  )
}

export default App
