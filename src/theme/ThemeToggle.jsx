import { useTheme } from './useTheme.js'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className}`}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      <span className={styles.track}>
        <span className={styles.thumb} data-dark={isDark}>
          <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
            {isDark ? (
              /* Lune */
              <path
                fill="currentColor"
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              />
            ) : (
              /* Soleil */
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
              </g>
            )}
          </svg>
        </span>
      </span>
    </button>
  )
}
