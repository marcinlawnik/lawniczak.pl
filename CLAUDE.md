# lawniczak.pl — Claude Code Guide

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:4321
npm run build        # Build to dist/
npm run preview      # Preview production build
npm run check        # TypeScript check via astro check
```

## Docker

```bash
docker build -t lawniczak-pl .
docker run -p 8080:80 lawniczak-pl
# → http://localhost:8080
```

## Project Structure

```
src/
  components/      Astro components (Header, Footer, Hero, About, ProjectCard, ThemeToggle)
  layouts/         Base.astro — HTML shell with dark mode FOUC prevention
  pages/           index.astro (PL), projekty.astro (PL), en/index.astro (EN), en/projects.astro (EN)
  i18n/            en.ts, pl.ts (flat key-value), utils.ts (getLangFromUrl, useTranslations)
  data/            projects.ts — project list with en/pl fields
  styles/          global.css — Tailwind v4 import + CSS custom properties
public/            Static assets (favicon.svg)
```

## Key Conventions

- **i18n**: Default locale is Polish (no URL prefix). English at `/en/*`. Strings in `src/i18n/en.ts` and `pl.ts`.
- **Dark mode**: CSS class-based (`<html class="dark">`). FOUC prevention inline script in Base.astro. Toggle persists to `localStorage`.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (not `@astrojs/tailwind`). CSS custom properties for colors (`--color-bg`, `--color-text`, etc.) defined in `global.css`.
- **No React/Vue**: Pure Astro components. Zero client JS except ThemeToggle (~5 lines).
- **Adding projects**: Edit `src/data/projects.ts` — add a new `Project` object with `en`/`pl` fields.
- **Adding i18n strings**: Add key to `src/i18n/en.ts` first (it exports `TranslationKey`), then add to `pl.ts`.

## On-Demand Checks

- **Verify live site**: `curl -sI https://lawniczak.pl` — check HTTP status, server, and cache headers. Use `curl -s https://lawniczak.pl | grep -o 'UTC · [a-f0-9]*'` to confirm deployed commit hash matches latest.

## Deployment

- Coolify via Docker. The GitHub Actions workflow builds on every push to `main`.
- Docker image: node:22-alpine (build) → nginx:alpine (serve).
