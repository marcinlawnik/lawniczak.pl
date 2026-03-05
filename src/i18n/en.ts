export const en = {
  // Meta
  siteTitle: 'Marcin Ławniczak — Software Developer',
  siteDescription: 'Personal website of Marcin Ławniczak, software developer.',

  // Hero
  heroTitle: 'Software Developer',
  heroName: 'Marcin Ławniczak',
  heroTagline:
    'I build reliable, well-crafted software. Focused on clean architecture, developer experience, and shipping things that work.',
  heroCta: 'View my projects',
  heroCtaHref: '/en/projects',

  // About
  aboutHeading: 'About me',
  aboutBio:
    'I am a software developer with a passion for building great products. I enjoy working across the stack, from backend APIs to front-end interfaces, and care deeply about code quality and maintainability.',
  aboutSkillsLabel: 'Technologies',

  // Projects page
  projectsHeading: 'Projects',
  projectsSubheading: 'A selection of things I have built.',

  // Nav
  navHome: 'Home',
  navProjects: 'Projects',
} as const;

export type TranslationKey = keyof typeof en;
