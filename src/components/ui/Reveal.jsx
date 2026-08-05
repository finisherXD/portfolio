import { motion } from 'framer-motion'

const DIRECTIONS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered entrance. Wraps children rather than requiring every
 * component to wire up its own `whileInView`.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  amount = 0.25,
  once = true,
  className = '',
  ...props
}) {
  const offset = DIRECTIONS[direction] ?? DIRECTIONS.up

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Shared variants for staggered lists — parent gets `staggerContainer`. */
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
