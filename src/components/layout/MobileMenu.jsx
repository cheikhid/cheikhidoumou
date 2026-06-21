import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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
        const focusable = panelRef.current?.querySelectorAll(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
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
    const t = setTimeout(() => panelRef.current?.querySelector('button')?.focus(), 80)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  const dur = reduce ? 0 : 0.38

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Fond obscurcissant — clic ferme le menu */}
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur * 0.7 }}
          />

          {/* Panneau latéral */}
          <motion.aside
            id="mobile-menu"
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* En-tête du panneau */}
            <div className={styles.head}>
              <div className={styles.brand}>
                <span className={styles.mark}>CI</span>
                <span className={styles.brandLabel}>Navigation</span>
              </div>
              <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="Fermer le menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Liens de navigation */}
            <nav className={styles.links} aria-label="Navigation mobile">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={reduce ? {} : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ''}`
                    }
                  >
                    <span className={styles.linkNum}>0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Pied : toggle thème + réseaux */}
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
                    className={styles.socialLink}
                  >
                    <Icon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
