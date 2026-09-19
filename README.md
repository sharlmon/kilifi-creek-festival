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
- The selected mockup informed the full-width photographic hero, brand display headings, gold calls to action, alternating light and dark sections, split layouts, and image grids. The brand guide supplied deep teal `#033932`, sunset orange `#FD6910`, golden yellow `#FFCB21`, and sky blue `#6CC3F2`.
- No artists, ticket prices, festival dates, news stories, or other sample information from the mockup was added to the website copy.

## Appearance

The header includes a sun/moon switch for light and dark appearance. Before an explicit choice, appearance follows the visitor's device preference; toggling remembers the choice in browser storage. The control supports keyboard activation and announces its state as a switch. A small initialization script applies the saved selection before the page body renders, and native controls follow the selected color scheme. The current appearance uses warm off-white and charcoal surfaces, restrained gold accents, a floating glass header, and frosted cards with translucent borders and subtle shadows. Heroes place titles directly over the original photographs, with a bottom gradient and a slim glass information strip. `app/assets/glass.css` supplies the shared appearance overrides; `PageHero.vue` owns the consolidated hero styling. Partner artwork remains on white tiles so the original assets stay legible without alteration. The original wording and hero/content image assignments are preserved. The header's backdrop lives in a pseudo-element so it does not trap the mobile menu's fixed positioning; a more opaque fallback covers browsers without backdrop blur.

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

The site is published through the GitHub Pages workflow above.

## Full-image viewer

Hero photos, galleries, team portraits and disclosed posters open in a native modal image viewer on tap/click or Enter/Space. The full image is displayed with `object-fit: contain` and its original alt text, without cropping. The full-size optimized source is requested only when opened; page thumbnails retain their responsive/lazy loading. The viewer supports the close button, Escape, tapping the backdrop, focus containment, focus return and scroll locking. Logos remain navigation/brand artwork. Home image tiles now open photos; the existing text links and navigation still lead to the related pages.

The two poster controls now open the viewer directly: “View original poster” and “View original programme poster”. They no longer expand a large inline image. Both original assets load only after activation, and the viewer returns focus to the poster button when dismissed.

## Image loading improvements

All 48 image assets have regenerated, uncropped WebP candidates with a versioned compression hash. Photos use quality 76, or 70 for larger sizes; posters retain quality 85 for lettering, and logos stay lossless. Enlarged photo previews are capped at 2048 pixels on the long edge. Responsive thumbnails also use a compressed fallback, so unsupported responsive selection does not request a multi-megabyte source. Existing lazy loading, asynchronous decoding, intrinsic dimensions and high-priority heroes remain. Each page preloads its responsive hero using the same candidate list and screen-size hint as the visible image.

Pop-up viewers now load the largest optimized derivative instead of the original source. Downloads still retrieve the original full-resolution file explicitly. Aggregate preview payload falls from 170,360,263 source bytes to 9,104,140 bytes (94.7% smaller); regenerated responsive candidates total 22,506,366 bytes, 22.7% below the previous 29,115,600 bytes. These totals compare files, not a single page download or measured network time. The largest enlarged preview is 628,770 bytes. The 11,602,685-byte gallery source now previews as a 323,542-byte image; the mobile homepage selected a 58,042-byte hero candidate, down from 82,522 bytes. Details are in `image-optimization.json`.

All seven routes passed desktop and mobile browser checks with loaded heroes, no broken loaded images and no horizontal overflow. Hero preload candidate lists matched the rendered images. Both poster previews and a formerly large gallery image were visually reviewed. Results are in `image-browser-verification.json`. Source photographs/artwork and website copy are unchanged. Original files and prior hashed derivatives remain available for explicit downloads and older cached page versions. GitHub Pages controls production cache headers; the local server's immutable derivative headers do not override its policy.

## Reading, navigation and coastal background

Poster and photo modals now support 100–500% zoom, drag to pan, wheel zoom, double-click zoom, keyboard + / − / 0 and arrow controls, and an original-asset download link. Pointer gestures support mobile pinch. Browser checks confirmed zoom, dragging, reset, dismissal, focus return, download targets and 44-pixel controls at mobile widths. Physical multi-touch pinch was not exercised by the available browser controls.

Reading columns are limited to 65 characters with consistent heading hierarchy and section spacing. Primary, secondary and text actions share restrained styling. Long pages offer a horizontally scrollable “On this page” shortcut bar below the hero; anchor destinations remain clear of the compact fixed menu. Headquarters information forms a compact location card with Google Maps and directions links based solely on the original Mnarani, Bandari Beach, Kilifi address. Archived screening venues keep their original names; unverified street addresses are not inferred.

The location card replaces the embedded Google Maps iframe on the homepage and contact page. Its inline coastal/location artwork adds no image request, and Google Maps loads only after a visitor selects “Open in Google Maps” or “Get directions”. This removes Google map scripts and tiles from page loading while keeping both navigation actions.

The separate decorative sunset/ocean/birds layer uses 45% opacity and a 16-pixel blur behind neutral content surfaces in both themes. Original festival photos, hero images and copy remain intact. Its locally hosted, content-hashed WebP is 88,948 bytes, and it has no interactions or accessibility-tree content.

Generated background: `public/assets/ambience/coastal-sunset-1139e87eb8f6.webp`. Mode: new image generation using the built-in image tool, followed by WebP compression. Prompt:

> Use case: photorealistic-natural. Asset type: decorative background for the Kilifi Creek Festival website content sections, not a hero replacement. Generate a wide landscape image of a calm Kenyan coastal ocean at sunset: soft golden sun low on a level horizon, muted sunset orange sky fading into pale sky blue, dark deep teal ocean with gentle wave ripples, a few small birds silhouetted naturally in the sky. Atmospheric, tranquil, natural photography style. Simple spacious composition without busy foreground elements, suitable for a subtle blurred background at 25 percent opacity behind text panels. No people, buildings, boats, logos, typography, text, watermarks or borders. Keep the image softly atmospheric but not heavily blurred in the source so blur can be controlled by CSS. Landscape 1536x1024 or wider.
