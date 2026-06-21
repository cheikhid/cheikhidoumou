import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from '../../theme/ThemeToggle.jsx'
import MobileMenu from './MobileMenu.jsx'
import styles from './Navbar.module.css'

export const navLinks = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/projects', label: 'Projets' },
  { to: '/about', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="Accueil — Cheikh Idoumou">
          <span className={styles.mark}>CI</span>
          <span className={styles.brandText}>
            Cheikh<strong>Idoumou</strong>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navigation principale">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={navLinks} />
    </header>
  )
}
