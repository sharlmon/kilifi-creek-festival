import { readFile, access } from 'node:fs/promises'
import assert from 'node:assert/strict'
const root = new URL('../', import.meta.url)
const origin = process.env.CHECK_URL || 'http://127.0.0.1:3000'
const assetMap = JSON.parse(await readFile(new URL('app/assets/asset-map.json', root), 'utf8'))
const responsive=JSON.parse(await readFile(new URL('app/assets/responsive-images.json',root),'utf8'))
const teamAdditions=JSON.parse(await readFile(new URL('app/assets/team-additions.json',root),'utf8'))
const legacyRoutes = {'index.html':'/','about-us.html':'/about','screenings.html':'/screenings','industry.html':'/industry','team.html':'/team','press.html':'/press','contact-us.html':'/contact'}
const addedRoutes = ['/partners','/visit','/impact','/why-kilifi','/gallery']
const routeRecords = [...Object.entries(legacyRoutes).map(([file,path])=>({file,path})),...addedRoutes.map(path=>({file:null,path}))]
const allRoutes = routeRecords.map(({path})=>path)
const publicSite='https://sharlmon.github.io/kilifi-creek-festival'
const decode = s => s.replace(/&#(x[\da-f]+|\d+);/gi,(_,v)=>String.fromCodePoint(v[0].toLowerCase()==='x'?parseInt(v.slice(1),16):Number(v))).replace(/&(amp|quot|apos|lt|gt|nbsp|copy|rarr);/g,(_,v)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',copy:'©',rarr:'→'}[v]))
const clean = s => s.replace(/<!--[\s\S]*?-->/g,'').replace(/<(script|style)[\s\S]*?<\/\1>/g,'')
const norm = s => decode(s).replace(/\s+/g,' ').trim()
const failures=[]
let phrases=0, assets=0, links=0
for(const {file,path} of routeRecords) {
  const response=await fetch(origin+path)
  assert.equal(response.status,200,path)
  const html=await response.text()
  const canonical=publicSite+(path==='/'?'/':path)
  assert(html.includes(`rel="canonical" href="${canonical}"`),`Canonical URL missing on ${path}`)
  assert(html.includes(`property="og:url" content="${canonical}"`),`Open Graph URL missing on ${path}`)
  assert(html.includes(`property="og:image" content="${publicSite}/assets/brand/kcf-social-card.jpg"`),`Social sharing image missing on ${path}`)
  assert(html.includes('name="twitter:card" content="summary_large_image"'),`Twitter card missing on ${path}`)
  assert(html.includes('name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"'),`Crawler directives missing on ${path}`)
  assert(html.includes('rel="icon" href="/favicon.ico"') || html.includes('rel="icon" href="/kilifi-creek-festival/favicon.ico"'),`Favicon missing on ${path}`)
  assert(html.includes('http-equiv="Content-Security-Policy"'),`Content Security Policy missing on ${path}`)
  assert(html.includes('name="referrer" content="strict-origin-when-cross-origin"'),`Referrer policy missing on ${path}`)
  assert(!/<(?:script|iframe|object|embed)\b/i.test(clean(html).replace(/<script[^>]*type="application\/(?:ld\+json|json)"[\s\S]*?<\/script>/g,'')),`Unsafe rendered element found on ${path}`)
  for(const tag of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) assert(/\brel="[^"]*noopener[^"]*noreferrer[^"]*"/.test(tag),`External tab lacks isolation on ${path}`)
  if(path === '/' || path === '/contact') {
    assert(!html.includes('output=embed'),'Google Maps iframe should not load with the page')
    assert(!html.includes('title="The Terrace Kilifi location"'),'Interactive map iframe should be replaced')
    assert(html.includes('Open in Google Maps') && html.includes('Get directions'),'Lightweight venue card actions must render')
    assert(html.includes('fill="#EA4335"'),'Location card must use the familiar red map pin')
  }
  if(path === '/') {
    assert(/<h1[^>]*>KILIFI CREEK FESTIVAL<\/h1>/.test(html),'Homepage title must remain on one line')
    for(const phrase of ['OUR 2025 HIGHLIGHTS','1,000+','33','Films from 15 countries','47','Screenings across 7 venues','20+','Local businesses engaged','12','Filmmakers hosted','800','Reached through free community screenings','OUR 2026 GOALS','5,000','Creatives directly trained','14','Workshops and mentorship sessions','18','Panels and industry discussions']) assert(html.includes(phrase),`Missing supplied homepage impact content: ${phrase}`)
    for(const phrase of ['Set along the winding waters of Kilifi Creek','Through Creekside screenings','Join us from 23–31 October 2026','VIEW 2026 PROGRAMME','PARTNER WITH US','PLAN YOUR VISIT']) assert(html.includes(phrase),`Missing supplied homepage rewrite: ${phrase}`)
    for(const phrase of ['SUBMISSIONS CLOSED','Film Submissions Are Now Closed','The confirmed programme will be shared in due time.']) assert(html.includes(phrase),`Missing current submissions status: ${phrase}`)
    for(const stale of ['CALL FOR ENTRIES OPENS','EARLY BIRD DEADLINE','REGULAR DEADLINE','LATE DEADLINE','EXTENDED DEADLINE','SUBMIT YOUR FILM HERE:','Submit on FilmFreeway']) assert(!html.includes(stale),`Outdated submission content remains: ${stale}`)
    assert(html.includes(`data-image-original="${assetMap['home-hero-2026.jpg']}"`),'Homepage must use the supplied high-resolution hero image')
    assert(html.includes(`data-image-original="${assetMap['home.jpg']}"`),'Homepage introduction must retain its existing festival photograph')
    assert(html.includes(`data-image-original="${assetMap['drive-2026/festival-discussion.jpg']}"`),'Homepage must use the supplied festival discussion photograph')
    assert(html.includes(`data-image-original="${assetMap['drive-2026/outdoor-screening.jpg']}"`),'Homepage must use the supplied outdoor screening photograph')
  }
  const original=file ? clean((await readFile(new URL('scripts/source-copy/'+file,root),'utf8')).split('<body')[1].split('</body>')[0]) : ''
  if(file) {
    const originalHero = original.match(/bg-\[url\(['"]?\.\/([^'"\)\]]+)/)?.[1]
    const renderedHero = html.match(/<img[^>]*class="hero-image"[^>]*>/)?.[0].match(/data-image-original="([^"]+)"/)?.[1]
    const suppliedHero = {
      '/about': assetMap['drive-2026/outdoor-screening.jpg'],
      '/industry': assetMap['drive-2026/industry-hero.jpg'],
      '/team': assetMap['drive-2026/team-hero.jpg']
    }[path]
    const expectedHero = suppliedHero || (path === '/' ? assetMap['home-hero-2026.jpg'] : assetMap[originalHero])
    assert.equal(renderedHero, expectedHero, `Expected hero image must render on ${path}`)
  }
  assert(html.includes('rel="preload" as="image"'),'Hero should be discovered from the document head')
  const text=norm(clean(html).replace(/<[^>]+>/g,' '))
  if(path === '/screenings') {
    for(const phrase of ['FESTIVAL AND INDUSTRY PROGRAM','23–31 OCTOBER 2026','FRIDAY','23 OCTOBER 2026','SATURDAY','24 OCTOBER 2026','SUNDAY','25 OCTOBER 2026','MONDAY','26 OCTOBER 2026','TUESDAY','27 OCTOBER 2026','WEDNESDAY','28 OCTOBER 2026','THURSDAY','29 OCTOBER 2026','FRIDAY','30 OCTOBER 2026','SATURDAY','31 OCTOBER 2026','Festival Screenings','Industry Sessions','Venue','Time','XXX']) assert(text.includes(phrase),`Missing 2026 programme content: ${phrase}`)
    assert.equal([...html.matchAll(/class="programme-day"/g)].length,9,'Nine programme days must render')
    assert.equal([...html.matchAll(/class="programme-track"/g)].length,18,'Screenings and Industry tracks must render for every day')
    assert.equal([...html.matchAll(/<dd[^>]*>XXX<\/dd>/g)].length,36,'Every programme venue and time must use the XXX placeholder')
    for(const staleVenue of ['THE TERRACE ARTS SPACE','SALTY’S ON THE CREEK','MEKATILILI DHOW','DISTANT RELATIVES','NZOMBERE COMMUNITY CENTER','THE TERRACE RESIDENCY','VIPINGO RIDGE BEACH CLUB']) assert(!text.includes(staleVenue),`Draft venue must not remain: ${staleVenue}`)
    assert(!text.includes('Submit Your Film'),'Outdated programme submission call to action remains')
    assert(!text.includes('School screenings'),'Unconfirmed school screenings must remain omitted')
  }
  if(path === '/team') {
    for(const profile of teamAdditions) {
      assert(html.includes(`id="team-${profile.id}"`), `Missing team profile section target: ${profile.name}`)
      for(const phrase of [profile.name, profile.role, ...profile.paragraphs]) {
        assert(text.includes(phrase), `Missing supplied team profile content: ${profile.name}: ${phrase.slice(0,100)}`)
      }
    }
    assert(html.includes(`data-image-original="${assetMap['static/images/team/tony-kruz-color.png']}"`),'Tony Kruz colour portrait must render as an expandable profile image')
  }
  if(path === '/about') {
    assert(html.includes(`data-image-original="${assetMap['drive-2026/community-audience.jpg']}"`),'About page must use the supplied community audience photograph')
  }
  if(path === '/industry') {
    assert(html.includes(`data-image-original="${assetMap['drive-2026/industry-panel.jpg']}"`),'Industry page must use the supplied panel photograph')
    assert(html.includes(`data-image-original="${assetMap['drive-2026/industry-workshop.jpg']}"`),'Industry page must use the supplied workshop photograph')
  }
  for(const match of original.matchAll(/>([^<>]+)</g)) {
    // The user requested replacing the decorative submission-button emoji with SVG.
    const phrase=norm(match[1]); if(!phrase || phrase === '🎬') continue
    phrases++
    if(new Set(['SUBMIT FILM','Screenings']).has(phrase)) continue
    const supersededHomepageIntro = 'Kilifi Creek Festival (KCF) is an artist-led, community-rooted film, arts and cultural festival set along the winding waters of Kilifi Creek, Kenya. In proud collaboration with The Terrace Consortium, KCF brings together established filmmakers, visionary artists, and local communities for a multi-day journey of film screenings, art exhibitions, fashion showcases, masterclasses, and public talks -- set in carefully curated venues along the creek, from intimate waterfront spaces to vibrant public gathering points. KCF is committed to celebrating and strengthening the link between coastal heritage and local communities.'
    if(path==='/' && phrase===supersededHomepageIntro) continue
    if(path==='/' && new Set(['Partners & Brands','CALL FOR SUBMISSIONS','Filmmakers are invited to submit their work to KCF via','FilmFreeway','Submit on FilmFreeway →']).has(phrase)) continue
    if(path==='/screenings' && new Set(['KCF 2026 Programme Coming Soon','The 2026 screening programme will be announced in the coming months. Stay tuned!','Submit Your Film →']).has(phrase)) continue
    if(!text.includes(phrase)) failures.push(`${path}: missing exact text ${phrase.slice(0,100)}`)
  }
  for(const [tag,src] of html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)) {
    assert(!src.includes('static/images/logo/logo.png'),'Old logo still used')
    if(src.startsWith('/assets/partners/')) {
      await access(new URL('public'+decodeURIComponent(src),root)); assets++
      assert(tag.includes('loading="lazy"'),`Partner logo must defer loading: ${src}`)
      assert(/width="\d+"/.test(tag) && /height="\d+"/.test(tag),`Partner logo dimensions missing: ${src}`)
    } else if(src.startsWith('/assets/')) {
      const source=Object.entries(responsive).find(([,image])=>image.variants.some(v=>v.src===src))?.[0]
      assert(source,`Rendered image must use a compressed derivative: ${src}`)
      await access(new URL('public'+decodeURIComponent(src),root)); assets++
      assert(tag.includes('srcset='),`Responsive candidates missing: ${src}`)
      assert(tag.includes('sizes='),`Responsive sizes missing: ${src}`)
      assert(tag.includes('decoding="async"'),`Async decoding missing: ${src}`)
      assert(/width="\d+"/.test(tag) && /height="\d+"/.test(tag),`Intrinsic dimensions missing: ${src}`)
      if(tag.includes('class="hero-image"')) assert(tag.includes('loading="eager"') && tag.includes('fetchpriority="high"'),'Hero must load immediately with high priority')
      else if(!source.includes('/brand/')) assert(tag.includes('loading="lazy"'),`Below-fold image must defer loading: ${src}`)
      for(const candidate of tag.match(/srcset="([^"]+)"/)[1].split(', ')) await access(new URL('public'+candidate.split(' ')[0],root))
    }
  }
  for(const [,href] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    assert.notEqual(href,'#','Placeholder link remains')
    if(href.startsWith('#')) {
      assert(html.includes(`id="${decode(href.slice(1))}"`),`Section shortcut target missing on ${path}: ${href}`)
      links++
    }
    if(href.startsWith('/')&&!href.startsWith('/_nuxt')&&!href.startsWith('/assets')) { assert(allRoutes.includes(href.split('#')[0]),`Unexpected local link ${href}`); links++ }
  }
}
for(const [path,phrases] of Object.entries({
  '/partners':['Partner With Kilifi Creek Festival','Our 2026 Reach','What Partner Support Enables','CONFIRMED KCF 2026 PARTNERS','Goethe-Institut','EUNIC — EU National Institutes for Culture','British Council','Movies That Matter','Sauti Sessions','Distant Relatives','Chicken &amp; Egg Films','Contact the Partnerships Team'],
  '/visit':['Plan Your Time in Kilifi','The Terrace Art Space','Open in Google Maps','VISITOR ENQUIRIES'],
  '/impact':['Artistic Exchange With Lasting Value','Growing Kilifi’s Creative Economy','KCF 2026 AUDIENCE STRATEGY','2026 Impact Metrics'],
  '/why-kilifi':['Most festivals happen in cities.','KCF happens on the water.','The Kilifi Story','Nature Is Part of the Programme'],
  '/gallery':['KILIFI CREEK FESTIVAL IN PICTURES','Film, Art, Community','All moments','Festival celebrations','Cinema under the trees','Across Kilifi Creek','Ideas in the open air','Silent cinema on the dhow','Golden hour aboard','Creekside at sunset','Festival style in focus']
})) {
  const html=await (await fetch(origin+path)).text()
  for(const phrase of phrases) assert(html.includes(phrase),`Missing revamp content on ${path}: ${phrase}`)
}
for(const file of ['/favicon.ico','/favicon-32x32.png','/apple-touch-icon.png','/site.webmanifest','/robots.txt','/sitemap.xml','/assets/brand/kcf-social-card.jpg']) {
  assert.equal((await fetch(origin+file)).status,200,`SEO asset must be served: ${file}`)
}
const homeHtml=await (await fetch(origin+'/')).text()
assert(homeHtml.includes('application/ld+json') && homeHtml.includes('"@type":"Festival"'),'Festival structured data must render')
const sitemap=await (await fetch(origin+'/sitemap.xml')).text()
for(const path of allRoutes) assert(sitemap.includes(publicSite+(path==='/'?'/':path)),`Sitemap missing ${path}`)
assert.deepEqual(failures,[],failures.join('\n'))
const ambience=JSON.parse(await readFile(new URL('app/assets/ambience.json',root),'utf8'))
const backdrop=await fetch(origin+ambience.src)
assert.equal(backdrop.status,200,'Decorative coastal background must load')
assert.equal((await backdrop.arrayBuffer()).byteLength,ambience.bytes,'Optimized background must match the generated asset')
assert(ambience.bytes<150000,'Decorative background should stay lightweight')
for(const [file,path] of Object.entries(legacyRoutes)) {
  const r=await fetch(origin+'/'+file,{redirect:'manual'})
  assert([301,302,307,308].includes(r.status),`Legacy route ${file}`)
  assert.equal(r.headers.get('location'),path)
}
assert.equal((await fetch(origin+'/unknown-page')).status,404)
for(const [source,image] of Object.entries(responsive)) {
  for(const variant of image.variants) await access(new URL('public'+variant.src,root))
  assert(image.variants.at(-1).bytes<1000000,`Expanded preview remains oversized: ${source}`)
}
const cached=await fetch(origin+responsive['/assets/home.jpg.webp'].variants[0].src)
assert.equal(cached.status,200,'Responsive image must be served')
assert.equal(cached.headers.get('cache-control'),'public, max-age=31536000, immutable','Content-hashed images must be cached')
const fonts=JSON.parse(await readFile(new URL('app/assets/fonts.json',root),'utf8'))
for(const font of Object.values(fonts)) {
  const response=await fetch(origin+font.url)
  assert.equal(response.status,200,`Webfont must be served: ${font.url}`)
  assert(response.headers.get('content-type')?.includes('font/woff2'),'Webfont media type')
  assert.equal(response.headers.get('cache-control'),'public, max-age=31536000, immutable','Hashed fonts must be cached')
  const bytes=Buffer.from(await response.arrayBuffer())
  assert.equal(bytes.subarray(0,4).toString(),'wOF2','Font must be a valid WOFF2 container')
  assert.equal(bytes.length,font.webBytes,'Served font must match the supplied conversion')
}
console.log(`PASS: ${allRoutes.length} pages, 7 expected hero images, ${phrases} retained original text phrases, ${assets} image references, ${links} local links, closed submissions status, nine-day 2026 programme preview, confirmed partner logos, 7 legacy redirects, and 404 handling.`)
