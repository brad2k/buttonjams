# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# buttonjams — James Button Oboe

Personal website for James Button, Associate Principal Oboe at the San Francisco Symphony.
Live at [jamesbuttonoboe.com](https://jamesbuttonoboe.com/).

## Stack

- **Astro 5** — primary framework, SSR via Netlify adapter; fully pre-rendered at build time
- **Sanity v5** — headless CMS; embedded Studio at `/studio`
- **React 19** — installed but not currently used; interactivity is done with vanilla JS in `<script>` tags
- **Netlify** — hosting + image CDN; pretty URLs enabled (strips `.html` extensions and adds a trailing slash, e.g. `/about.html` → `/about/`)
- **astro-portabletext** — renders Sanity rich text (Portable Text) to HTML
- **Lucide icons** — via `@lucide/astro`
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

## Page patterns & routing

All pages are **static routes** with file-based routing (`src/pages/*.astro`). No dynamic `[slug]` routes.

**Data fetching pattern:**

- Pages query Sanity data at build time using the `loadQuery()` helper (defined in `src/sanity/lib/load-query.ts`)
- Pages fetch by document type or slug and destructure the data in the frontmatter
- Example: `about.astro` queries for `page` documents by slug; `events.astro` queries for `event` documents ordered by date
- All pages are TypeScript with interface definitions for type safety (e.g., `SanityEvent`, `SongProps`)

**Content pages** (about, audition-coaching) query Sanity `page` documents and render using:

- `ProseLayout` component (two-column layout with figure + prose)
- `PortableText` component from astro-portabletext to render rich text blocks from Sanity

## Data fetching & Sanity integration

Use `loadQuery<T>()` in page frontmatter to fetch Sanity data. The helper handles the client connection and returns `{ data }`.

GROQ query examples:

- `*[_type == "page" && slug.current == "about"][0]{...}` — single page by slug
- `*[_type == "event" && dateTime > now()] | order(dateTime asc) {...}` — filtered + sorted collection
- `*[_type == "song"] | order(orderRank) {"audioUrl": audioFile.asset->url}` — projection with asset dereferencing

All `.astro` files that use Sanity data should define TypeScript interfaces for the expected document shape.

## Interactivity & client behavior

**Vanilla JavaScript** — Client-side behavior uses `<script>` tags in Astro pages, not React islands.

- See `listen.astro` for an example: playlist management, audio player controls, DOM state syncing
- Keep scripts scoped to page; use `<script>` block to define functions and event listeners
- Use `data-*` attributes and `aria-*` attributes for state management and accessibility

**Netlify Forms** — Contact form (contact.astro) uses Netlify Forms with the `name="contact"` attribute for form handling.

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

## Image optimization

Uses Astro's `Image` and `Picture` components from `astro:assets` with the Netlify Image CDN:

- Static images: import and use `Image` component with format/densities (e.g., `format="avif"`, `densities={[1, 1.5, 2]}`)
- Responsive images: use `Picture` component with multiple formats and srcSet
- Helper: `getImage()` returns optimized src + srcSet for programmatic usage (see index.astro)
- Netlify Image CDN is enabled in `astro.config.mjs`; images are automatically optimized at request time

Example pattern (from about.astro):

```astro
import muralPhoto from "../assets/james-button-mural.jpg";
const heroImg = await getImage({ src: muralPhoto, width: 480, format: "avif" });
<Image src={muralPhoto} width={480} alt="..." format="avif" densities={[1, 1.5, 2]} />
```

## CSS conventions

No utility framework (no Tailwind). Styles use plain CSS with:

- **CSS custom properties** for all design tokens (colors, spacing, typography, radii)
- **Semantic tokens** defined in `src/styles/theme.css`: `--text-primary`, `--surface-base`, `--accent`, `--card-bg`, etc.
- **Light/dark theming** via `color-scheme` + `[data-theme]` attribute on `:root` (user can toggle via theme switcher in Navigation)
- **Composition utilities**: `.wrapper`, `.flow`, `.grid`, `.prose`, `.button` — prefer these over one-off layout styles
- **Typography scale**: `--size-step-*` fluid type scale; heading sizes via `--font-size-h1` through `--font-size-h6`
- **Fonts**: `--font-Playfair` (Playfair Display, display/headings), `--font-base` / `--font-Montserrat` (Montserrat, body)
- **Accent**: teal (`--accent`, `--color-teal`)

## Sanity content types

- **page** — generic rich-text pages
- **event** — upcoming/past performances
- **song** — audio excerpts (orderable list)

## Build & deployment

- **Pre-rendered at build time** — all pages are fully pre-rendered; there are no dynamic routes or server-side rendering at request time
- **Netlify adapter** — configured in `astro.config.mjs` with Image CDN enabled
- **Build command** — `npm run build` (see netlify.toml for Netlify's build config)
- **Sitemap & robots.txt** — auto-generated via @astrojs/sitemap; `/studio` and `/ds` are filtered out

## Notes

- `/ds` is a local design-system scratch page; it is excluded from the sitemap (as is `/studio`) and should not be treated as production content.
- **PostHog analytics** component is included in the Head (`src/components/posthog.astro`) for tracking user behavior.
- **Audio files** live in `src/assets/audio/` and are referenced directly in pages (or via Sanity asset references in songs).
- **Accessibility** — pages use semantic HTML, ARIA labels, and keyboard support (see listen.astro for audio playlist example).
- **Netlify Forms** — contact form submission handled by Netlify; form name is `contact`.
- **Theme switching** — Navigation component includes theme switcher that sets `[data-theme]` attribute; preference is stored in localStorage.
