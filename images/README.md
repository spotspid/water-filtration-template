# images/

## Default image set (committed to template)

These files are free-license stock images (sourced from Pexels / Unsplash) or SVG-generated
placeholders. They ship with the template so client builds have working visuals before per-client
photos arrive. Equipment shots are generic stand-ins -- replace with real install photos when
available.

| File | Slot | Dimensions | Source | Replace? |
|------|------|-----------|--------|----------|
| hero-water.webp | Hero section background | 1920x480 | Stock (water surface) | When client provides local photo |
| equipment-tank.webp | Whole-home system product shot | 600x480 | Stock (generic system) | When client provides real install photo |
| equipment-ro.webp | RO system / under-sink unit | 600x480 | Placeholder (labeled) | When client provides RO unit photo |
| lifestyle-kitchen.webp | Kitchen / faucet lifestyle scene | 960x640 | Placeholder (labeled) | When stock or client photo available |
| lifestyle-family.webp | Family drinking water scene | 960x640 | Placeholder (labeled) | When stock or client photo available |
| lifestyle-shower.webp | Shower / bathroom water scene | 960x640 | Placeholder (labeled) | When stock or client photo available |
| ro-stage-1.webp | RO faucet finish: Chrome | 149x240 | Stock (faucet photo) | Optional -- per client finish options |
| ro-stage-2.webp | RO faucet finish: Brushed Nickel | 146x240 | Stock (faucet photo) | Optional -- per client finish options |
| ro-stage-3.webp | RO faucet finish: Matte Black | 140x240 | Stock (faucet photo) | Optional -- per client finish options |
| ro-stage-4.webp | RO faucet finish: Brushed Gold | 139x240 | Stock (faucet photo) | Optional -- per client finish options |

## Per-client slots (NOT committed to template)

These files must be supplied at build time. The HTML contains `<!-- PER-CLIENT IMAGE: replace at build -->`
comments next to each reference.

| File | Slot | Notes |
|------|------|-------|
| logo.webp | Nav header logo | Raster PNG preferred; use white/light backgrounds only if raster with opaque bg |
| logo-footer.webp | Footer logo | Light/white variant; footer uses dark bg -- place logo on white tile if PNG |
| owner-headshot.webp | About page headshot | ~300px wide, left-floated next to bio; compress to webp |

To convert a client JPG or PNG to webp:
```
node -e "import('sharp').then(s => s.default('Selfie.jpg').resize(600).webp({quality:82}).toFile('images/owner-headshot.webp'))"
```

## Favicon files (generate at build time)

Run `node gen-favicons.mjs` from the site root after editing the DROP_PATH and fill color for
the client's mark. See the favicon design rule below.

Output locations:
- favicon.ico -- site root
- images/favicon-16x16.png
- images/favicon-32x32.png
- images/apple-touch-icon.png

## Regenerating default images

To regenerate the full default set (e.g. after sourcing better stock photos):

```
node gen-default-images.mjs
```

To regenerate the equipment-tank placeholder only (no stock source required):

```
node gen-placeholder.mjs
```

## Favicon design rule

Favicons are generated from a purpose-built SVG, not cropped from the full logo raster.
The SVG is a single bold shape (water drop, initial letter, or equivalent) on a white
rounded-square background. The shape must fill ~70% of the canvas height. A narrow or
detailed raster crop always fails at 16px -- a single solid shape does not.

Adapt for a new client: edit the DROP_PATH and fill color in gen-favicons.mjs.
Use a 100x100 viewBox. Verify images/favicon-16x16.png reads clearly before committing.
