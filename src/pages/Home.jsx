import Seo from '../components/Seo.jsx'
import Hero from '../sections/Hero.jsx'
import AboutTeaser from '../sections/AboutTeaser.jsx'
import Skills from '../sections/Skills.jsx'
import Services from '../sections/Services.jsx'
import FeaturedProjects from '../sections/FeaturedProjects.jsx'
import ContactSection from '../sections/ContactSection.jsx'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cheikh Idoumou',
  jobTitle: 'Ingénieur logiciel — Backend',
  url: 'https://cheikhidoumou.dev',
  image: 'https://cheikhidoumou.dev/img/chkid.jpeg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nouakchott',
    addressCountry: 'MR',
  },
  email: 'mailto:cheikhidoumou65@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/cheikh-idoumou-96a174269',
    'https://facebook.com/cheikh.id',
  ],
  knowsAbout: ['Python', 'Django', 'Spring Boot', 'Java', '.NET', 'Docker', 'Kubernetes', 'DevOps'],
}

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={personJsonLd} />
      <Hero />
      <AboutTeaser />
      <Skills />
      <Services />
      <FeaturedProjects />
      <ContactSection />
    </>
  )
}
