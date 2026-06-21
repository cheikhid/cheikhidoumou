import Seo from '../components/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <>
      <Seo title="Page introuvable" path="/404" />
      <section className="section">
        <Container>
          <div className={styles.wrap}>
            <span className={styles.code}>404</span>
            <h1 className={styles.title}>Page introuvable</h1>
            <p className={styles.text}>
              La page que vous cherchez n'existe pas ou a été déplacée.
            </p>
            <Button to="/" variant="primary">
              <Icon name="arrowRight" /> Retour à l'accueil
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
