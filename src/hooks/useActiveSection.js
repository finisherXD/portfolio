import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in the viewport so the navbar can
 * highlight it. The `rootMargin` biases detection toward the upper third
 * of the screen, which matches where the eye actually is while scrolling.
 */
export default function useActiveSection(ids, rootMargin = '-45% 0px -50% 0px') {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return active
}
