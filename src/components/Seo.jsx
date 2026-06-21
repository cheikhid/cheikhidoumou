import { Helmet } from 'react-helmet-async'

const SITE = 'https://cheikhidoumou.dev'

export default function Seo({
  title,
  description = 'Portfolio de Cheikh Idoumou, ingénieur logiciel backend (Python, Django, Spring Boot, .NET, DevOps) basé à Nouakchott.',
  path = '/',
  image = '/img/chkid.jpeg',
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} — Cheikh Idoumou`
    : 'Cheikh Idoumou | Développeur Backend — Python, Django, Spring Boot & .NET'
  const url = SITE + path

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE + image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
