import Container from './Container.jsx'
import styles from './PageHeader.module.css'

export default function PageHeader({ title, lead, eyebrow }) {
  return (
    <header className={styles.header}>
      <div className={styles.glow} aria-hidden="true" />
      <Container>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </Container>
    </header>
  )
}
