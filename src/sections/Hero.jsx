import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Counter from '../components/ui/Counter.jsx'
import Icon from '../components/ui/Icon.jsx'
import { useTypewriter } from '../hooks/useTypewriter.js'
import { profile } from '../data/profile.js'
import styles from './Hero.module.css'

export default function Hero() {
  const role = useTypewriter(profile.roles)
  const reduce = useReducedMotion()

  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
        }

  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <motion.p className={styles.greeting} {...fade(0)}>
            Bonjour, je suis
          </motion.p>
          <motion.h1 className={styles.name} {...fade(0.08)}>
            Cheikh <span className="text-gradient">Idoumou</span>
          </motion.h1>
          <motion.div className={styles.role} {...fade(0.16)}>
            <span className={styles.rolePrefix}>Je suis&nbsp;</span>
            <span className={styles.roleText} aria-live="polite">
              {role}
            </span>
            <span className={styles.caret} aria-hidden="true" />
          </motion.div>
          <motion.p className={styles.bio} {...fade(0.24)}>
            {profile.bio}
          </motion.p>
          <motion.div className={styles.cta} {...fade(0.32)}>
            <Button href={profile.cv} download variant="primary">
              <Icon name="download" /> Télécharger le CV
            </Button>
            <Button to="/projects" variant="secondary">
              Voir les projets <Icon name="arrowRight" />
            </Button>
          </motion.div>
          <motion.ul className={styles.stats} {...fade(0.4)}>
            {profile.stats.map((s) => (
              <li key={s.label}>
                <span className={styles.statValue}>
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className={styles.statLabel}>{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className={styles.visual}
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.92 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
              })}
        >
          <div className={styles.photoRing}>
            <img
              src={profile.photo}
              alt={`${profile.fullName}, ${profile.title}`}
              width="320"
              height="320"
              className={styles.photo}
              loading="eager"
              decoding="async"
            />
          </div>
          <div className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" /> Disponible
          </div>
        </motion.div>
      </div>
    </section>
  )
}
