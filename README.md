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
| {{STREET_ADDRESS}} | Street address only |
| {{CITY}} | City of primary office |
| {{STATE}} | State abbreviation |
| {{ZIP}} | ZIP code |
| {{DOMAIN}} | Domain without protocol (e.g. "yourdomain.com") |
| {{SERVICE_AREA_LABEL}} | Short service area label (e.g. "Metro Detroit") |
| {{FLAGSHIP_PRICE}} | All-in installed price (e.g. "$2,999") |
| {{FINANCING_LINE}} | Financing call-out line (e.g. "from $265/mo, no credit check") |
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
| {{COLOR_LIGHT_FILL}} | Light section fill (source: #DFF7FC sky) |
| {{COLOR_BG}} | Page background / mist (source: #F2F8FA) |
| {{COLOR_TEXT}} | Body text color (source: #16222E ink) |
| {{COLOR_BORDER}} | Border / line color (source: #DCE7EC) |
| {{COLOR_MUTED}} | Muted text color (source: #5B6E7B) |
| {{FONT_HEADING}} | Heading font name (source: Poppins) |
| {{FONT_BODY}} | Body font name (source: Inter) |
| {{INSTALLER_CREDENTIAL_LINE}} | Credential line (e.g. "licensed Michigan installer") |

## A2P Opt-In Path

[BLANK -- fill per client at build time]

Options: CHAT WIDGET or WEB FORM.

- CHAT WIDGET: GHL widget consent language is the opt-in. NO SMS consent checkboxes on any form.
- WEB FORM: add SMS consent checkbox with STOP/HELP language to the lead form only.

## Chat Widget Placement Rule

Place widget script once per page, before closing body tag.
EXCLUDE from: lead form page (free-water-report.html), privacy-policy.html, terms-of-service.html.
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
- free-water-report.html -- lead capture page (GHL form embed, NO chat widget)
- services/whole-home-filtration.html -- flagship service page
- services/reverse-osmosis.html -- RO drinking water service page
- services/well-water-treatment.html -- OPTIONAL well water page
- service-area/city-template.html -- city landing page pattern (duplicate per city, fill tokens)
- sitemap.xml -- update {{DOMAIN}} and regenerate city URLs per your service-area pages
- robots.txt
- images/ -- place client image files here (see images/README.md)

## Water Filtration Vertical Rules

- Never name Culligan or Kinetico. Approved substitutes: "the brand-name guys", "the salesman in your kitchen" framing.
- Never claim "licensed plumber". Use {{INSTALLER_CREDENTIAL_LINE}} (pattern: "licensed [STATE] installer").
- No fake reviews ever. Use trust band (credentials, guarantees, process steps) until real reviews exist.
- Well water content is optional. The services/well-water-treatment.html page and any well-water sections in about.html are marked OPTIONAL. Include only if client serves well water customers.
- Price-forward hero with price card is a structural pattern -- keep it. Fill {{FLAGSHIP_PRICE}} and {{FINANCING_LINE}}.
- Comparison band (us vs. brand-name guys) is a structural pattern -- keep it. Never name the competitors.
- FAQ section with FAQPage schema is required on homepage. Update Q/A content per client.
- City landing pages: duplicate city-template.html per city, rename to CITY_SLUG.html, fill {{CITY_NAME}}, {{CITY_SLUG}}, {{CITY_LOCAL_CONTENT}}.
