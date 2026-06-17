# Casa Mokador

Italian café & bar in Pafos, Cyprus — built as a fast, single-page Astro site.

Stack: **Astro 5** (static) · **Tailwind CSS 4** (via Vite plugin) · self-hosted fonts · **Caddy** runtime on **Railway**. No JS framework, almost no client JS. Mobile-first, fully responsive 320 px → 4K.

---

## Run locally

```bash
nvm use            # picks up Node 20 from .nvmrc
npm install
npm run dev        # http://localhost:4321
```

Production preview from a build:

```bash
npm run build      # outputs to ./dist
npm run preview    # serves ./dist on :4321
```

---

## How to edit the site

Most edits are touching one of two files.

### Edit the menu (prices, items, captions)

All five menu categories live in **`src/data/menu.ts`**. Each item is a single object — change a price by editing the number, rename an item by editing the string. Add or remove items by editing the array.

```ts
{ name: 'Espresso', price: 2.00 },
```

Prices are numbers (not strings). The site formats them at render time. To mark a price as TBD, set it to `0` and add a `note` — it’ll render as `€—` with the note inline.

The same file exports `SHISHA`, which is the placeholder list. When you have the real shisha menu, replace the eight placeholder entries with real flavours and prices, then delete the `note` fields. The TODO comment in the file marks the spot.

### Swap a gallery photo

The gallery is driven by **`src/data/gallery.ts`** and the files in **`public/gallery/`**.

- **Drop in a real photo**: save it as `public/gallery/gallery-01.jpg` (or `.webp`, `.avif`, `.png`) — keep the filename so you don’t need to touch the data file. Then update the matching entry in `src/data/gallery.ts` to change the `src` extension if you renamed it.
- **Change the alt text or caption**: edit the entry in `gallery.ts`.
- **Add a new photo**: drop it in `public/gallery/`, then add a new entry to the `GALLERY` array. Pick a `shape` (`tall`, `wide`, or `square`) to control the aspect ratio.
- **Remove a photo**: delete its entry from `gallery.ts`.

Placeholder SVGs are committed to the repo so the gallery looks intentional even before real photos exist.

### Swap a shisha photo

The Shisha section uses its own image cluster, sourced from **`public/shisha/`**:

- `shisha-01.{svg|jpg|webp}` — the **hero** (tall portrait, 4:5). Use the most atmospheric lounge shot.
- `shisha-02.{svg|jpg|webp}` — first close-up (square). Suggested subject: the electronic hookah device.
- `shisha-03.{svg|jpg|webp}` — second close-up (square). Suggested subject: a traditional pipe or flavour detail.

Keep the filenames as-is — the image array is declared inside `src/components/Shisha.astro` and references those paths. To use a different file format, edit the `src` field in that array. Each entry also has an `alt` field; update it to describe the actual photo.

If you need a fourth image, add a `{ src, alt, variant: 'wide' }` entry to the `IMAGES` array and the grid will accept it as a full-width tile below the others (the grid CSS already accounts for `wide`-shaped tiles).

### Update contact info

Open **`src/components/Contact.astro`**. Near the top there’s a block of `// TODO` constants — replace them with real values:

```ts
const ADDRESS = { street: '…', city: 'Pafos', country: 'Cyprus' };
const PHONE   = '+357 …';
const HOURS   = [
  { day: 'Monday – Thursday', value: '08:00 – 22:00' },
  …
];
const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/casamokador', icon: 'instagram' },
  …
];
```

Also update the JSON-LD `Restaurant` schema in **`src/layouts/Base.astro`** (search for `TODO`) — it’s what Google reads.

For the map: edit `PAFOS_LAT` and `PAFOS_LON` at the top of `Contact.astro` with the exact venue coordinates.

### Change the brand colours, fonts, or motion

All design tokens live in the `@theme` block of **`src/styles/global.css`**. Change a CSS variable there and it propagates everywhere — utility classes (e.g. `text-mk-gold`), arbitrary values, and component-scoped styles all read from those variables.

### Typography rules

One rule of thumb keeps the type voice consistent:

> **Refined serifs only above 24 px. Anything smaller uses Inter.**

In practice that means:

- **Marcellus** — h1 and h2 only (the hero lockup is an image; section titles use Marcellus).
- **Italiana** — small-caps eyebrows above 24 px, when used as a quiet display flourish.
- **Inter** — everything else: nav (top bar + mobile overlay), body copy, menu rows, prices, captions, buttons, form labels. Loaded as static **400** and **500** weights via `@fontsource/inter`.

If you find yourself reaching for a serif at 14 px, stop — set it in Inter and reach for weight, letter-spacing, or uppercase instead.

### Change the site copy on the home page

Wording is inside each component in `src/components/`. The components are deliberately split by section (`Hero.astro`, `Gallery.astro`, …) so finding the right one takes a few seconds.

