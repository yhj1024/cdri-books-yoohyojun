import { useEffect, type RefObject } from 'react'

type Handler = (event: MouseEvent | TouchEvent) => void

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  enabled = true,
): void => {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, enabled])
}
