import Seo from '../components/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import Tag from '../components/ui/Tag.jsx'
import Timeline from '../components/Timeline.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { profile } from '../data/profile.js'
import { aboutIntro, values } from '../data/about.js'
import { skillGroups } from '../data/skills.js'
import { education } from '../data/education.js'
import { experience } from '../data/experience.js'
import styles from './About.module.css'

const eduItems = education.map((e) => ({
  time: e.year,
  title: e.title,
  subtitle: e.org,
  tags: e.tags,
  highlight: e.highlight,
}))

const expItems = experience.map((x) => ({
  time: x.period,
  title: x.role,
  subtitle: x.org,
  text: x.description,
  tags: x.tags,
}))

export default function About() {
  return (
    <>
      <Seo
        title="À propos"
        path="/about"
        description="Parcours, compétences et approche de Cheikh Idoumou, ingénieur logiciel backend à Nouakchott."
      />
      <PageHeader
        eyebrow="À propos"
        title="Ingénieur backend, par passion"
        lead="Mon parcours, mes compétences et ma façon de concevoir des systèmes."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <Container>
          <div className={styles.intro}>
            <div className={styles.introText}>
              {aboutIntro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <ul className={styles.values}>
                {values.map((v) => (
                  <li key={v}>
                    <Icon name="check" className={styles.check} /> {v}
                  </li>
                ))}
              </ul>
              <div className={styles.actions}>
                <Button href={profile.cv} download variant="primary">
                  <Icon name="download" /> Télécharger le CV
                </Button>
                <Button to="/contact" variant="secondary">
                  Me contacter <Icon name="arrowRight" />
                </Button>
              </div>
            </div>
            <Reveal className={styles.photoWrap}>
              <img
                src={profile.photo}
                alt={`${profile.fullName}, ${profile.title}`}
                width="320"
                height="380"
                className={styles.photo}
                loading="lazy"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <SectionHeader title="Compétences détaillées" />
          <div className={styles.skillGroups}>
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.05} className={styles.group}>
                <h3>{g.title}</h3>
                <div className={styles.groupTags}>
                  {g.items.map((it) => (
                    <Tag key={it}>{it}</Tag>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className={styles.timelines}>
            <div>
              <SectionHeader title="Formation" />
              <Timeline items={eduItems} />
            </div>
            <div>
              <SectionHeader title="Expérience" />
              <Timeline items={expItems} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
