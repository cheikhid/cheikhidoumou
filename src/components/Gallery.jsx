import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Gallery.module.css'

export default function Gallery({ images, title }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  if (!images || images.length === 0) return null

  return (
    <>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={styles.item}
            onClick={() => setActive(i)}
            aria-label={`Agrandir la capture ${i + 1}`}
          >
            <img src={src} alt={`${title} — capture ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className={styles.overlay}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image agrandie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className={styles.close} onClick={() => setActive(null)} aria-label="Fermer">
              ×
            </button>
            <img
              className={styles.full}
              src={images[active]}
              alt={`${title} — capture ${active + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
