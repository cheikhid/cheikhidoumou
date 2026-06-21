import Container from '../components/ui/Container.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import { aboutHighlights } from '../data/about.js'
import styles from './AboutTeaser.module.css'

export default function AboutTeaser() {
  return (
    <section className="section">
      <Container>
        <SectionHeader
          number="01"
          title="À propos"
          subtitle="Ingénieur backend orienté qualité, performance et architecture."
        />
        <div className={styles.grid}>
          {aboutHighlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.06} className={styles.card}>
              <div className={styles.icon}>
                <Icon name={h.icon} />
              </div>
              <h3 className={styles.title}>{h.title}</h3>
              <p className={styles.text}>{h.text}</p>
              <span className={styles.badge}>{h.badge}</span>
            </Reveal>
          ))}
        </div>
        <div className={styles.cta}>
          <Button to="/about" variant="secondary">
            En savoir plus <Icon name="arrowRight" />
          </Button>
        </div>
      </Container>
    </section>
  )
}
