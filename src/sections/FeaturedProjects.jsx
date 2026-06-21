import Container from '../components/ui/Container.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import { featuredProjects } from '../data/projects.js'
import styles from './FeaturedProjects.module.css'

export default function FeaturedProjects() {
  return (
    <section className="section section--alt">
      <Container>
        <SectionHeader
          number="04"
          title="Projets en vedette"
          subtitle="Une sélection de réalisations backend, du modèle de données au déploiement."
        />
        <div className={styles.grid}>
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <div className={styles.cta}>
          <Button to="/projects" variant="secondary">
            Tous les projets <Icon name="arrowRight" />
          </Button>
        </div>
      </Container>
    </section>
  )
}
