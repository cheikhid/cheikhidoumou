import Container from '../components/ui/Container.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import ScrollReelTestimonials from '../components/ScrollReelTestimonials.jsx'
import { testimonials } from '../data/testimonials.js'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  if (!testimonials?.length) return null

  return (
    <section className="section">
      <Container>
        <SectionHeader
          number="05"
          title="Ils m'ont fait confiance"
          subtitle="Retours de clients et de collègues sur des projets backend livrés."
        />
        <Reveal>
          <div className={styles.wrap}>
            <ScrollReelTestimonials testimonials={testimonials} />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
