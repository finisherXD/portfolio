import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const BASE =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

const STYLES = {
  primary:
    'bg-white text-ink-900 shadow-[0_18px_50px_-18px_rgba(129,140,248,0.9)] hover:bg-brand-300',
  secondary: 'glass text-white hover:border-white/25 hover:bg-white/[0.07]',
  ghost: 'text-slate-300 hover:text-white',
}

/**
 * A button (or link, if `href` is passed) that leans toward the cursor.
 * `strength` controls how far it travels — the inner content moves a little
 * further than the shell, which is what sells the effect.
 */
export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  strength = 0.35,
  className = '',
  ...props
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 260, damping: 18, mass: 0.6 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  const innerX = useTransform(springX, (v) => v * 0.4)
  const innerY = useTransform(springY, (v) => v * 0.4)

  function handleMouseMove(event) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onBlur={reset}
      whileTap={{ scale: 0.96 }}
      className={`${BASE} ${STYLES[variant]} ${className}`}
      {...props}
    >
      <motion.span
        style={{ x: innerX, y: innerY }}
        className="pointer-events-none relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </Component>
  )
}
