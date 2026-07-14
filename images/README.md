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

Run `node gen-favicons.mjs` from the site root after placing the client logo in images/logo.png.
The script requires `npm install --save-dev sharp to-ico` and produces:

- favicon.ico -- 32px ICO, placed at site root
- favicon-16x16.png -- 16px PNG
- favicon-32x32.png -- 32px PNG
- apple-touch-icon.png -- 180px PNG on white canvas with padding

Source: crop the logo mark (icon/symbol portion only, not the wordmark) from logo.png,
auto-trim whitespace, then resize to each target size with proportional padding.
