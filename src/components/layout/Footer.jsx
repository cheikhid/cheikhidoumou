import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { social } from '../../data/social.js'
import { profile } from '../../data/profile.js'
import { navLinks } from './Navbar.jsx'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.brand}>
            <span className={styles.mark}>CI</span> Cheikh Idoumou
          </Link>
          <p className={styles.tagline}>
            {profile.title} · {profile.location}
          </p>
        </div>

        <nav className={styles.links} aria-label="Liens du pied de page">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
          <a href={profile.cv} download>
            CV
          </a>
        </nav>

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

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} <strong>{profile.fullName}</strong>
        </p>
        <p className={styles.made}>
          Conçu avec <Icon name="heart" className={styles.heart} /> à Nouakchott
        </p>
      </div>
    </footer>
  )
}
