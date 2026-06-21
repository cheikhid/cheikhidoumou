# Portfolio — Cheikh Idoumou (v2)

Refonte du portfolio en **React + Vite**, multi-pages, avec **thème jour/nuit** (sombre par défaut)
et une identité « or & sombre » raffinée.

## Démarrer

```bash
npm install
npm run dev        # serveur de développement (http://localhost:5173)
npm run build      # build de production → dist/
npm run preview    # prévisualise le build
```

## Stack

- **Vite + React 18**, **react-router-dom** (routage multi-pages)
- **framer-motion** (animations, respecte `prefers-reduced-motion`)
- **react-helmet-async** (SEO par page) + JSON-LD
- **react-icons** (icônes), **@fontsource-variable** (Inter + Space Grotesk auto-hébergées)
- **CSS Modules** + design tokens (`src/styles/tokens.css`) pour les deux thèmes

## Structure

```
src/
  theme/        ThemeProvider, useTheme, ThemeToggle   (thème jour/nuit, mémorisé)
  styles/       tokens.css (2 thèmes), globals.css
  components/   layout/ (Navbar, Footer, ScrollProgress, MobileMenu, Layout, RouteFocus)
                ui/ (Button, Card, Tag, SectionHeader, Container, Reveal, Counter, Icon, PageHeader)
                ProjectCard, Gallery, Timeline, Seo
  sections/     Hero, AboutTeaser, Skills, Services, FeaturedProjects, ContactSection
  pages/        Home, Projects, ProjectDetail, About, Contact, NotFound
  data/         profile, projects, skills, services, education, experience, about, social
  hooks/        useMediaQuery, useTypewriter
```

Le contenu est **piloté par les données** (`src/data/*`) : ajouter un projet = une entrée dans
`projects.js`.

## Thème jour/nuit

- Sombre par défaut ; bascule mémorisée dans `localStorage` (clé `theme`).
- Un script anti-flash dans `index.html` applique le thème avant le rendu React.

## Déploiement

- **Vercel / Netlify** : zéro config (réécritures SPA natives).
- **GitHub Pages** : définir `base: '/<repo>/'` dans `vite.config.js` et prévoir un fallback SPA
  (`404.html`).

## Pistes d'amélioration (next steps)

- Conversion des captures en WebP/AVIF (`src/../public/img`).
- Prérendu au build (`vite-react-ssg`) pour un SEO optimal du SPA.
- Sitemap `sitemap.xml`.
- L'ancien site reste archivé dans `legacy/`.
