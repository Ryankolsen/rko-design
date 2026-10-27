import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const query = () => (typeof window.matchMedia === 'function' ? window.matchMedia(QUERY) : null)

/** Whether the visitor has asked the OS to reduce motion, kept live as the setting changes. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => query()?.matches ?? false)

  useEffect(() => {
    const mql = query()
    if (!mql) return
    const onChange = (e: { matches: boolean }) => setReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
