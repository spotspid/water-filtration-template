# Water Filtration Vertical Template

Stripped from Michigan Water Pros (michiganwaterpros.com) on 2026-07-10.

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
- service-area/city-template.html -- city landing page pattern (duplicate per city, fill tokens)
- sitemap.xml -- update {{DOMAIN}} and regenerate city URLs per your service-area pages
- robots.txt
- images/ -- place client image files here (see images/README.md)

## Icon Rule

Problem-card icons (the rounded badge in .pcard .ic) come from the **Lucide** library verbatim. Never hand-draw SVG paths for these cards.

Standard setup: `npm install lucide`, pull the path data from `node_modules/lucide/dist/esm/icons/<name>.mjs`, inline as `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{{COLOR_ACCENT}}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`. Do not modify path `d` values.

Canonical icon assignments in this template (change only if the card content changes):
- Hard water / scale cards: `droplets`
- Chemical / PFAS / forever-chemicals cards: `flask-conical`
- Contamination / chlorine / off-water cards: `droplet-off`

Verify any icon name at lucide.dev before assigning to a new card.

## Known Judgment Calls (review at build time)

- index.html "why your water" section (lines ~281-283): contains three Michigan-specific problem cards referencing "Michigan's limestone geology", "Michigan is a national PFAS hotspot / automotive corridor", and chlorine from municipal treatment. These survived the strip because the third card is generic but the first two are MWP-geography. When building for a non-Michigan market, rewrite those two cards with local water quality context before deploy.

## Water Filtration Vertical Rules

- Never name Culligan or Kinetico. Approved substitutes: "the brand-name guys", "the salesman in your kitchen" framing.
- Never claim "licensed plumber". Use {{INSTALLER_CREDENTIAL_LINE}} (pattern: "licensed [STATE] installer").
- No fake reviews ever. Use trust band (credentials, guarantees, process steps) until real reviews exist.
- Well water content is optional. The services/well-water-treatment.html page and any well-water sections in about.html are marked OPTIONAL. Include only if client serves well water customers.
- Price-forward hero with price card is a structural pattern -- keep it. Fill {{FLAGSHIP_PRICE}} and {{FINANCING_LINE}}.
- Comparison band (us vs. brand-name guys) is a structural pattern -- keep it. Never name the competitors.
- FAQ section with FAQPage schema is required on homepage. Update Q/A content per client.
- City landing pages: duplicate city-template.html per city, rename to CITY_SLUG.html, fill {{CITY_NAME}}, {{CITY_SLUG}}, {{CITY_LOCAL_CONTENT}}.
