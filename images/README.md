# images/

Place client image files here. Required files:

- logo.webp -- primary logo, used in nav header
- logo-footer.webp -- logo variant for footer (white or light version)
- hero-bg.webp -- hero section background (water surface, clean water close-up, or local landmark)
- flagship-system.webp -- whole-home filtration system hardware photo
- owner-headshot.webp -- owner or team headshot (about page)
- ro-stage-1.webp through ro-stage-4.webp -- reverse osmosis stage diagrams or photos

All images should be .webp format, optimized for web.

## Favicon files (generate at build time)

Run `node gen-favicons.mjs` from the site root.
The script requires `npm install --save-dev sharp to-ico` and produces:

- favicon.ico -- 32px ICO, placed at site root
- favicon-16x16.png -- 16px PNG
- favicon-32x32.png -- 32px PNG
- apple-touch-icon.png -- 180px PNG on white canvas with extra padding

## Favicon design rule

Favicons are generated from a purpose-built SVG, not cropped from the full logo raster.
The SVG is a single bold shape (water drop, initial letter, or equivalent) on a white
rounded-square background. The shape must fill ~70% of the canvas height. A narrow or
detailed raster crop always fails at 16px -- a single solid shape does not.

To adapt for a new client: edit the DROP_PATH and fill color in gen-favicons.mjs.
Use a 100x100 viewBox. The shape must read clearly at 11x16px (16px render at 70% height).
Verify by running the script and reading images/favicon-16x16.png before committing.
