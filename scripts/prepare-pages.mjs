import { readFile, writeFile, access } from 'node:fs/promises'
import assert from 'node:assert/strict'

const output = new URL('../.output/public/', import.meta.url)
const base = process.env.NUXT_APP_BASE_URL || '/'
const routes = ['', 'about', 'screenings', 'industry', 'team', 'press', 'contact']
for (const route of routes) {
  const html = await readFile(new URL(route ? `${route}/index.html` : 'index.html', output), 'utf8')
  assert(!/(?:src|href|srcset)="\/(?:assets|_nuxt)\//.test(html), `Unprefixed asset on ${route || 'home'}`)
  for (const [, src] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (src.startsWith(base + 'assets/') || src.startsWith(base + '_nuxt/')) {
      await access(new URL(decodeURIComponent(src.slice(base.length)), output))
    }
  }
}
await writeFile(new URL('.nojekyll', output), '')
const aliases = { 'index.html': '', 'about-us.html': 'about/', 'screenings.html': 'screenings/', 'industry.html': 'industry/', 'team.html': 'team/', 'press.html': 'press/', 'contact-us.html': 'contact/' }
for (const [file, route] of Object.entries(aliases)) {
  if (file === 'index.html') continue
  const target = base + route
  await writeFile(new URL(file, output), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${target}"><title>Kilifi Creek Festival</title></head><body><a href="${target}">Continue to Kilifi Creek Festival</a></body></html>`)
}
console.log('Verified seven static pages, prefixed assets, and legacy page aliases.')
