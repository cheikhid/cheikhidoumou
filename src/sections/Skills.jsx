import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Icon from '../components/ui/Icon.jsx'
import { skills } from '../data/skills.js'
import styles from './Skills.module.css'

export default function Skills() {
  const reduce = useReducedMotion()

  return (
    <section className="section">
      <Container>
        <SectionHeader
          number="02"
          title="Compétences"
          subtitle="Les technologies que j'utilise au quotidien côté backend et DevOps."
        />
        <div className={styles.grid}>
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05} className={styles.card}>
              <div className={styles.icon}>
                <Icon name={s.icon} />
              </div>
              <h3 className={styles.name}>{s.name}</h3>
              <div
                className={styles.bar}
                role="progressbar"
                aria-valuenow={s.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Maîtrise de ${s.name}`}
              >
                <motion.span
                  className={styles.fill}
                  initial={{ scaleX: reduce ? s.level / 100 : 0 }}
                  whileInView={{ scaleX: s.level / 100 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