---

## Deploy to Railway

The repo ships with everything Railway needs.

1. Push the repo to GitHub.
2. In Railway, **New Project → Deploy from GitHub repo**.
3. Railway will detect `railway.json` and use the multi-stage **`Dockerfile`** that:
   1. Installs dependencies on `node:20-alpine`.
   2. Runs `npm run build`.
   3. Copies `dist/` into a `caddy:2-alpine` runtime that serves it on `$PORT`.
4. No environment variables are required for the build — but you can override:
   - `PORT` — Railway sets this automatically.
5. Assign a custom domain (Settings → Domains). Then update **`astro.config.mjs`** `site:` to the canonical URL and re-deploy so OG tags, the sitemap, and JSON-LD pick it up.

The healthcheck hits `/` and expects a 200, so you don’t need anything else.

---

## Performance budget

- HTML is compressed at build time.
- CSS is inlined when small enough (Astro decides automatically via `inlineStylesheets: 'auto'`).
- Fonts are self-hosted via `@fontsource` — no Google Fonts, no CLS, GDPR-clean.
- Static assets served by Caddy with `Cache-Control: public, max-age=31536000, immutable` for `/_astro/*`.
- Compression: `zstd` + `gzip`, picked per request.

Run a Lighthouse audit locally:

```bash
npm run build && npm run preview &
npx --yes @lhci/cli@latest collect --url=http://localhost:4321/ --numberOfRuns=1
```

Targets per brief: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

---

## Accessibility

- Skip-link to `#main`.
- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Visible focus rings (gold, 2 px offset).
- Lightbox traps focus, closes on Esc, arrow-key navigation.
- Mobile menu traps focus and locks body scroll.
- `prefers-reduced-motion` honoured — animations collapse to opacity fades.
- Contrast verified: cream-on-black ≥ 7:1, gold-on-black ≥ 4.5:1.

---

## Project structure

```
casa-mokador/
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Gallery.astro
│   │   ├── Menu.astro
│   │   ├── Shisha.astro
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   └── Nav.astro
│   ├── data/
│   │   ├── menu.ts        ← single source of truth for the food/drink menu
│   │   └── gallery.ts     ← gallery items + alt text + captions
│   ├── layouts/
│   │   └── Base.astro     ← <head>, SEO, JSON-LD, fonts, global scripts
│   ├── pages/
│   │   └── index.astro    ← composes the whole homepage
│   └── styles/
│       └── global.css     ← @theme tokens, base styles, components, utilities
├── public/
│   ├── brand/
│   │   ├── logo-lockup-transparent.{png,webp} ← used by Hero
│   │   ├── monogram-transparent.{png,webp}    ← used by Nav and Footer
│   │   ├── monogram@2x-transparent.{png,webp}
│   │   ├── favicon-{32,64,180,192,512}.png    ← favicons (multiple sizes)
│   │   ├── og-image.png                       ← share card (1200×630)
│   │   └── logo-lockup.{png,webp}, monogram*.png  ← originals (on #000 bg)
│   ├── robots.txt
│   ├── site.webmanifest
│   └── gallery/
│       ├── gallery-01.svg ← replace with real photos
│       └── …
├── Caddyfile              ← Caddy runtime config
├── Dockerfile             ← multi-stage: build → run with Caddy
├── railway.json           ← Railway deploy config
├── astro.config.mjs
├── tailwind / @theme is in src/styles/global.css (Tailwind v4 has no JS config)
├── tsconfig.json
└── package.json
```

---

## Brand assets

The real logo + favicon kit live in **`public/brand/`**. The originals (`logo-lockup.png`, `monogram.png`, `monogram@2x.png`) are painted on pure `#000` and are kept around as the master source.

A one-shot pre-processor (`scripts/prep-brand.mjs`) generates **`*-transparent.{png,webp}`** variants whose backgrounds are alpha-cut — those are the ones the components actually reference. If you ever replace an original PNG, regenerate the transparent variants:

```bash
node scripts/prep-brand.mjs
```

The script is idempotent. Tune the `FLOOR`/`CEIL` luma thresholds inside if the bean detail in the monogram needs a tighter cut.

---

## Outstanding TODOs

These show up in the source as `// TODO` or `<!-- TODO -->` comments — the client needs to supply:

- **`astro.config.mjs`** — production domain (for canonical URL + sitemap).
- **`src/components/Contact.astro`** — address, phone, hours, social handles, exact coordinates.
- **`src/layouts/Base.astro`** — JSON-LD `Restaurant` schema mirrors the contact fields.
- **`src/data/menu.ts`** — `SHISHA.items` is a placeholder list of six rows.
- **`public/gallery/`** — eight placeholder SVGs to be replaced with real photos.

Search the repo for `TODO` to find every occurrence at once.
