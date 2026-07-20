# Water Filtration Vertical Template

Stripped from Michigan Water Pros (michiganwaterpros.com) on 2026-07-10.

## CRITICAL RULE: No Real Client Photos in the Template

**Real client photos (headshots, avatars, portraits) NEVER enter the template repo.**

The `images/owner-headshot.webp` committed here is a generated silhouette graphic (blue gradient, abstract head/body shapes, 400x400, ~2KB). It is not a photograph of any person.

At build time, the builder drops the client's real headshot directly into the client site folder. It never passes through the template. If you find a photograph in `_templates/water-filtration/images/`, remove it immediately and replace it with the generated silhouette. Committing a real photo into the template risks it propagating to every future site built from this repo.

To verify the current default is the silhouette and not a real photo:
- File: `images/owner-headshot.webp`
- Expected size: ~1,970 bytes
- Expected MD5: `76b7075b52768dad30fe51f255d0458a`

If the size is significantly larger or the hash differs, the silhouette has been replaced. Revert it.

---

## CRITICAL RULE: Remote Hygiene

**The template repo is NEVER a remote of any client site folder.**

Client sites push only to their own `[slug]-website` GitHub repo. The template is read-only reference material for builders -- it is not a push target.

Before any client build's first push, run:
```
git remote -v
```
Verify that `origin` is NOT `water-filtration-template`. If you see the template URL in any remote, remove it immediately:
```
git remote remove origin
git remote add origin https://github.com/spotspid/[slug]-website.git
```
Pushing client content into the template repo contaminates the token set for every future build.

## Token Reference

