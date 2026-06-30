import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Enveloppe un élément interactif d'un effet « magnétique » : il suit légèrement
 * le curseur puis revient en place (ressort). Désactivé si prefers-reduced-motion.
 */
export default function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  )
}
