# UrbanNest Realty — Real Estate Website

A complete, responsive real-estate website for a fictional company operating in
Awka, Anambra State, Nigeria. Built with plain HTML5, CSS3 and vanilla
JavaScript (ES modules) — no frameworks.

## Pages

| Page                    | Purpose                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| `index.html`            | Homepage — hero search, featured listings, categories, trust section  |
| `properties.html`       | Search & filter every listing, with sorting and URL-shareable filters |
| `property-details.html` | Single reusable page for any listing, loaded via `?id=property-001`   |
| `about.html`            | Company story, mission/vision, values, team                           |
| `contact.html`          | Contact details + validated inquiry form                              |

There is **one** `property-details.html`, not one file per property.
JavaScript reads the `id` query parameter and renders the matching listing
from the dataset in `js/data/properties.js`.

## Folder structure

```
real-estate-website/
├── index.html / properties.html / property-details.html / about.html / contact.html
├── css/
│   ├── style.css        → design tokens (:root variables) + all component styles
│   └── responsive.css   → breakpoints (1024 / 900 / 768 / 480) + reduced-motion
├── js/
│   ├── data/properties.js     → the property dataset + helper queries
│   ├── components/            → navbar.js, footer.js, propertyCard.js
│   ├── pages/                 → one script per page (home, properties, property-details, about, contact)
│   ├── utils.js                → formatting, image-fallback, WhatsApp link, URL helpers
│   └── main.js                 → mounts navbar + footer on every page
└── assets/images/…             → placeholder SVGs (see below)
```

## Editing the design

Every colour, radius, shadow and font in the site comes from the CSS
variables at the top of `css/style.css`:

```css
:root {
  --primary-color: #1f4d3b;   /* deep green */
  --secondary-color: #c9a227; /* gold */
  --background-cream: #f4f1ea;
  ...
}
```

Change `--primary-color` once and the navbar, buttons, badges, icons and
footer all update together.

## Placeholder images

Every image in this project is a lightweight generated **SVG placeholder**
(deep-green/gold diagonal-stripe pattern with a text label), living under
`assets/images/`. They keep the site fast and dependency-free while you
gather real photography. Replace them with real `.webp` photos using the
**same filenames and folders** (e.g. `assets/images/properties/property-001/exterior.webp`)
and update the `images` field for that property in `js/data/properties.js`
if you rename anything. A shared `assets/images/placeholder.svg` is used as
the automatic fallback if any image fails to load — see
`withImageFallback()` in `js/utils.js`.

## What still needs backend work before launch

1. **Contact form** (`js/pages/contact.js`) — validation is fully working,
   but submission is currently a frontend-only simulation. Wire the
   `handleSubmit()` function to Formspree, EmailJS, or your own API.
2. **WhatsApp / phone number** — replace the placeholder number in
   `js/utils.js` (`COMPANY_WHATSAPP`, `COMPANY_PHONE`) with the real line.
3. **Canonical URLs** — each page has a `<link rel="canonical">` pointing at
   `https://www.example.com/...`; update the domain once the site is live.
4. **Donation flow** — not part of this real-estate site; if you're
   reusing this scaffold for a donation-based site, that flow will need a
   separate backend/payment integration.

## Adding or editing properties

Everything about a listing — price, type, purpose, location, bedrooms,
features, description, images — lives in one object inside
`js/data/properties.js`. Add a new object to the `properties` array (with a
unique `id` like `property-013`) and it will automatically appear in
search results, featured sections, and be reachable at
`property-details.html?id=property-013`. Nothing needs to be duplicated in
HTML.

## Browser support

Built with modern evergreen browsers in mind (ES modules, `URLSearchParams`,
`aspect-ratio`). No build step required — open `index.html` via a local
server (not `file://`, since ES modules require HTTP) to run it.
