import Tag from './ui/Tag.jsx'
import Reveal from './ui/Reveal.jsx'
import styles from './Timeline.module.css'

export default function Timeline({ items }) {
  return (
    <ol className={styles.timeline}>
      {items.map((it, i) => (
        <Reveal as="li" key={`${it.title}-${i}`} delay={i * 0.05} className={styles.item}>
          <span className={styles.dot} data-highlight={!!it.highlight} aria-hidden="true" />
          <div className={styles.content}>
            <span className={styles.time}>{it.time}</span>
            <h3 className={styles.title}>{it.title}</h3>
            {it.subtitle && <p className={styles.subtitle}>{it.subtitle}</p>}
            {it.text && <p className={styles.text}>{it.text}</p>}
            {it.tags && (
              <div className={styles.tags}>
                {it.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
