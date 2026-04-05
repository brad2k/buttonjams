# buttonjams — James Button Oboe

Personal website for James Button, Associate Principal Oboe at the San Francisco Symphony.
Live at [jamesbuttonoboe.com](https://jamesbuttonoboe.com/).

## Stack

- **Astro 6** — primary framework, SSR via Netlify adapter
- **Sanity v5** — headless CMS; embedded Studio at `/studio`
- **React 19** — used for interactive islands only
- **Netlify** — hosting + image CDN; pretty URLs enabled (strips `.html` extensions and adds a trailing slash, e.g. `/about.html` → `/about/`)
- Node >= 24, npm >= 11

## Development

```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build locally
```

Environment variables required (`.env`):
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`

## Project structure

```
src/
  components/   # Astro components (.astro)
  layouts/      # Layout.astro, ProseLayout.astro
  pages/        # File-based routing
  sanity/       # Sanity schema types and query helpers
    schemaTypes/  # event.ts, page.ts, song.ts
    lib/          # load-query.ts
  styles/       # CSS design system
    reset.css
    theme.css     # tokens, compositions, global styles
    utilities.css
    imports.css   # barrel import
  assets/       # Images and audio files
public/
sanity.config.ts  # Sanity Studio config
astro.config.mjs
```

## CSS conventions

No utility framework (no Tailwind). Styles use plain CSS with:

- **CSS custom properties** for all design tokens (colors, spacing, typography, radii)
- **Semantic tokens** defined in `src/styles/theme.css`: `--text-primary`, `--surface-base`, `--accent`, `--card-bg`, etc.
- **Light/dark theming** via `color-scheme` + `[data-theme]` attribute on `:root`
- **Composition utilities**: `.wrapper`, `.flow`, `.grid`, `.prose`, `.button` — prefer these over one-off layout styles
- **Typography scale**: `--size-step-*` fluid type scale; heading sizes via `--font-size-h1` through `--font-size-h6`
- **Fonts**: `--font-Playfair` (Playfair Display, display/headings), `--font-base` / `--font-Montserrat` (Montserrat, body)
- **Accent**: teal (`--accent`, `--color-teal`)

## Sanity content types

- **page** — generic rich-text pages
- **event** — upcoming/past performances
- **song** — audio excerpts (orderable list)

## Notes

- `/ds` is a local design-system scratch page; it is excluded from the sitemap (as is `/studio`) and should not be treated as production content.
- PostHog analytics component is included in the Head (`src/components/posthog.astro`).
- Audio files live in `src/assets/audio/` and are referenced directly in pages.
