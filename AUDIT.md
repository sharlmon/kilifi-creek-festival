# Site audit and rebuild

## Original inventory

Seven HTML pages, a generated Tailwind stylesheet, a second Tailwind runtime loaded from a CDN, Alpine loaded from a CDN, duplicated navigation and footer markup, scroll scripts, maps, partner logos, team portraits, a programme poster, a submissions poster, and festival photography. No Nuxt application, submission backend, or deployment configuration was present in the supplied folder.

## Repairs

| Finding | Resolution |
| --- | --- |
| Partner images needed consistent sizing; the original filenames were verified as valid. | Each partner logo uses the actual supplied asset, bounded dimensions, and a responsive grid. |
| Two independent Tailwind versions and several remote script/font dependencies. | Replaced with bundled Nuxt/Vue code and shared local stylesheets. Core rendering no longer depends on those CDNs. |
| Scroll-reveal content initially invisible until custom JavaScript runs. | All copy and sections render immediately, including server-rendered pages. |
| Footer social icons link to `#`. No account URLs are supplied. | Removed empty social actions; retained every text phrase and added a working email action. No social account addresses were invented. |
| Contact form has no working submit handler. | Required-field validation and a prepared email draft, with its behavior disclosed beside the form. |
| Mobile controls lack names, menu state, and focus handling. | Named toggle, expanded state, Escape dismissal, focus containment, and closing on navigation. |
| Repeated page chrome and inconsistent styling. | Shared header, footer, logo, and hero components; consistent buttons, typography, spacing, and brand colors. |
| Legacy static URLs must remain usable. | Seven `.html` URLs redirect to the corresponding Nuxt routes. |
| Original photos are large. | Display uses resized WebP versions; original image assets are retained. |
| New visual identity supplied after initial inspection. | Extracted the actual light- and dark-background logo PNGs from the supplied PDF and replaced standalone old-logo references. Historical logos embedded in documentary photos and posters are retained with their original images. |
| Partner images inherited an overly large programme-poster size during initial browser review. | Added explicit partner sizing and verified homepage overflow again after the correction. |
| Header logo artwork slightly clipped at the bottom. | Adjusted the logo viewport to retain the complete supplied lockup. |
| Inconsistent colors and no appearance preference. | Shared neutral light/dark surface colors, restrained gold accents, consistent cards/buttons, and a Light/Dark/System selector. Saved choices apply before the body renders; System follows device appearance. |
| User requested a more minimal, glassy appearance with less green. | Warm off-white and charcoal backgrounds, floating frosted navigation, translucent cards and slim hero information strips, quieter headings, and a sun/moon theme toggle. Original brand artwork and photography are preserved. The header backdrop uses a pseudo-element to retain full-screen mobile navigation. |
| Hero overlays obscured too much photography. | Titles now sit directly on the original photos without a blurred caption card. A localized bottom gradient preserves readability, and a slim glass strip groups the unchanged date, location and homepage action. |
| User found interior hero photographs difficult to see. | Interior heroes now scale from 500 to 720 pixels on larger screens with a 520-pixel mobile minimum. Homepage heroes use a 600–880-pixel desktop range and 640-pixel mobile minimum. Upper photography is clear, image opacity is 1 with no filter, and blur is confined to the information strip. No photograph or wording was replaced. |
| Submissions dates were embedded in a static poster. | Transcribed all six original date/label pairs into selectable milestones with matching all-day calendar downloads. Existing invitation and FilmFreeway destinations are preserved; the original image remains in a poster disclosure. No current opening status or fees are inferred from historical dates. |
| The 2025 programme was only available as a poster. | Transcribed its 11 session groups into an interactive agenda with day/venue filters, film and filmmaker search, and a persistent device-local shortlist. Every session retains its original venue, time where supplied, credits, Q&A text, and invitation note. The original poster and RSVP notice remain available, with clear archive context. |
| The interactive programme's date strip and uneven card grid were visually crowded. | Replaced them with one compact filter toolbar and aligned agenda rows grouped by day. Film lists are expandable, search opens matching results automatically, and bookmark controls retain the existing shortlist. The unified glass container uses restrained typography and separators. |

## Preserved structure

Following the user's image correction, the original hero photographs are explicitly mapped per page: Home `home.jpg`, About `imageA.jpg`, Screenings `image6.jpg`, Industry `image3.jpg.jpeg`, Team `image5.jpg`, Press `imageB.jpg`, and Contact `image4.jpg`. The hero regression check compares these against the original HTML. No copy or other image assignments changed in this correction.

