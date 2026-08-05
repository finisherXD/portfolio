import { useEffect, useState } from 'react'

/**
 * True when the primary input can't hover — phones, tablets, most touch
 * screens. Anything gated behind `:hover` is unreachable on these devices,
 * so components use this to offer a tap equivalent instead.
 */
export default function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: none)')
    const update = () => setCoarse(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return coarse
}
