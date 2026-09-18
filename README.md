# Kilifi Creek Festival — Nuxt rebuild

The original seven-page site was found at `/Users/admin/Desktop/terrace/kilificreekfestival`. This rebuild is isolated here so the original files remain available for comparison.

## Run

Requires Node.js 22.19 or newer.

```sh
npm install
npm run dev
```

For production:

```sh
npm run build
NITRO_HOST=127.0.0.1 NITRO_PORT=4317 node .output/server/index.mjs
```

The review preview uses `http://127.0.0.1:4317`.

## Content and assets

- All seven original pages are represented: Home, About, Screenings, Industry, Team, Press, Contact.
- `app/assets/content.json` contains the extracted original copy and semantic HTML. Whitespace between words is normalized by the browser; spelling, punctuation, capitalization, and wording are preserved.
- `scripts/source-copy/` contains the original HTML for comparison. Its scripts are never executed by the new site.
- `public/assets/` includes the original image files and smaller WebP derivatives for display.
- `public/assets/brand/` contains the two actual transparent logo images extracted from page 2 of the supplied KCF brand identity PDF, rather than an approximation of the artwork.
- The selected mockup informed the full-width photographic hero, serif headings, gold calls to action, alternating light and dark sections, split layouts, and image grids. The brand guide supplied deep teal `#033932`, sunset orange `#FD6910`, golden yellow `#FFCB21`, and sky blue `#6CC3F2`.
- No artists, ticket prices, festival dates, news stories, or other sample information from the mockup was added to the website copy.

## Appearance

The header includes a sun/moon switch for light and dark appearance. Before an explicit choice, appearance follows the visitor's device preference; toggling remembers the choice in browser storage. The control supports keyboard activation and announces its state as a switch. A small initialization script applies the saved selection before the page body renders, and native controls follow the selected color scheme. The current appearance uses warm off-white and charcoal surfaces, restrained gold accents, a floating glass header, and frosted hero/cards with translucent borders and subtle shadows. `app/assets/glass.css` supplies the shared appearance overrides. Partner artwork remains on white tiles so the original assets stay legible without alteration. The original wording and hero/content image assignments are preserved. The header's backdrop lives in a pseudo-element so it does not trap the mobile menu's fixed positioning; a more opaque fallback covers browsers without backdrop blur.

## Interactive submissions

The homepage renders the original poster's six date/label pairs as selectable milestones. Selecting a milestone updates its detail and calendar download. Calendar files contain all-day 2026 events; dates and FilmFreeway links remain faithful to the original poster. The original image remains available through “View original poster.” No submission opening status, eligibility, or fees are invented.

## GitHub deployment

Repository: https://github.com/sharlmon/kilifi-creek-festival

Website: https://sharlmon.github.io/kilifi-creek-festival/

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds Nuxt using its GitHub Pages preset, verifies the generated asset paths, and publishes the static output. The build uses `NUXT_APP_BASE_URL=/kilifi-creek-festival/`; navigation, original HTML links, image variants, preloaded fonts, and calendar downloads respect that base path. Original `.html` URLs receive static redirect aliases. GitHub Pages supplies its own HTTP caching policy; application server cache-header rules do not override it. The contact form retains its existing mail-draft behaviour.

## Brand identity and supplied 2026 highlights

`app/assets/brand.css` defines the exact supplied palette: Deep Teal `#033932`, Sunset Orange `#FD6910`, Golden Yellow `#FFCB21`, and Sky Blue `#6CC3F2`. Colours are used for brand accents, navigation, actions and highlights over the existing neutral glass surfaces. The homepage includes the exact newly supplied copy: “OUR 2026 HIGHLIGHTS”, “2,500 / On site guests”, “33 / Films screened”, and “120 / Creatives trained”. Existing 2025 archive statistics are retained in their original context.

The user supplied Afolkalips and Lemon Milk font archives. Their original fonts are converted without subsetting into locally hosted WOFF2 files: Afolkalips regular for display headings, and Lemon Milk regular, medium and bold for text and controls. The four webfonts total 119,788 bytes, about 55% smaller than the source font files. The primary display and regular text files are preloaded; all use swap rendering and content-hashed filenames with immutable caching. Source details are in `app/assets/fonts.json`, and actual browser font loading was confirmed across all seven routes.

## Navigation and image loading

The glass menu ribbon remains fixed while scrolling, with a more opaque background over page content. Its desktop height is 76 pixels at the top and 60 pixels after scrolling; tablet/mobile height is 68 then 58 pixels. The logo scales down with the ribbon, controls retain at least 44-pixel tap heights, and reduced-motion preferences disable the size transition. Anchor scrolling and sticky team portraits account for the compact ribbon's height.

All rendered images use responsive WebP candidates generated without cropping or replacing the original artwork. Heroes load eagerly at high priority; below-fold content loads lazily with asynchronous decoding and intrinsic dimensions. Lossless logo derivatives retain transparency. Hash-named derivatives use a one-year immutable cache policy. Regenerate them with `scripts/optimize-images.py` when source assets change. The 390-pixel browser check selected an 82,522-byte homepage hero instead of the previous 296,858-byte fallback (72% smaller); the desktop header selected a 12,904-byte logo instead of the 270,053-byte PNG (95% smaller). These are file-size reductions, not claims about real-world network timing.

## Interactive programme

The screenings page presents all 11 original 2025 poster session groups in an agenda grouped by day. A compact toolbar combines day, venue, search, and shortlist filters. Sessions begin collapsed; opening a row reveals every original film title, credit, and note. Search opens matching sessions automatically, and visitors can expand or collapse all results without losing their query. Saving sessions stores only their identifiers on the visitor's device; the shortlist persists across reloads. The original programme poster, invitation-only restrictions, RSVP notice, recap statistics, gallery, and 2026 coming-soon copy are retained. No dates beyond the poster's day labels, individual film times, or booking service are inferred.

## Contact form

The original form had no working delivery handler or configured email service. The rebuilt form validates its required fields and opens a draft in the visitor's email app, addressed to the original festival contact, with the entered name, email, and message preserved. An explicit note explains this behavior. The visitor sends the draft themselves. Direct server-side delivery would require an email service and its credentials.

## Verification

With the production preview running:

```sh
CHECK_URL=http://127.0.0.1:4317 npm run check
```

This checks the original text phrases on every rendered page, image-file references, internal navigation, placeholder links, legacy `.html` redirects, replacement of the old standalone festival logo, and 404 handling. See `AUDIT.md` for the findings and browser review.

The site is ready for local review and has not been published.
