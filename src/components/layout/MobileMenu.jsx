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

  // Scroll lock + piège clavier
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Tab') {
        const items = panelRef.current?.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')
        if (!items || items.length === 0) return
        const first = items[0], last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => panelRef.current?.querySelector('button')?.focus(), 80)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  const dur = reduce ? 0 : 0.35

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Fond sombre — clic ferme le menu */}
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur * 0.6 }}
          />

          {/* Panneau */}
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
            {/* En-tête */}
            <div className={styles.head}>
              <div className={styles.brand}>
                <span className={styles.mark}>CI</span>
                <span className={styles.brandLabel}>Menu</span>
              </div>
              <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="Fermer le menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Liens — NavLink directement, sans wrapper motion */}
            <nav className={styles.links} aria-label="Navigation mobile">
              {links.map((l, i) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  <span className={styles.linkNum}>0{i + 1}</span>
                  <span>{l.label}</span>
                </NavLink>
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
