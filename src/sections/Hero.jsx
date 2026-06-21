import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Counter from '../components/ui/Counter.jsx'
import Icon from '../components/ui/Icon.jsx'
import Magnetic from '../components/ui/Magnetic.jsx'
import { useTypewriter } from '../hooks/useTypewriter.js'
import { profile } from '../data/profile.js'
import styles from './Hero.module.css'

export default function Hero() {
  const role = useTypewriter(profile.roles)
  const reduce = useReducedMotion()
  const heroRef = useRef(null)
  const city = profile.location.split(',')[0]

  // Glow réactif au curseur : met à jour --mx / --my sur la section.
  const onMove = (e) => {
    if (reduce || !heroRef.current) return
    const r = heroRef.current.getBoundingClientRect()
    heroRef.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    heroRef.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
        }

  return (
    <section className={styles.hero} ref={heroRef} onMouseMove={onMove}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <motion.p className={styles.kicker} {...fade(0)}>
            <span className={styles.kickerDot} aria-hidden="true" />
            Backend Engineer&nbsp;·&nbsp;{city}
          </motion.p>

          <motion.h1 className={styles.name} {...fade(0.08)}>
            <span className={styles.nameLine}>Cheikh</span>
            <span className={`${styles.nameLine} text-gradient`}>Idoumou</span>
          </motion.h1>

          <motion.div className={styles.role} {...fade(0.16)}>
            <span className={styles.rolePrefix} aria-hidden="true">
              &gt;
            </span>
            <span className={styles.roleText} aria-live="polite">
              {role}
            </span>
            <span className={styles.caret} aria-hidden="true" />
          </motion.div>

          <motion.p className={styles.bio} {...fade(0.24)}>
            {profile.bio}
          </motion.p>

          <motion.div className={styles.cta} {...fade(0.32)}>
            <Magnetic>
              <Button href={profile.cv} download variant="primary">
                <Icon name="download" /> Télécharger le CV
              </Button>
            </Magnetic>
            <Magnetic>
              <Button to="/projects" variant="secondary">
                Voir les projets <Icon name="arrowRight" />
              </Button>
            </Magnetic>
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
                initial: { opacity: 0, scale: 0.94 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
              })}
        >
          <div className={styles.portrait}>
            <img
              src={profile.photo}
              alt={`${profile.fullName}, ${profile.title}`}
              width="360"
              height="450"
              className={styles.photo}
              loading="eager"
              decoding="async"
            />
            <span className={styles.cornerTL} aria-hidden="true" />
            <span className={styles.cornerBR} aria-hidden="true" />
          </div>
          <div className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" /> Disponible
          </div>
        </motion.div>
      </div>
    </section>
  )
}