Home retains the festival date/location, name, water theme, full introduction, all three original visual cards, partners, submissions flyer and invitation, team introduction, headquarters details, map, navigation, and copyright. About retains both introduction paragraphs, the inaugural edition statistics, the return announcement, and all ten gallery images. Screenings retains the recap, programme poster, statistics, five images, and coming-soon message. Industry retains all three paragraphs and its original images. Team retains every biography and portrait. Press retains all five outlets and press enquiry copy. Contact retains every original field label, contact detail, and the location map.

## Checks

- Actual Afolkalips and Lemon Milk loading passed all 70 route/theme/width combinations (seven pages, light/dark, 1440/1024/768/390/320 pixels), with no horizontal overflow or clipped headings. Lemon Milk medium also loaded in expanded programme details. The supplied-font screenshots were reviewed, and all four files passed HTTP media-type, container, byte-length and immutable-cache checks. Results are in `font-verification.json`.

- The compact ribbon passed top/scrolled size checks at 1920, 1440, 1024, 768, 390 and 320 pixels. It shrinks from 76 to 60 pixels on desktop and 68 to 58 pixels on tablet/mobile, remains fixed, and retains visible controls at least 44 pixels high. No navigation clipping or page overflow occurred. The scrolled mobile overlay still covers its full 320×900 viewport, locks body scrolling and dismisses with Escape. Results are in `compact-menu-verification.json`.

- The exact supplied brand colour tokens and 2026 highlight wording were verified in the browser. All 28 combinations (seven pages, light/dark, 1440/320 pixels) passed without horizontal overflow, clipped headings or unloaded hero images. Source-preservation checks still pass. These initial layout checks used fallback fonts; the supplied-font checks below supersede them.

- The fixed menu ribbon passed scrolling checks on all seven pages at 1440 and 390 pixels, with no horizontal overflow or broken visible images. The mobile overlay, scroll locking and Escape dismissal passed while scrolled. All 68 rendered image references have responsive candidates, size hints, intrinsic dimensions and async decoding; hero priority, content lazy loading, derivative existence and immutable cache headers passed the automated check. Results are in `scrolling-menu-verification.json`. Original assets and copy are unchanged.

- The final agenda passed eight day filters, nine venue filters, combined search/filter and empty/reset states, keyboard expansion, individual/all-result expansion and collapse, query retention, and shortlist save/remove/reload persistence. Ten expanded-layout combinations passed at widths of 1440, 1024, 768, 390 and 320 pixels in light and dark themes, with no overflow or broken loaded images; all tested controls met a 44-pixel minimum height. Browser warnings and errors were absent. Results are in `programme-agenda-verification.json`.

- Hero visibility passed all seven pages at widths of 1440, 768, 390 and 320 pixels: original images loaded, no horizontal overflow, caption boxes contained, no photo filters, and no full-photo tint. Desktop interior caption panels cover 8.4% of their hero area. Desktop/mobile screenshots were inspected; details are in `hero-visibility-verification.json`.

- The theme dropdown was replaced with a 72×44 sun/moon switch. Click, Space activation, reload persistence, mobile menu focus order, and layouts at 1440, 768, 390 and 320 pixels passed. Device appearance is followed until the visitor chooses light or dark; existing saved choices remain compatible.

