import { useParams, Link, Navigate } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import Tag from '../components/ui/Tag.jsx'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'
import Gallery from '../components/Gallery.jsx'
import { getProjectBySlug, projects } from '../data/projects.js'
import { profile } from '../data/profile.js'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/projects" replace />

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    image: `https://cheikhidoumou.dev${project.cover}`,
    keywords: project.stack.join(', '),
    author: { '@type': 'Person', name: profile.fullName },
  }

  return (
    <>
      <Seo
        title={project.title}
        path={`/projects/${project.slug}`}
        description={project.summary}
        image={project.cover}
        jsonLd={jsonLd}
      />

      <article className="section">
        <Container>
          <Link to="/projects" className={styles.back}>
            <Icon name="arrowRight" /> Retour aux projets
          </Link>

          <header className={styles.head}>
            <span className={styles.eyebrow}>
              {project.categoryLabel} · {project.year}
            </span>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.lead}>{project.description}</p>
          </header>

          <div className={styles.layout}>
            <div className={styles.main}>
              <h2 className={styles.h2}>Points clés</h2>
              <ul className={styles.highlights}>
                {project.highlights.map((h) => (
                  <li key={h}>
                    <Icon name="check" className={styles.check} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className={styles.aside}>
              <div className={styles.metaCard}>
                <h2 className={styles.h3}>Mon rôle</h2>
                <p>{project.role}</p>
              </div>
              <div className={styles.metaCard}>
                <h2 className={styles.h3}>Stack technique</h2>
                <div className={styles.tags}>
                  {project.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <h2 className={styles.h2}>Aperçus</h2>
          <Gallery images={project.gallery} title={project.title} />

          <div className={styles.foot}>
            <Button to={`/projects/${next.slug}`} variant="secondary">
              Projet suivant : {next.title} <Icon name="arrowRight" />
            </Button>
            <Button href={`mailto:${profile.email}`} variant="primary">
              <Icon name="mail" /> Discuter d'un projet
            </Button>
          </div>
        </Container>
      </article>
    </>
  )
}
