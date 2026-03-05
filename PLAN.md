# lawniczak.pl — Personal Website Plan

## Context

Marcin wants a personal website at lawniczak.pl. It should be simple, stable, fast to build/dev, and deployable on Coolify via Dockerfile. The goal is a low-maintenance site with minimal dependency churn.

## Stack

- **Astro 5** — static site generator (uses Vite under the hood)
- **Tailwind CSS v4** — utility-first CSS with built-in dark mode
- **TypeScript** — for type safety in components/utils
- **Dockerfile** — multi-stage build, serve with nginx:alpine

## Pages & Structure

| Route | Description |
|-------|-------------|
| `/` (en) `/pl` (pl) | Landing page — hero with name/title, brief about section, skills, contact links |
| `/projects` `/pl/projekty` | Project showcase — grid of cards with description, tech stack, links |

## i18n Approach

Use Astro's built-in i18n routing (`src/pages/` + `src/pages/pl/`). Content strings live in `src/i18n/` as simple TS objects (no library needed). Default locale: English.

```
src/
  i18n/
    en.ts        # English strings
    pl.ts        # Polish strings
    utils.ts     # getLocale(), t() helper
```

## Dark Mode

CSS class-based toggle (`<html class="dark">`). Tailwind's `darkMode: 'class'`. Toggle button in header. Persist preference in `localStorage`, respect `prefers-color-scheme` as default.

## Project Structure

```
lawniczak.pl/
├── src/
│   ├── components/
│   │   ├── Header.astro        # Nav + lang toggle + dark mode toggle
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── ProjectCard.astro
│   │   └── ThemeToggle.astro
│   ├── layouts/
│   │   └── Base.astro          # HTML shell, head, meta, fonts
│   ├── pages/
│   │   ├── index.astro         # EN landing
│   │   ├── projects.astro      # EN projects
│   │   └── pl/
│   │       ├── index.astro     # PL landing
│   │       └── projekty.astro  # PL projects
│   ├── i18n/
│   │   ├── en.ts
│   │   ├── pl.ts
│   │   └── utils.ts
│   ├── data/
│   │   └── projects.ts         # Project list data (shared, language-keyed)
│   └── styles/
│       └── global.css          # Tailwind directives + custom properties
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── Dockerfile
├── .dockerignore
├── .github/
│   └── workflows/
│       └── build.yml           # Build + push Docker image
└── CLAUDE.md
```

## Implementation Steps

### Step 1: Project scaffold
- `npm create astro@latest` (or manually create package.json)
- Install deps: `astro`, `@astrojs/tailwind`, `tailwindcss`
- Configure `astro.config.mjs` with site URL and i18n config
- Configure `tailwind.config.mjs` with dark mode class strategy
- Create `tsconfig.json`
- Create `.gitignore`

### Step 2: Base layout + global styles
- `src/styles/global.css` — Tailwind directives, base font, CSS custom properties for colors
- `src/layouts/Base.astro` — HTML boilerplate, meta tags, Open Graph, favicon, global CSS import
- Pick a clean sans-serif font (Inter via CDN or system font stack)

### Step 3: Components
- `Header.astro` — site title/logo, nav links, language toggle (EN/PL), dark mode toggle
- `Footer.astro` — copyright, social links (GitHub, LinkedIn, email)
- `ThemeToggle.astro` — button with sun/moon icon, inline `<script>` for localStorage + class toggle
- `Hero.astro` — name, job title, one-liner
- `About.astro` — brief bio, tech stack summary
- `ProjectCard.astro` — card component: title, description, tech tags, link

### Step 4: i18n system
- `src/i18n/en.ts` and `src/i18n/pl.ts` — flat key-value objects with all UI strings
- `src/i18n/utils.ts` — `getLangFromUrl()`, `useTranslations()` helpers
- Follow Astro's recipe: https://docs.astro.build/en/recipes/i18n/

### Step 5: Pages
- `src/pages/index.astro` — EN landing (Hero + About + contact CTA)
- `src/pages/projects.astro` — EN projects page
- `src/pages/pl/index.astro` — PL landing
- `src/pages/pl/projekty.astro` — PL projects page
- `src/data/projects.ts` — project data with `en`/`pl` fields

### Step 6: Dark mode script
- Inline script in `Base.astro` `<head>` to avoid FOUC (check localStorage → set class before paint)
- `ThemeToggle.astro` script toggles class + persists

### Step 7: Dockerfile
```dockerfile
# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

- Create `nginx.conf` — static file serving, gzip, cache headers, SPA fallback not needed (static site)
- Create `.dockerignore` — node_modules, .git, .idea, dist

### Step 8: GitHub Actions
```yaml
name: Build
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
```
(Docker image push can be added later when Coolify registry is configured)

### Step 9: CLAUDE.md
- Document build commands, project structure, conventions for future Sonnet sessions

## Design Decisions

- **No framework (React/Vue/Svelte)** — pure Astro components, zero client JS except dark mode toggle (~10 lines)
- **No CMS** — project data lives in a TS file, easy to edit
- **No markdown blog** — can be added later with Astro content collections if needed
- **System font stack or Inter** — no heavy font loading
- **Static output** — `output: 'static'` in Astro config, pure HTML/CSS/JS output

## Verification

1. `npm run dev` — site runs on localhost:4321, hot reload works
2. `npm run build` — produces `dist/` with static HTML
3. `npx serve dist` — preview production build locally
4. `docker build -t lawniczak-pl .` — Docker image builds
5. `docker run -p 8080:80 lawniczak-pl` — site serves on localhost:8080
6. Check: EN and PL pages render, dark mode toggle works, projects page shows cards
7. Check: responsive on mobile viewport
