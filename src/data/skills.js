// `icon` correspond à une clé de l'Icon registry (src/components/ui/Icon.jsx)
export const skills = [
  { name: 'Python', icon: 'python', level: 95 },
  { name: 'Django', icon: 'server', level: 92 },
  { name: 'Java', icon: 'java', level: 88 },
  { name: 'Spring Boot', icon: 'leaf', level: 88 },
  { name: '.NET', icon: 'code', level: 82 },
  { name: 'Docker', icon: 'docker', level: 85 },
]

// Regroupements affichés sur la page À propos
export const skillGroups = [
  { title: 'Langages', items: ['Python', 'Java', 'C#', 'JavaScript', 'SQL'] },
  { title: 'Frameworks', items: ['Django', 'Django REST', 'Spring Boot', '.NET', 'FastAPI'] },
  { title: 'Bases de données', items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB'] },
  { title: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure'] },
]
