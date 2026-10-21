# buttonjams

Website for James Button, Associate Principal Oboe, San Francisco Symphony. Live at [jamesbuttonoboe.com](https://jamesbuttonoboe.com/).

Astro site (pre-rendered, hosted on Netlify) with content managed in Sanity.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview the build via netlify serve
```

Requires Node >= 24 and npm >= 11. Create a `.env` file with:

```
PUBLIC_SANITY_PROJECT_ID=ths10aea
PUBLIC_SANITY_DATASET=production
```

## Editing content

Content is edited in the Sanity Studio at **[buttonjams.sanity.studio](https://buttonjams.sanity.studio)**. The Studio is hosted by Sanity, not by this site, so you do not need to run it locally.

The site is pre-rendered at build time, so a content change only appears on jamesbuttonoboe.com after the site is rebuilt on Netlify.

### Content types

| Type | Used by | Fields |
| --- | --- | --- |
| **Page** | [About](src/pages/about.astro) (slug `about`), [Audition coaching](src/pages/audition-coaching.astro) (slug `audition-coaching`) | Headline, slug, image, image caption, caption is photo credit, image alt text, body content, SEO settings |
| **Event** | [Events](src/pages/events.astro) | Title, category, date & time, timezone, location, ticket/info link, description |
| **Audio excerpt** | [Listen](src/pages/listen.astro) | Title, description, audio file, order (drag to reorder in the Studio) |

Only events with a date in the future are shown on the Events page.

## Adding or changing a field

Schemas live in `src/sanity/schemaTypes/` (`page.ts`, `event.ts`, `song.ts`). Adding a field takes three coordinated changes:

1. **Define the field** in the schema file for its document type, using `defineField({ name, title, type, ... })`.
2. **Read the field** in the page that displays it. Add it to the GROQ query in the page's frontmatter, and to the TypeScript interface above the query (for example `SanityEvent` in `events.astro`).
3. **Render the field** in the page's markup.

Then:

- **Push the Studio** so editors can see the new field (see below).
- **Rebuild the site** so the change goes live.

Editing a field's value in the Studio does not require any code change or Studio push.

### When to push the Studio

Run this from the project root after any of these changes, and only then:

- Changing a file in `src/sanity/schemaTypes/` (adding, renaming, removing, or changing a field, type, option, or validation)
- Changing the Studio's structure or title in `sanity.config.ts`

```bash
npx sanity deploy
```

The first time, run `npx sanity login` if prompted. The deploy updates the existing Studio at `buttonjams.sanity.studio`; it does not create a new one.

Pushing the Studio does **not** update the live website. Schema changes that the site relies on (step 2 above) also need a site rebuild.

## Project structure

```
src/
  components/   Astro components
  layouts/      Layout.astro, ProseLayout.astro
  pages/        File-based routes (all static)
  sanity/
    lib/          load-query.ts, the shared Sanity fetch helper
    schemaTypes/  Document schemas (page, event, song)
  styles/       CSS design system
sanity.config.ts  Studio configuration (used by `sanity deploy`)
sanity.cli.ts     Sanity CLI configuration
```

Pages fetch content at build time with `loadQuery<T>()` from `src/sanity/lib/load-query.ts`.
