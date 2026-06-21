import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ThemeToggle from '../../theme/ThemeToggle.jsx'
import Icon from '../ui/Icon.jsx'
import { social } from '../../data/social.js'
import styles from './MobileMenu.module.css'

export default function MobileMenu({ open, onClose, links }) {
  const panelRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const f = panelRef.current?.querySelectorAll('a[href], button')
        if (!f || f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => panelRef.current?.querySelector('a[href], button')?.focus(), 60)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  const dur = reduce ? 0 : 0.4

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
          />
          <motion.aside
            id="mobile-menu"
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ x: reduce ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : '100%' }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.head}>
              <span className={styles.title}>Navigation</span>
              <button className={styles.close} onClick={onClose} aria-label="Fermer le menu">
                ×
              </button>
            </div>

            <nav className={styles.links} aria-label="Navigation mobile">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={onClose}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className={styles.footer}>
              <ThemeToggle />
              <div className={styles.social}>
                {social.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    aria-label={s.label}
                    target={s.external ? '_blank' : undefined}
                    rel={s.external ? 'noopener noreferrer' : undefined}
                  >
                    <Icon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
