<script setup lang="ts">
import fonts from '~/assets/fonts.json'
import { canonicalUrl, defaultDescription, seoForRoute, siteName, siteUrl } from '~/utils/seo'
const route = useRoute()
const seo = computed(() => seoForRoute(route.path))
const canonical = computed(() => canonicalUrl(route.path))
const socialImage = `${siteUrl}/assets/brand/kcf-social-card.jpg`
const faviconIco = siteBase('/favicon.ico')
const faviconPng = siteBase('/favicon-32x32.png')
const appleTouchIcon = siteBase('/apple-touch-icon.png')
const webManifest = siteBase('/site.webmanifest')
const photoViewer = ref<{ open: (trigger: HTMLElement) => void }>()
function expandPhoto(event: MouseEvent | KeyboardEvent) {
  if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return
  const image = (event.target as Element).closest<HTMLElement>('[data-expand-image]')
  if (!image) return
  // Native buttons activate through click; image controls need keyboard handling.
  if (event instanceof KeyboardEvent && image.tagName !== 'IMG') return
  event.preventDefault()
  photoViewer.value?.open(image)
}
useHead({ link: [fonts.afolkalips, fonts['lemon-milk-regular']].map(font => ({ rel: 'preload', as: 'font', type: 'font/woff2', href: siteBase(font.url), crossorigin: 'anonymous' })) })
useHead({ script: [{ key: 'theme-init', innerHTML: "try{var t=localStorage.getItem('kcf-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'system'}catch(e){document.documentElement.dataset.theme='system'}" }] })
useSeoMeta({
  title: () => seo.value.title,
  description: () => seo.value.description,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType: 'website',
  ogSiteName: siteName,
  ogLocale: 'en_KE',
  ogTitle: () => seo.value.title,
  ogDescription: () => seo.value.description,
  ogUrl: () => canonical.value,
  ogImage: socialImage,
  ogImageType: 'image/jpeg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Kilifi Creek Festival — Film, Art & Music in Kilifi, Kenya',
  twitterCard: 'summary_large_image',
  twitterTitle: () => seo.value.title,
  twitterDescription: () => seo.value.description,
  twitterImage: socialImage,
  twitterImageAlt: 'Kilifi Creek Festival — Film, Art & Music in Kilifi, Kenya'
})
useHead(() => ({
  link: [
    { rel: 'canonical', href: canonical.value },
    { rel: 'icon', href: faviconIco, sizes: 'any' },
    { rel: 'icon', type: 'image/png', href: faviconPng, sizes: '32x32' },
    { rel: 'apple-touch-icon', href: appleTouchIcon, sizes: '180x180' },
    { rel: 'manifest', href: webManifest }
  ],
  meta: [
    { name: 'application-name', content: siteName },
    { name: 'apple-mobile-web-app-title', content: siteName },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  script: [{
    key: 'festival-structured-data',
    type: 'application/ld+json',
    innerHTML: JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        description: defaultDescription,
        publisher: { '@id': `${siteUrl}/#organization` }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/assets/brand/logo-light.png`,
        email: 'comms@kilificreekfestival.com'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Festival',
        name: siteName,
        description: defaultDescription,
        startDate: '2026-10-23',
        endDate: '2026-10-31',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        url: siteUrl,
        image: [socialImage],
        location: {
          '@type': 'Place',
          name: 'Kilifi Creek',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kilifi',
            addressCountry: 'KE'
          }
        },
        organizer: { '@id': `${siteUrl}/#organization` }
      }
    ])
  }]
}))
</script>
<template><CoastalBackground /><NuxtRouteAnnouncer /><SiteHeader /><main id="main-content" @click="expandPhoto" @keydown="expandPhoto"><NuxtPage /></main><SiteFooter /><PhotoViewer ref="photoViewer" /></template>

<style>
img[data-expand-image] { cursor:zoom-in; }
img[data-expand-image]:focus-visible { outline:3px solid var(--brand-yellow); outline-offset:-4px; }
.home-visuals>div { overflow:hidden; border-radius:16px; }
.home-visuals div:hover img { transform:scale(1.03); }
.team-preview>.team-photo { padding:0; }
.team-photo img { width:100%; height:100%; max-height:550px; object-fit:cover; }
@media(max-width:760px) { .team-photo img { height:300px; } }
</style>
