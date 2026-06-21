import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import { profile } from '../data/profile.js'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  return (
    <section className="section">
      <Container>
        <Reveal className={styles.band}>
          <div className={styles.glow} aria-hidden="true" />
          <h2 className={styles.title}>Un projet backend en tête&nbsp;?</h2>
          <p className={styles.text}>
            Discutons de votre besoin — API REST, microservices ou application de gestion.
            Je réponds rapidement.
          </p>
          <div className={styles.cta}>
            <Button href={`mailto:${profile.email}`} variant="primary">
              <Icon name="mail" /> M'écrire
            </Button>
            <Button to="/contact" variant="secondary">
              Page contact <Icon name="arrowRight" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
