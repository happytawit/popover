import { useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }: React.PropsWithChildren) => {
  const portal2 = document.getElementById('portal-root')

  // useEffect(() => {
  //   if (!portal2) return

  //   // const div = document.createElement('div')
  //   // portal2.appendChild(div)

  //   return () => {
  //     div.remove()
  //   }
  // }, [])

  if (!portal2) return null

  return createPortal(children, portal2)

  // const portalRoot = document.createElement('div')
  // //portalRoot.id = 'portal-root'

  // useEffect(() => {
  //   // if (!portal2) return

  //   // const div = document.createElement('div')
  //   // portal2.appendChild(div)
  //   document.body.appendChild(portalRoot)

  //   return () => {
  //     portalRoot.remove()
  //   }
  // }, [])

  // if (!portalRoot) return null

  // return createPortal(children, portalRoot)
}

export default Portal
