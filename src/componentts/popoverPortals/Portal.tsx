import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const MyPortal = ({ children }: React.PropsWithChildren) => {
  const portalRoot = document.getElementById('portal-root')
  const div = document.createElement('div')

  useEffect(() => {
    if (!portalRoot) return

    portalRoot.appendChild(div)

    return () => {
      portalRoot.removeChild(div)
    }
  }, [])

  return createPortal(children, div)
}

export default MyPortal
