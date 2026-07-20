# Buikwe Foundation — Website

A 12-page static site for Buikwe Foundation, built with HTML5, Tailwind CSS (CDN), vanilla JavaScript and Font Awesome. No build step required — open `index.html` directly in a browser, or deploy the folder as-is to any static host (Netlify, Vercel, GitHub Pages, cPanel, etc).

## Structure
```
index.html            Home
about.html             About: story, mission/vision, values, timeline, leadership
programs.html          Skills Training, Workshops, Mentorship, Community Awareness (objectives/activities/outcomes)
gallery.html           Filterable masonry gallery + lightbox
success-stories.html   Detailed beneficiary stories with before/after
events.html            Upcoming + past events, yearly calendar
donate.html            Donation tiers, custom amount, impact calculator, secure payment UI
volunteer.html         Opportunities, benefits, requirements, application form, FAQ
partner.html           Partnership types, how it works, inquiry form
contact.html           Contact info, map placeholder, contact form, newsletter
news.html               Blog-style newsroom with featured post, filters, search, pagination
faq.html                Full categorized FAQ accordion
css/style.css          Design tokens + custom components (slider, carousel, accordion, lightbox, etc.)
js/main.js              All interactivity (nav, slider, counters, carousels, accordion, lightbox, forms)
images/                 Drop real photography here (see note below)
```

## Design
- Palette: navy `#0F172A` background, red `#DC2626` primary accent, yellow `#FACC15` secondary accent.
- Type: Poppins (display/headings) + Inter (body).
- Signature motif: the "sunrise divider" — a small red-to-yellow gradient rule that opens every section, echoing the site's "brighter future" message.

## About the imagery
This environment has no access to stock-photo services, so every photo slot is a styled placeholder (a duotone gradient panel with a Font Awesome icon and caption) rather than a real photograph. Everything is built with real `<img>`-ready markup in mind — to go live:
1. Add real photos to `images/` (classroom, tailoring/hairdressing training, mentorship, community dialogue, graduation, etc., matching each section's caption).
2. Replace each `<div class="ph-img ...">…</div>` block with an `<img src="images/your-photo.jpg" alt="...">`, keeping the surrounding wrapper classes for consistent rounding/hover effects.
3. Add a real embedded Google Map (iframe) in place of the map placeholder on `contact.html`.

## Forms
All forms (volunteer, partnership, contact, donation, newsletter) are front-end only and show a success state on submit. Wire them to your backend, form service (e.g. Formspree), or CRM before go-live.

## Notes
- Fully responsive, keyboard-accessible (visible focus states), respects `prefers-reduced-motion`.
- SEO basics included: titles, meta descriptions, canonical tags, Open Graph/Twitter cards, structured data (NGO schema) on every page.
- NGO Registration No. 701 appears in the footer and relevant FAQ/donation copy.
