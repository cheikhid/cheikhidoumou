import styles from './SectionHeader.module.css'

export default function SectionHeader({ number, title, subtitle, align = 'left' }) {
  return (
    <header className={styles.header} data-align={align}>
      <div className={styles.top}>
        {number && (
          <span className={styles.number} aria-hidden="true">
            {number}
          </span>
        )}
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.line} aria-hidden="true" />
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  )
}