- Nuxt production compilation and prerendering succeeded for all seven pages.
- Automated comparison passed for 318 original text phrases, 66 rendered image references, 111 internal navigation links, seven legacy redirects, and unknown-route 404 handling.
- All 105 browser combinations passed: seven pages, Light/Dark/System modes, and widths of 1440, 1024, 768, 390, and 320 pixels. No horizontal overflow or broken loaded images were found.
- Saved theme persistence, explicit Light overriding a dark device preference, System appearance, mobile keyboard focus containment, Escape dismissal, and menu closing on desktop resize were verified. Browser errors and warnings were absent.
- Sampled body text, input text, placeholders, and primary-button text exceeded 4.5:1 contrast in both themes; sampled input boundaries exceeded 3:1. These are targeted contrast checks, not a complete accessibility certification.
- Screenshots were inspected in both themes and on mobile. Final browser results are recorded in `verification.json`.
- The package installation reported zero known dependency vulnerabilities.
- External checks returned HTTP 200 for the three biography destinations (I'll Tell You My Story, The Terrace, and Afrofilms). FilmFreeway returned HTTP 403 to the automated checker; its original submission URL is retained, and its visitor-facing availability was not conclusively verified.

## Limits

The glass appearance passed 105 page/width/mode combinations, with no horizontal overflow or broken loaded images. All three SVG icons and saved moon icon after reload passed. The mobile menu covered the full 320×900 viewport with focus containment, Escape dismissal, and scroll locking intact. Sampled composited contact/body contrast ratios ranged from 6.43:1 to 15.89:1 for text and from 3.59:1 to 3.80:1 for input boundaries. Results are in `glass-verification.json`; these targeted checks do not constitute a full accessibility certification.

Programme checks passed all eight day filters and nine venue filters, combined filters, case-insensitive film search, filmmaker search with apostrophe variations, empty states, reset, keyboard activation, save/remove, and reload persistence. All 15 width/theme combinations passed without overflow or broken loaded images. Original poster opening/loading and keyboard dismissal passed. Results are recorded in `programme-verification.json`.

The interactive submissions timeline passed all six milestone/calendar checks, keyboard activation and poster disclosure checks, and 15 viewport/theme combinations without overflow. Calendar exports use the original poster's 2026 dates, including correct next-day ends across month boundaries. Results are in `submissions-verification.json`.

External submission and biography links retain the addresses from the original site. Third-party availability is outside this rebuild; no unsupported replacement destinations were invented. Google Maps still requires the visitor's network connection. The supplied Afolkalips and Lemon Milk font archives are now converted to locally hosted WOFF2 files; the exact supplied logo artwork is retained. GitHub Pages deployment is configured. An optional server-side email provider is not configured.

### Hero redesign

Replaced the large frosted caption cards on all seven pages with direct-on-photo headings and a slim date/location strip. The homepage submission action stays visible in that strip and becomes full-width on phones. Interior strips fit their content. Hero styles now live in the shared component; superseded overrides were removed from all four global stylesheets. All seven pages passed checks at 1440, 768, 390 and 320 pixels with no horizontal overflow, clipped title/info areas or unloaded heroes. Desktop and mobile screenshots were inspected in both appearances. The production build and full source-content checks passed (318 original phrases, 68 image references, 111 local links).

### Expandable photos

Added a shared on-demand full-image viewer to all photographic images and posters, including images emitted from the preserved source HTML. Controls support click/tap and Enter/Space, and have accessible dialog labels. Native modality plus explicit Tab/Shift-Tab containment keeps focus inside; Escape, the close button and backdrop dismiss it, restore scrolling and return focus to the triggering photo. Images use containment rather than cropping; their original alt descriptions are preserved. Brand/partner logos stay outside the viewer. All seven hero viewers passed at 1440 and 320 pixels, and original HTML galleries, a team portrait and the programme poster passed interactive checks. Keyboard opening, closing, focus return, focus containment and mobile backdrop dismissal passed. The source-preservation check still passes all 318 original phrases and 68 image references.

### Direct poster modals

Replaced both inline poster disclosures with native buttons opening the shared modal directly. The original labels, poster assets and transcribed programme/submission text remain intact. Verified direct click opening, keyboard activation, Escape/close-button dismissal, focus return, scroll restoration and full uncropped display on desktop and mobile. The regression check now verifies both poster controls and on-demand assets. It excludes only the standalone decorative clapperboard emoji that the user previously requested redesigning; all 305 original copy phrases remain checked.

### Six usability refinements and coastal atmosphere

Added zoom/pan/download controls, restrained reading columns, shared action styles, section shortcuts, headquarters/directions cards and consistent section/card spacing. A separate 88,948-byte generated sunset/ocean/birds background is rendered at 25% opacity with 16-pixel blur. Existing hero images and original copy are retained. Desktop light/dark screenshots and 390/320-pixel layouts were reviewed; targeted browser checks passed zoom, dragging, keyboard reset, dismissal, focus return and shortcuts with no horizontal overflow or captured browser errors. Physical multi-touch pinch is implemented but was not exercised by the available controls. The final production build passed, and regression checks passed 7 routes, 7 original heroes, 305 exact source phrases, 66 image references, 136 links including shortcut targets, both poster assets and the optimized background.

### All-image loading pass

Found that full-image dialogs still requested source files up to 11.6 MB. Replaced automatic previews with uncropped, compressed derivatives, retaining originals for explicit downloads. Regenerated all 48 assets with versioned URLs and compressed image fallbacks, and added responsive hero preloads. Aggregate full-preview bytes decrease 94.7%, and derivative bytes decrease 22.7%; these are file-size savings, not measured load-time percentages. Browser checks passed all 7 routes at 1440 and 390 pixels with loaded heroes, no broken loaded images or horizontal overflow. Preload candidates match visible hero candidates; both posters and a large gallery preview were visually inspected. Production build and the existing source-preservation/asset/link checks pass. Chrome performance tracing is unavailable in this environment, so no Lighthouse score or Core Web Vitals measurement is claimed.

### Lightweight location card

Replaced both transformed Google Maps iframes with a local inline-SVG location card. The venue name and original Mnarani, Bandari Beach, Kilifi address remain visible, with direct “Open in Google Maps” and “Get directions” actions. No map iframe, scripts, tiles, external preview image or API key loads with either page. Desktop and 390-pixel layouts passed with zero overflow, 48-pixel action targets and zero main-content iframes. Regression checks still pass all 305 original source phrases and now assert that the map embeds are absent on both affected routes.
