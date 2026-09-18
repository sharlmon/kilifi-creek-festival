export default defineNuxtConfig({
  compatibilityDate: '2026-09-18',
  devtools: { enabled: false },
  css: ['~/assets/site.css', '~/assets/theme.css', '~/assets/glass.css', '~/assets/brand.css'],
  app: { head: { htmlAttrs: { lang: 'en' }, meta: [{ name: 'theme-color', content: '#191a1f' }] } },
  nitro: { prerender: { routes: ['/', '/about', '/screenings', '/industry', '/team', '/press', '/contact'] } },
  routeRules: {
    '/assets/fonts/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    '/assets/responsive/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    '/assets/calendar/**': { headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': 'attachment' } },
    '/index.html': { redirect: '/' }, '/about-us.html': { redirect: '/about' },
    '/screenings.html': { redirect: '/screenings' }, '/industry.html': { redirect: '/industry' },
    '/team.html': { redirect: '/team' }, '/press.html': { redirect: '/press' }, '/contact-us.html': { redirect: '/contact' }
  }
})
