import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export default function Counter({ value, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (reduce) {
      setN(value)
      return
    }
    if (!inView) return
    let raf
    let start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      setN(Math.floor(p * value))
      if (p < 1) raf = requestAnimationFrame(step)
      else setN(value)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}
