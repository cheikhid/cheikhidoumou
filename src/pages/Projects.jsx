import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { projects, projectCategories } from '../data/projects.js'
import styles from './Projects.module.css'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <Seo
        title="Projets"
        path="/projects"
        description="Réalisations backend de Cheikh Idoumou : systèmes de gestion, APIs REST et microservices (Django, Spring Boot)."
      />
      <PageHeader
        eyebrow="Réalisations"
        title="Projets"
        lead="Une sélection de systèmes backend que j'ai conçus et développés. Cliquez pour ouvrir l'étude de cas."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <Container>
          <div className={styles.filters} role="group" aria-label="Filtrer les projets">
            {projectCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${styles.filterBtn} ${filter === c.id ? styles.active : ''}`}
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
