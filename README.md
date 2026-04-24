# Collab — Marketing Site

The marketing site for **Collab**, a pre-development data studies service from The Collab Group (TCG).

Static HTML / CSS / vanilla JS. No build step.

## Run locally

```sh
python3 -m http.server 5173
# then open http://localhost:5173
```

Any static file server works. The site has zero build dependencies.

## Structure

```
.
├── index.html               Main landing page
├── sample-workbook.html     Example deliverable (Homebase Cincinnati · Colerain Landbank)
├── styles.css               All styles (hand-written, no framework)
├── script.js                Scroll reveal, nav, animated layers viz
└── assets/                  Imagery
    ├── hero-aerial.jpg
    ├── community-hbcu.jpg
    ├── rendering-civic.jpg
    └── data-plan.jpg
```

## Design system

- **Type**: Fraunces (display), Inter (body), JetBrains Mono (labels)
- **Palette**: archival cream · deep teal · terracotta ember · archival gold
- **Aesthetic**: civic modernism — warm, editorial, grounded in place

Defined as CSS custom properties on `:root` in `styles.css`.

## Sections

1. **Hero** — "You have the land. We give you the data to decide what's next."
2. **§ 01 The Question** — legacy vs. Collab speed/cost comparison
3. **§ 02 Four Intelligence Layers** — animated SVG viz + layer cards (zoning · by-right · envelope · highest & best use)
4. **§ 03 Stack** — AI stack · design & finance · civic legitimacy
5. **§ 04 Sample Workbook** — live embed of the Colerain Landbank workbook
6. **§ 05 Who We Build For** — landowners & mission-aligned developers
7. **CTA / Contact**

## Deploy

Recommended: **Vercel** or **Cloudflare Pages**.

1. Push `main` to `github.com/Co-llab-Group/website`.
2. Connect repo in Vercel/CF Pages. No build command. Output dir: `.`
3. Point `thecollab.group` DNS at the deploy target.
