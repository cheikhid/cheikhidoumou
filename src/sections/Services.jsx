import Container from '../components/ui/Container.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Icon from '../components/ui/Icon.jsx'
import Tag from '../components/ui/Tag.jsx'
import { services } from '../data/services.js'
import styles from './Services.module.css'

export default function Services() {
  return (
    <section className="section">
      <Container>
        <SectionHeader
          number="03"
          title="Services"
          subtitle="Ce que je peux concevoir et livrer pour vos projets."
        />
        <div className={styles.grid}>
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className={styles.card}>
              <div className={styles.icon}>
                <Icon name={s.icon} />
              </div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.description}</p>
              <div className={styles.tags}>
                {s.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
