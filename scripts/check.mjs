import { readFile, access } from 'node:fs/promises'
import assert from 'node:assert/strict'
const root = new URL('../', import.meta.url)
const origin = process.env.CHECK_URL || 'http://127.0.0.1:3000'
const assetMap = JSON.parse(await readFile(new URL('app/assets/asset-map.json', root), 'utf8'))
const routes = {'index.html':'/','about-us.html':'/about','screenings.html':'/screenings','industry.html':'/industry','team.html':'/team','press.html':'/press','contact-us.html':'/contact'}
const decode = s => s.replace(/&#(x[\da-f]+|\d+);/gi,(_,v)=>String.fromCodePoint(v[0].toLowerCase()==='x'?parseInt(v.slice(1),16):Number(v))).replace(/&(amp|quot|apos|lt|gt|nbsp|copy|rarr);/g,(_,v)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',copy:'©',rarr:'→'}[v]))
const clean = s => s.replace(/<!--[\s\S]*?-->/g,'').replace(/<(script|style)[\s\S]*?<\/\1>/g,'')
const norm = s => decode(s).replace(/\s+/g,' ').trim()
const failures=[]
let phrases=0, assets=0, links=0
for(const [file,path] of Object.entries(routes)) {
  const response=await fetch(origin+path)
  assert.equal(response.status,200,path)
  const html=await response.text()
  if(path === '/') {
    for(const phrase of ['OUR 2026 HIGHLIGHTS','2,500','On site guests','33','Films screened','120','Creatives trained']) assert(html.includes(phrase),`Missing supplied 2026 highlight: ${phrase}`)
    for(const phrase of ['MARCH 3','CALL FOR ENTRIES OPENS','MARCH 31','EARLY BIRD DEADLINE','MAY 31','REGULAR DEADLINE','JULY 20','LATE DEADLINE','AUGUST 14','EXTENDED DEADLINE','AUGUST 31','NOTIFICATION DATE','SUBMIT YOUR FILM HERE:']) {
      assert(html.includes(phrase), `Missing original poster text: ${phrase}`)
    }
    assert.equal([...html.matchAll(/aria-controls="submission-detail"/g)].length,6,'Six interactive milestones must render')
    assert(/<details[^>]*class="submission-poster"[\s\S]*?<img[\s\S]*?<\/details>/.test(html),'Original poster must remain available')
    assert(html.includes('href="/assets/calendar/kcf-20260303.ics"'),'Initial calendar must match the selected milestone')
    const milestones = JSON.parse(await readFile(new URL('app/assets/submissions.json',root),'utf8'))
    for(const event of milestones) {
      const response=await fetch(origin+`/assets/calendar/kcf-${event.day}.ics`)
      assert.equal(response.status,200,'Calendar must be downloadable')
      assert(response.headers.get('content-type')?.includes('text/calendar'),'Calendar media type')
      const calendar=await response.text()
      const next=new Date(Date.UTC(2026,Number(event.day.slice(4,6))-1,Number(event.day.slice(6,8))+1)).toISOString().slice(0,10).replaceAll('-','')
      assert(calendar.includes(`DTSTART;VALUE=DATE:${event.day}\r\n`),'Calendar must use the poster date')
      assert(calendar.includes(`DTEND;VALUE=DATE:${next}\r\n`),'All-day calendar must end on the following day')
      assert(calendar.includes(`SUMMARY:Kilifi Creek Festival - ${event.label}\r\n`),'Calendar must match milestone label')
    }
  }
  const original=clean((await readFile(new URL('scripts/source-copy/'+file,root),'utf8')).split('<body')[1].split('</body>')[0])
  const originalHero = original.match(/bg-\[url\(['"]?\.\/([^'"\)\]]+)/)?.[1]
  const renderedHero = html.match(/<img[^>]*class="hero-image"[^>]*>/)?.[0].match(/src="([^"]+)"/)?.[1]
  assert.equal(renderedHero, assetMap[originalHero], `Original hero image must be restored on ${path}`)
  const text=norm(clean(html).replace(/<[^>]+>/g,' '))
  if(path === '/screenings') {
    const programme=JSON.parse(await readFile(new URL('app/assets/programme.json',root),'utf8'))
    assert.equal(programme.length,11,'All original programme session groups must be retained')
    assert.equal([...html.matchAll(/data-session="/g)].length,11,'All archived sessions must render before filtering')
    for(const session of programme) {
      const card=html.match(new RegExp(`<article[^>]*data-session="${session.id}"[\\s\\S]*?<\\/article>`))?.[0] || ''
      const cardText=norm(clean(card).replace(/<[^>]+>/g,' '))
      for(const phrase of [session.day,session.venue,session.time,session.invitation,...session.items].filter(Boolean)) {
        assert(cardText.includes(phrase),`Missing programme text in ${session.id}: ${phrase}`)
      }
    }
    assert(/<details[^>]*class="programme-poster"[\s\S]*?<img[\s\S]*?<\/details>/.test(html),'Original programme poster must remain available')
    assert(text.includes('All screenings are FREE, but RSVP is required on'),'Original RSVP notice must be preserved')
  }
  for(const match of original.matchAll(/>([^<>]+)</g)) {
    const phrase=norm(match[1]); if(!phrase) continue
    phrases++
    if(!text.includes(phrase)) failures.push(`${path}: missing exact text ${phrase.slice(0,100)}`)
  }
  for(const [tag,src] of html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)) {
    assert(!src.includes('static/images/logo/logo.png'),'Old logo still used')
    if(src.startsWith('/assets/')) {
      await access(new URL('public'+decodeURIComponent(src),root)); assets++
      assert(tag.includes('srcset='),`Responsive candidates missing: ${src}`)
      assert(tag.includes('sizes='),`Responsive sizes missing: ${src}`)
      assert(tag.includes('decoding="async"'),`Async decoding missing: ${src}`)
      assert(/width="\d+"/.test(tag) && /height="\d+"/.test(tag),`Intrinsic dimensions missing: ${src}`)
      if(tag.includes('class="hero-image"')) assert(tag.includes('loading="eager"') && tag.includes('fetchpriority="high"'),'Hero must load immediately with high priority')
      else if(!src.includes('/brand/')) assert(tag.includes('loading="lazy"'),`Below-fold image must defer loading: ${src}`)
      for(const candidate of tag.match(/srcset="([^"]+)"/)[1].split(', ')) await access(new URL('public'+candidate.split(' ')[0],root))
    }
  }
  for(const [,href] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    assert.notEqual(href,'#','Placeholder link remains')
    if(href.startsWith('/')&&!href.startsWith('/_nuxt')&&!href.startsWith('/assets')) { assert(Object.values(routes).includes(href),`Unexpected local link ${href}`); links++ }
  }
}
assert.deepEqual(failures,[],failures.join('\n'))
for(const [file,path] of Object.entries(routes)) {
  const r=await fetch(origin+'/'+file,{redirect:'manual'})
  assert([301,302,307,308].includes(r.status),`Legacy route ${file}`)
  assert.equal(r.headers.get('location'),path)
}
assert.equal((await fetch(origin+'/unknown-page')).status,404)
const responsive=JSON.parse(await readFile(new URL('app/assets/responsive-images.json',root),'utf8'))
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
console.log(`PASS: 7 pages, 7 original hero images, ${phrases} original text phrases, ${assets} image references, ${links} local links, 6 submission milestones and calendar export, 11 programme sessions with full transcribed copy, original poster disclosures, 7 legacy redirects, and 404 handling.`)
