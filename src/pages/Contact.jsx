import Seo from '../components/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Icon from '../components/ui/Icon.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { profile } from '../data/profile.js'
import { social } from '../data/social.js'
import styles from './Contact.module.css'

const methods = [
  { icon: 'phone', label: 'Téléphone', value: profile.phoneDisplay, href: `tel:${profile.phoneHref}` },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: '+222 42 42 51 43',
    href: 'https://wa.me/+22242425143',
    external: true,
  },
  { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
]

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10160.15784353476!2d-15.988598513691015!3d18.130614953056202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2s!4v1708409025839!5m2!1sfr!2s'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Contactez Cheikh Idoumou — téléphone, WhatsApp, email et réseaux. Basé à Nouakchott, Mauritanie."
      />
      <PageHeader
        eyebrow="Contact"
        title="Travaillons ensemble"
        lead="Une question, un projet backend ou une opportunité ? Écrivez-moi, je réponds rapidement."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.info}>
              {methods.map((m, i) => (
                <Reveal as="a" key={m.label} delay={i * 0.05} className={styles.method}
                  {...{ href: m.href }}
                  target={m.external ? '_blank' : undefined}
                  rel={m.external ? 'noopener noreferrer' : undefined}
                >
                  <span className={styles.methodIcon}>
                    <Icon name={m.icon} />
                  </span>
                  <span>
                    <span className={styles.methodLabel}>{m.label}</span>
                    <span className={styles.methodValue}>{m.value}</span>
                  </span>
                </Reveal>
              ))}

              <div className={styles.location}>
                <Icon name="pin" /> {profile.location}
              </div>

              <div className={styles.social}>
                {social.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    aria-label={s.label}
                    target={s.external ? '_blank' : undefined}
                    rel={s.external ? 'noopener noreferrer' : undefined}
                  >
                    <Icon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                className={styles.map}
                src={MAP_SRC}
                title="Localisation à Nouakchott, Mauritanie"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
