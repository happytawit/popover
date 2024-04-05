import React, { useEffect, useRef, useState } from 'react'
import { PropsWithChildren } from 'react'
import './Popover.css'

type PopoverProps = {
  content: React.ReactNode
  title: string
}

export default function Popover({
  content,
  title,
  children,
}: PropsWithChildren<PopoverProps>) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const childRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!childRef.current) return

    const mouseEnterHandler = () => {
      setIsVisible(true)
    }

    const mouseLeaveHandler = () => {
      setIsVisible(false)
    }

    childRef.current.addEventListener('mouseenter', mouseEnterHandler)
    childRef.current.addEventListener('mouseleave', mouseLeaveHandler)

    return () => {
      if (!childRef.current) return

      childRef.current.removeEventListener('mouseenter', mouseEnterHandler)
      childRef.current.removeEventListener('mouseleave', mouseLeaveHandler)
    }
  }, [])

  return (
    <div className="popoverWrapper">
      {isVisible && (
        <div className="popover">
          <div className="popover__title">{title}</div>
          <div className="popover__content">{content}</div>
        </div>
      )}
      <div className="popoverChild" ref={childRef}>
        {children}
      </div>
    </div>
  )
}
