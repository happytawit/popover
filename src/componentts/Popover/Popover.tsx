import React, { ReactElement, useEffect, useRef, useState } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import './Popover.css'

type Props = {
  title: string
  content: React.ReactNode
  children: React.ReactElement
}

type PopoverPostion = {
  left: number
  top: number
}

export default function Popover({ title, content, children }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [popoverPosition, setPopoverPosition] = useState<PopoverPostion>()

  const childRef = useRef<HTMLElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMouseHandlers()
  }, [])

  useEffect(() => {
    setPopoverPositionHandler()
  }, [])

  function setPopoverPositionHandler() {
    if (!childRef.current) return

    const childRect = childRef.current.getBoundingClientRect()

    setPopoverPosition({
      left: childRect.x + childRect.width / 2,
      top: childRect.y,
    })
  }

  function setMouseHandlers() {
    if (!childRef.current) return

    const childRefCurrent = childRef.current

    const mouseenterHandler = () => setIsVisible(true)
    const mouseleaveHandler = () => setIsVisible(false)

    childRefCurrent.addEventListener('mouseenter', mouseenterHandler)
    childRefCurrent.addEventListener('mouseleave', mouseleaveHandler)

    return () => {
      childRefCurrent.removeEventListener('mouseenter', mouseenterHandler)
      childRefCurrent.removeEventListener('mouseleave', mouseleaveHandler)
    }
  }

  return (
    <>
      {isVisible && (
        <div
          className="popover"
          ref={popoverRef}
          style={{ ...popoverPosition }}
        >
          <div className="popover__title">{title}</div>
          <div className="popover__content">{content}</div>
        </div>
      )}

      {/* Расположение popover считаем отностильно положения children 
      Для того, чтобы посчитать расположение элемента необходимо на него повесить ref
      Для этого используется метод React.cloneElement  */}
      {React.cloneElement(children, {
        ...children?.props,
        ref: childRef,
        // style: { position: 'relative' },
      })}
    </>
  )
}