| Token | Description |
|-------|-------------|
| {{COMPANY_NAME}} | DBA / brand name (e.g. "Acme Water") |
| {{LEGAL_NAME}} | Full legal entity name (e.g. "Acme Water, LLC") |
| {{PHONE_DISPLAY}} | Display format phone (e.g. "(248) 555-0100") |
| {{PHONE_TEL}} | E.164 digits only, no +1 (e.g. "2485550100") |
| {{EMAIL}} | Primary contact email |
| {{CITY}} | City of primary office |
| {{STATE}} | State abbreviation |
| {{DOMAIN}} | Domain without protocol (e.g. "yourdomain.com") |
| {{SERVICE_AREA_LABEL}} | Short service area label (e.g. "Metro Detroit") |
| {{FLAGSHIP_PRICE}} | All-in installed price (e.g. "$2,999") |
| {{FINANCING_LINE}} | Financing call-out line. Two accepted values: (1) generic default when client has no confirmed terms: "Flexible financing available, no credit check." (2) client-confirmed figure: "as low as $239/mo, no credit check." Never calculate or estimate a financing number -- it must come from the client's lender terms or stay generic. |
| {{FOUNDER_FIRST_NAME}} | Owner/founder first name for the About page H1 (e.g. "Mike") |
| {{ABOUT_COPY}} | About section paragraphs (2-4 sentences, owner voice) |
| {{GHL_FORM_ID}} | GoHighLevel form ID |
| {{CHAT_WIDGET_ID}} | GoHighLevel chat widget ID |
| {{GBP_URL}} | Google Business Profile URL |
| {{CITY_NAME}} | City name for city pages (e.g. "Novi") |
| {{CITY_SLUG}} | URL slug for city (e.g. "novi") |
| {{CITY_LOCAL_CONTENT}} | 1-2 sentences specific to the city water quality or local context |
| {{COLOR_PRIMARY}} | Primary brand color hex (source: #1C3651 navy) |
| {{COLOR_ACCENT}} | Accent color hex (source: #2C819B teal) |
| {{COLOR_CTA}} | CTA / alert color hex (source: #8C2F2F maroon) |
| {{COLOR_CTA_HOVER}} | Darkened CTA for btn--primary:hover (typically 15-20% darker than CTA) |
| {{COLOR_LIGHT_FILL}} | Light section fill (source: #DFF7FC sky) |
| {{COLOR_BG}} | Page background / mist (source: #F2F8FA) |
| {{COLOR_TEXT}} | Body text color (source: #16222E ink) |
| {{COLOR_BORDER}} | Border / line color (source: #DCE7EC) |
| {{COLOR_MUTED}} | Muted text color (source: #5B6E7B) |
| {{FONT_HEADING}} | Heading font name (source: Poppins) |
| {{FONT_BODY}} | Body font name (source: Inter) |
| {{INSTALLER_CREDENTIAL_LINE}} | Credential line (e.g. "licensed Michigan installer") |

## Service-Area Business (pipeline standard)

Sites built from this template are service-area businesses with no published street address. Schema uses PostalAddress with addressLocality and addressRegion only. Footer reads "Serving {{SERVICE_AREA_LABEL}}, {{STATE}}". There is no {{STREET_ADDRESS}} or {{ZIP}} token.

If a client ever verifies their GBP at a physical address (shop, showroom, warehouse), add the address back site-wide to match GBP exactly: restore streetAddress and postalCode to every schema block and update the footer. GBP and the site must agree on address presence -- either both have it or neither does.

## A2P Opt-In Path

[BLANK -- fill per client at build time]

Options: CHAT WIDGET or WEB FORM.

- CHAT WIDGET: GHL widget consent language is the opt-in. NO SMS consent checkboxes on any form.
- WEB FORM: add SMS consent checkbox with STOP/HELP language to the lead form only.

## Chat Widget Placement Rule

Place widget script once per page, before closing body tag.
EXCLUDE from: lead form page (water-assessment.html), privacy-policy.html, terms-of-service.html.
Each page that carries the widget has a comment: <!-- CHAT WIDGET: paste GHL chat widget snippet here. Widget ID: {{CHAT_WIDGET_ID}} -->

## Pages to Create (not in template)

- privacy-policy.html -- include SMS STOP/HELP clauses, {{LEGAL_NAME}} copyright
- terms-of-service.html -- include SMS clauses, {{LEGAL_NAME}} copyright

Both legal pages must EXCLUDE the chat widget per placement rule above.

## File Inventory

- index.html -- homepage (price-forward hero, comparison band, trust band, how-it-works, FAQ)
- about.html -- about page (owner story placeholder, trust signals)
- services.html -- services overview
- service-area.html -- service area overview with city pills
- water-assessment.html -- lead capture page (GHL form embed, NO chat widget; formerly free-water-report.html)
- services/whole-home-filtration.html -- flagship service page
- services/reverse-osmosis.html -- RO drinking water service page
- services/well-water-treatment.html -- OPTIONAL well water page
- service-area/city-template.html -- city landing page pattern (duplicate per city, fill tokens). **DELETE this file from every client site folder after city page generation -- it must never be deployed.**
- sitemap.xml -- update {{DOMAIN}} and regenerate city URLs per your service-area pages
- robots.txt
- images/ -- default stock images + SVG placeholders committed to template; per-client files added at build time (see images/README.md)

## Icon Rule

Problem-card icons (the rounded badge in .pcard .ic) come from the **Lucide** library verbatim. Never hand-draw SVG paths for these cards.

Standard setup: `npm install lucide`, pull the path data from `node_modules/lucide/dist/esm/icons/<name>.mjs`, inline as `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{{COLOR_ACCENT}}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`. Do not modify path `d` values.

Canonical icon assignments in this template (change only if the card content changes):
- Hard water / scale / fixture cards: `shower-head`
- Chemical / PFAS / forever-chemicals cards: `flask-conical`
- Contamination / lead / threat cards: `shield-alert`

Verify any icon name at lucide.dev before assigning to a new card.

## Build Gates (apply throughout every build)

### GATE: ASSET IDENTITY

Every client-provided file (logo, headshot, photos) must be named with the client slug before entering `images/` (e.g. `blue-line-owner-headshot.jpg`). The build prompt renames at intake and REFUSES to wire in any people-photo whose filename lacks the client slug. Unidentifiable photo = silhouette default + flag, never a guess.

### GATE: PROVENANCE

Nothing becomes a source of truth (git seed, template content, published fact) without verification against its origin: folders verify against deploy artifacts or live sites, remotes verify with `git remote -v`, platform claims verify against live documentation, financing and credentials verify against the client or stay generic/HELD.

### GATE: SUSPICIOUS PASS

Any verification that passes trivially (zero tokens to check, zero files to compare) is treated as a failure signal and investigated, not celebrated.

---

## Build Steps (every new site)

1. **Verify remote hygiene** -- Run `git remote -v` and confirm origin is the client's own `[slug]-website` repo, NOT the template. See CRITICAL RULE above.
2. **Fill all `{{TOKEN}}` values** -- Token Reference table above; search for remaining `{{` before deploy.
3. **Supply per-client images** -- Rename each client-provided file with the client slug before placing it in `images/` (GATE: ASSET IDENTITY). Drop `logo.webp`, `logo-footer.webp`, and `owner-headshot.webp` into `images/`. Any people-photo without the client slug in its source filename gets the silhouette default instead. The default stock images (hero-water, equipment-tank, ro-stage-*, lifestyle-*) are already committed. See `images/README.md` for the full slot table.
4. **Generate favicons** -- Edit `DROP_PATH` and fill color in `gen-favicons.mjs` to match the client's primary mark (one bold shape, 70% of a 100x100 viewBox). Never crop from the full logo raster -- a narrow crop fails at 16px. Then run:
   ```
   node gen-favicons.mjs
   ```
   Verify `images/favicon-16x16.png` reads as a clear shape before committing. Outputs `favicon.ico` (site root), `images/favicon-32x32.png`, `images/favicon-16x16.png`, `images/apple-touch-icon.png`. See `images/README.md` for the full design rule.
5. **Set GBP address** -- If client has a physical GBP address, restore `streetAddress` and `postalCode` to all schema blocks and the footer (see Service-Area Business note above).
6. **Fill A2P opt-in path** -- Choose CHAT WIDGET or WEB FORM and configure per the A2P section above.
7. **Create city pages** -- Duplicate `service-area/city-template.html` per city, rename to CITY_SLUG.html, fill tokens. Then **DELETE `service-area/city-template.html`** from the client folder before deploying -- it must never go live.
8. **Update sitemap** -- Replace `{{DOMAIN}}` and add city page URLs.
9. **Run BUILD-VERIFY** -- See BUILD-VERIFY.md. The build is not done until all four checks pass on the deployed draft URL.

## Image Path Standard

All image and favicon `src`/`href` attributes in this template use **root-relative paths** (`/images/logo.webp`, `/favicon.ico`). Root-relative paths resolve correctly from any directory depth and cannot break when a page moves between folders.

**Rule:** Never use bare-relative image paths (`images/logo.webp` or `../images/logo.webp`) in any HTML file. Always use root-relative (`/images/...`).

**When adding a new page in a subdirectory** (`service-area/`, `services/`, or any new folder): before committing, audit every `src=`, `href=`, and `url()` in that file and confirm all image/favicon paths start with `/`. A bare `images/` path in a subdir page will silently 404 on any Linux host.

**og:image and JSON-LD schema "image"** must always reference `/images/logo.webp` (as a full URL: `https://{{DOMAIN}}/images/logo.webp`). There is no `/assets/` directory in this template -- that path has never existed and must never appear in any HTML.

## Known Judgment Calls (review at build time)

- index.html "why your water" section: the three problem cards are now generic (hard water scale, PFAS nationally, chlorine/taste). The HTML comment on the section reads "localize these three cards per client market at build time." For markets with distinctive water issues (lead from aging infrastructure, specific industrial PFAS sources, agricultural runoff), replace card h3 and body copy with locally accurate content before deploy.

## Style Rules

- **Muted text never sits on a colored background.** `.band--sky` and `.band--navy` backgrounds require explicit color overrides for all text elements. CSS already includes `.band--sky .sec-head p{color:var(--color-primary)}` and `.band--sky .eyebrow{color:var(--color-primary)}`. If you add new colored bands or new text elements on existing colored bands, always add an override that passes WCAG AA (4.5:1 contrast ratio for body text).
- **CTAs are always Title Case.** "Get Your Free Water Assessment", "Call Now", "Free Water Assessment". Never lowercase button text or CTA link text, even inside nav or footer. Page `<title>` tags and OG titles follow the same rule.
- **No CSS `text-transform: lowercase` on interactive elements.** `.eyebrow` and `.pc-label` use `uppercase` as a design treatment for non-CTA labels only. Never apply `lowercase` to buttons, links, or CTAs.

## Default Image Licenses

Stock images committed to `images/` are sourced from Pexels and Unsplash under their free-license terms (commercial use permitted, no attribution required). Equipment shots are generic placeholders -- replace with real install photos per client when available. Lifestyle slot files (lifestyle-kitchen, lifestyle-family, lifestyle-shower) ship as labeled SVG placeholders pending real stock sourcing per client.

## Water Filtration Vertical Rules

- Never name Culligan or Kinetico. Approved substitutes: "the brand-name guys", "the salesman in your kitchen" framing.
- Never claim "licensed plumber". Use {{INSTALLER_CREDENTIAL_LINE}} (pattern: "licensed [STATE] installer").
- No fake reviews ever. Use trust band (credentials, guarantees, process steps) until real reviews exist.
- Well water content is optional. The services/well-water-treatment.html page and any well-water sections in about.html are marked OPTIONAL. Include only if client serves well water customers.
- Price-forward hero with price card is a structural pattern -- keep it. Fill {{FLAGSHIP_PRICE}} and {{FINANCING_LINE}}.
- Comparison band (us vs. brand-name guys) is a structural pattern -- keep it. Never name the competitors.
- FAQ section with FAQPage schema is required on homepage. Update Q/A content per client.
- City landing pages: duplicate city-template.html per city, rename to CITY_SLUG.html, fill {{CITY_NAME}}, {{CITY_SLUG}}, {{CITY_LOCAL_CONTENT}}.

## Fingerprint List (Deployed Clients)

Run this grep before any new build to ensure no prior client data bleeds into the new site:

```
grep -ri "blue.line\|bluelinewaterfiltration\|bluebonnet\|gateway.water\|michigan.water\|heartland.home\|peachtree.water\|gold.coast.water\|liberty.water\|libertywatersystems\|267-855-4258\|Philadelphia.*water\|Cherry Hill.*water\|cherry-hill.*water" . --include="*.html" --include="*.xml" --include="*.txt" --exclude-dir=node_modules
```

Expected result: zero matches. Any hit means prior client content leaked into the template or a new client folder.

| Client | City | Phone | Domain | Cities |
|--------|------|-------|--------|--------|
| Blue Line Water Filtration | Metro Detroit, MI | — | bluelinewaterfiltration.com | Metro Detroit area |
| Bluebonnet Water Filtration | Texas | — | — | TX cities |
| Gateway Water Systems | — | — | — | — |
| Michigan Water Pros | Michigan | — | michiganwaterpros.com | MI cities |
| Heartland Home Co | Des Moines, IA | — | heartlandhomeco.com | IA cities |
| Peachtree Water Pros | Georgia | — | — | GA cities |
| Gold Coast Water Pros | — | — | — | — |
| Liberty Water Systems | Philadelphia, PA + South Jersey | 267-855-4258 | libertywatersystems.com | Philadelphia PA; Cherry Hill, Collingswood, Deptford, Haddonfield, Maple Shade, Marlton, Medford, Moorestown, Mount Laurel, Voorhees, Washington Township NJ |

---

## Provenance Note

The Bluebonnet Water Filtration build (2026-07-16, commits e6f96a7 through 1efa182) was incorrectly pushed into this template repo via a wrong remote. The template was decontaminated on 2026-07-18 by re-tokenizing all Bluebonnet-specific values. Structural improvements from that build (CSS layout, nav, band structure, legal pages) were preserved. Color and font values, company data, and all client copy were restored to tokens.
