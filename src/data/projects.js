// Catégories utilisées par le filtre
export const projectCategories = [
  { id: 'all', label: 'Tous' },
  { id: 'django', label: 'Django' },
  { id: 'spring', label: 'Spring Boot' },
]

export const projects = [
  {
    slug: 'systeme-gestion-bibliotheque',
    title: 'Système de Gestion de Bibliothèque',
    category: 'django',
    categoryLabel: 'Django',
    year: '2023',
    featured: true,
    summary:
      "Application complète : authentification, gestion des emprunts et système de réservation.",
    description:
      "Plateforme de gestion d'une bibliothèque couvrant le catalogue, les adhérents, les emprunts et les réservations, avec un back-office d'administration et une recherche performante.",
    cover: '/img/loginBiblio.png',
    gallery: [
      '/img/loginBiblio.png',
      '/img/Biblio.png',
      '/img/Biblio1.png',
      '/img/Biblio2.png',
      '/img/editBiblio.png',
      '/img/deleteBiblio.png',
    ],
    role: 'Conception backend, modèle de données, API et back-office.',
    stack: ['Django', 'Django REST', 'PostgreSQL', 'Redis'],
    highlights: [
      "Authentification et gestion des rôles (adhérent / bibliothécaire / admin)",
      'Cycle complet emprunt → retour → réservation avec règles métier',
      'Recherche et filtres performants sur le catalogue',
      'Mise en cache Redis des requêtes fréquentes',
    ],
    links: {},
  },
  {
    slug: 'dashboard-administrateur',
    title: 'Dashboard Administrateur',
    category: 'django',
    categoryLabel: 'Django',
    year: '2023',
    featured: true,
    summary:
      "Interface d'administration avec statistiques en temps réel et graphiques interactifs.",
    description:
      "Tableau de bord d'administration agrégeant les indicateurs clés en temps réel, avec visualisations interactives et chargement asynchrone des données.",
    cover: '/img/Biblio1.png',
    gallery: ['/img/Biblio1.png', '/img/Biblio2.png'],
    role: 'Agrégation des données, endpoints statistiques et intégration front.',
    stack: ['Django', 'Chart.js', 'AJAX', 'PostgreSQL'],
    highlights: [
      'KPIs en temps réel et graphiques interactifs',
      'Chargement asynchrone (AJAX) sans rechargement de page',
      'Vues agrégées optimisées côté base de données',
    ],
    links: {},
  },
  {
    slug: 'systeme-gestion-rh',
    title: 'Système de Gestion RH',
    category: 'spring',
    categoryLabel: 'Spring Boot',
    year: '2023',
    featured: true,
    summary:
      'Application entreprise pour la gestion des employés, congés et évaluations.',
    description:
      "Application RH d'entreprise gérant le référentiel des employés, les demandes de congés et les évaluations, avec workflows d'approbation et reporting.",
    cover: '/img/Gemp1.png',
    gallery: ['/img/Gemp1.png', '/img/Gemp2.png', '/img/Gemp3.png'],
    role: 'Architecture Spring Boot, couche persistance JPA et logique métier.',
    stack: ['Spring Boot', 'MySQL', 'JPA', 'Thymeleaf'],
    highlights: [
      'Gestion des employés, congés et évaluations',
      "Workflows d'approbation multi-niveaux",
      'Reporting dynamique et exports',
    ],
    links: {},
  },
  {
    slug: 'catalogue-intelligent',
    title: 'Catalogue Intelligent',
    category: 'django',
    categoryLabel: 'Django',
    year: '2024',
    featured: false,
    summary: "Système de recherche avancé avec recommandations.",
    description:
      "Moteur de recherche et de recommandation pour un catalogue, combinant indexation full-text et suggestions basées sur les usages.",
    cover: '/img/Biblio2.png',
    gallery: ['/img/Biblio2.png', '/img/Biblio.png'],
    role: 'Indexation, pipeline de recherche et recommandations.',
    stack: ['Django', 'ElasticSearch', 'ML'],
    highlights: [
      'Recherche full-text avec filtres avancés',
      'Recommandations basées sur les usages',
      'Indexation incrémentale',
    ],
    links: {},
  },
  {
    slug: 'module-rh-avance',
    title: 'Module RH Avancé',
    category: 'spring',
    categoryLabel: 'Spring Boot',
    year: '2024',
    featured: false,
    summary: "Reporting dynamique et workflows d'approbation.",
    description:
      "Extension du système RH avec reporting dynamique paramétrable et workflows d'approbation configurables.",
    cover: '/img/Gemp2.png',
    gallery: ['/img/Gemp2.png', '/img/Gemp3.png'],
    role: 'Conception des workflows et du moteur de reporting.',
    stack: ['Spring Boot', 'JPA', 'Thymeleaf'],
    highlights: [
      'Workflows d\'approbation configurables',
      'Reporting dynamique paramétrable',
      'Tableaux de bord par service',
    ],
    links: {},
  },
  {
    slug: 'interface-crud',
    title: 'Interface CRUD',
    category: 'django',
    categoryLabel: 'Django',
    year: '2023',
    featured: false,
    summary: 'CRUD avec validation temps réel et historique des modifications.',
    description:
      "Interface de gestion CRUD avec validation côté client en temps réel et journalisation de l'historique des modifications.",
    cover: '/img/editBiblio.png',
    gallery: ['/img/editBiblio.png', '/img/deleteBiblio.png'],
    role: 'Formulaires, validation et journal d\'audit.',
    stack: ['Django', 'Forms', 'AJAX'],
    highlights: [
      'Validation temps réel des formulaires',
      'Historique / journal des modifications',
      'Opérations CRUD fluides (AJAX)',
    ],
    links: {},
  },
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)
export const featuredProjects = projects.filter((p) => p.featured)
