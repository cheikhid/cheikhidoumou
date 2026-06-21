import { Link } from 'react-router-dom'
import Tag from './ui/Tag.jsx'
import Icon from './ui/Icon.jsx'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }) {
  const to = `/projects/${project.slug}`
  return (
    <article className={styles.card}>
      <Link to={to} className={styles.media} tabIndex={-1} aria-hidden="true">
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          width="400"
          height="240"
          className={styles.img}
        />
        <span className={styles.cat}>{project.categoryLabel}</span>
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={to}>{project.title}</Link>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.tags}>
          {project.stack.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <Link to={to} className={styles.more}>
          Étude de cas <Icon name="arrowRight" />
        </Link>
      </div>
    </article>
  )
}
