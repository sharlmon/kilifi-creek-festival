<script setup lang="ts">
import fonts from '~/assets/fonts.json'
const photoViewer = ref<{ open: (image: HTMLImageElement) => void }>()
function expandPhoto(event: MouseEvent | KeyboardEvent) {
  if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return
  const image = (event.target as Element).closest<HTMLImageElement>('img[data-expand-image]')
  if (!image) return
  event.preventDefault()
  photoViewer.value?.open(image)
}
useHead({ link: [fonts.afolkalips, fonts['lemon-milk-regular']].map(font => ({ rel: 'preload', as: 'font', type: 'font/woff2', href: siteBase(font.url), crossorigin: 'anonymous' })) })
useHead({ script: [{ key: 'theme-init', innerHTML: "try{var t=localStorage.getItem('kcf-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'system'}catch(e){document.documentElement.dataset.theme='system'}" }] })
</script>
<template><NuxtRouteAnnouncer /><SiteHeader /><main id="main-content" @click="expandPhoto" @keydown="expandPhoto"><NuxtPage /></main><SiteFooter /><PhotoViewer ref="photoViewer" /></template>

<style>
img[data-expand-image] { cursor:zoom-in; }
img[data-expand-image]:focus-visible { outline:3px solid var(--brand-yellow); outline-offset:-4px; }
.home-visuals>div { overflow:hidden; border-radius:16px; }
.home-visuals div:hover img { transform:scale(1.03); }
.team-preview>.team-photo { padding:0; }
.team-photo img { width:100%; height:100%; max-height:550px; object-fit:cover; }
@media(max-width:760px) { .team-photo img { height:300px; } }
</style>
