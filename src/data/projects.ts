export interface Project {
  id: string;
  en: {
    title: string;
    description: string;
  };
  pl: {
    title: string;
    description: string;
  };
  tags: string[];
  url?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    id: 'lawniczak-pl',
    en: {
      title: 'lawniczak.pl',
      description:
        'This personal website — built with Astro 5, Tailwind CSS v4, and deployed via Docker on Coolify. Fully static, bilingual (EN/PL), with dark mode.',
    },
    pl: {
      title: 'lawniczak.pl',
      description:
        'Ta strona osobista — zbudowana z Astro 5, Tailwind CSS v4 i wdrożona przez Docker na Coolify. W pełni statyczna, dwujęzyczna (EN/PL), z trybem ciemnym.',
    },
    tags: ['Astro', 'Tailwind CSS', 'TypeScript', 'Docker'],
    repo: 'https://github.com/mlaw1niczak/lawniczak.pl',
  },
];
