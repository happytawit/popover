import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  UIEvent,
} from 'react'
//import ReactDOM, { createPortal } from 'react-dom'
import { Transition, CSSTransition } from 'react-transition-group'
import Portal from './Portal'
import './popoverPortals.css'

function throttle(callback: any, delay: number = 250) {
  let isPaused = false

  return (...args: any) => {
    if (isPaused) return

    callback(...args)
    isPaused = true

    setTimeout(() => {
      isPaused = false
    }, delay)
  }
}

type PopoverPostion = {
  left: number
  top: number
}

type popoverPlacement =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'topLeft'
  | 'topRight'

type Props = {
  title: string
  content: React.ReactNode
  offset?: number
  placement?: popoverPlacement
  width?: number
  children: React.ReactElement
}

export default function PopoverPortals({
  title,
  content,
  offset = 0,
  placement = 'top',
  width,
  children,
}: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [popoverPosition, setPopoverPosition] = useState<PopoverPostion>()

  const childRef = useRef<HTMLElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  console.log('popoverRef.current', popoverRef.current)

  useEffect(() => {
    setHandlers()
  }, [])

  function calculateInitialPopoverPosition(
    childRect: DOMRect,
    popOverRect: DOMRect,
  ) {
    // положение элемента к которому привязан popover с учетом прокрутки страницы
    let left = childRect.x + window.scrollX
    let top = childRect.y + window.scrollY

    switch (placement) {
      case 'topLeft':
        top = top - popOverRect.height - offset
        break

      case 'top':
        top = top - popOverRect.height - offset
        left = left - popOverRect.width / 2 + childRect.width / 2
        break

      case 'topRight':
        top = top - popOverRect.height - offset
        left = left - (popOverRect.width - childRect.width)
        break

      case 'bottomLeft':
        top = top + childRect.height + offset
        break

      case 'bottom':
        top = top + childRect.height + offset
        left = left - popOverRect.width / 2 + childRect.width / 2
        break

      case 'bottomRight':
        top = top + childRect.height + offset
        left = left - (popOverRect.width - childRect.width)
        break

      default:
        break
    }
    console.log('left, top in initial', left, top)
    return { left, top }
  }

  function calculatePopoverPostition(
    currentPosition: PopoverPostion | undefined,
  ) {
    if (!childRef.current || !popoverRef.current) return

    const childRect = childRef.current.getBoundingClientRect()
    const popOverRect = popoverRef.current.getBoundingClientRect()

    console.log('popOverRect', popOverRect)

    let { left, top } =
      currentPosition ?? calculateInitialPopoverPosition(childRect, popOverRect)

    // если приближаемся к верхней границе viewport, то смещаем popover вниз
    if (popOverRect.y < 10) {
      top = top + popOverRect.height + childRect.height + 2 * offset
    }

    // если приближаемся к нижней границе viewport, то смещаем popover вверх
    if (popOverRect.y + popOverRect.height > window.innerHeight - 10) {
      top = top - popOverRect.height - childRect.height - 2 * offset
    }

    return { left, top }
  }

  function setHandlers() {
    if (!childRef.current) return

    const childRefCurrent = childRef.current

    const mouseleaveHandler = () => {} //setIsVisible(false)
    const mouseenterHandler = () => {
      setIsVisible(true)
      setTimeout(
        () =>
          setPopoverPosition((prevState) =>
            calculatePopoverPostition(prevState),
          ),
        0,
      )
    }

    const onScrollHandler = throttle(
      () =>
        setPopoverPosition((prevState) => calculatePopoverPostition(prevState)),
      1000,
    )

    childRefCurrent.addEventListener('mouseenter', mouseenterHandler)
    childRefCurrent.addEventListener('mouseleave', mouseleaveHandler)
    // window.addEventListener('scroll', onScrollHandler)

    return () => {
      childRefCurrent.removeEventListener('mouseenter', mouseenterHandler)
      childRefCurrent.removeEventListener('mouseleave', mouseleaveHandler)
      // window.removeEventListener('scroll', onScrollHandler)
    }
  }

  return (
    <>
      {isVisible && (
        <Portal>
          <div
            className="popoverPortals"
            ref={popoverRef}
            style={{
              ...popoverPosition,
              width: width,
            }}
          >
            <div className="popoverPortals__title">{title}</div>
            <div className="popoverPortals__content">{content}</div>
          </div>
        </Portal>
      )}

      {/* Расположение popover считаем отностильно положения children 
      Для того, чтобы посчитать расположение элемента необходимо на него повесить ref
      Для этого используется метод React.cloneElement  */}
      {React.cloneElement(children, {
        ...children?.props,
        ref: childRef,
      })}
    </>
  )
}

{
  /* {isVisible && (
        <Portal>
          <div
            className="popoverPortals"
            // ref={popoverRef}
            style={{
              ...popoverPosition,
            }}
          >
            <div className="popoverPortals__title">{title}</div>
            <div className="popoverPortals__content">{content}</div>
          </div>
        </Portal>
      )} */
}
{
  /* <Transition in={isVisible} timeout={duration}>
        {(state) => (
          // <Portal>
          <div
            className="popoverPortals"
            ref={popoverRef}
            style={{
              ...popoverPosition,
              ...defaultStyle,
              ...transitionStyles[state],
              width: width ? width : 200,
            }}
          >
            <div className="popoverPortals__title">{title}</div>
            <div className="popoverPortals__content">{content}</div>
          </div>
          // </Portal>
        )}
      </Transition> */
}
