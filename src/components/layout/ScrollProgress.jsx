import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let max = 0
    let ticking = false

    const computeMax = () => {
      max = document.documentElement.scrollHeight - window.innerHeight
    }
    const render = () => {
      ticking = false
      const pct = max > 0 ? window.scrollY / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(render)
      }
    }
    const onResize = () => {
      computeMax()
      render()
    }

    computeMax()
    render()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // Recalcule la hauteur quand le contenu change (navigation SPA, images)
    const ro = new ResizeObserver(onResize)
    ro.observe(document.documentElement)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [])

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  )
}
