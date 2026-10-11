<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
import { siteBase } from '~/utils/siteBase'
import assets from '~/assets/asset-map.json'

const logos = [
  { name:'Kilifi Creek Festival logo for light backgrounds', preview:'/assets/brand/logo-dark.png', download:'/assets/brand/logo-dark.png' },
  { name:'Kilifi Creek Festival logo for dark backgrounds', preview:'/assets/brand/logo-light.png', download:'/assets/brand/logo-light.png' }
]
const photos = [
  { source:'home.jpg', download:'/assets/home.jpg', alt:'Kilifi Creek Festival filmmakers celebrating with their awards' },
  { source:'image5.jpg', download:'/assets/image5.jpg', alt:'Kilifi Creek Festival team and filmmakers' },
  { source:'aboutpage/W0700758.jpg.jpeg', download:'/assets/aboutpage/W0700758.jpg.jpeg', alt:'Kilifi Creek Festival community gathering' }
]
</script>

<template>
  <section id="press-resources" class="revamp-section press-resources"><div class="revamp-inner">
    <p class="eyebrow">PRESS RESOURCES</p><h2>Press Releases and Media Kit</h2>
    <p class="revamp-lead">Download the latest Kilifi Creek Festival press releases, brand marks and selected festival photographs.</p>
    <article class="press-feature">
      <div class="press-feature-doc" aria-hidden="true"><img :src="siteBase('/assets/brand/logo-dark.png')" alt="" width="64" height="64" loading="lazy" /><span></span><span></span><span></span><span class="short"></span></div>
      <div class="press-feature-copy">
        <p class="press-feature-tag">LATEST · 8 OCTOBER 2026</p>
        <h3>Kilifi Creek Festival Returns with 92 Films, Oscar Contenders and a New VR Village</h3>
        <p>Our second press release: 92 films, 38 in competition across 17 award categories, a new VR Village, 17 venues along the creek, plus a KCF 2026 at-a-glance sheet and media contacts.</p>
        <ul class="press-feature-stats"><li><strong>92</strong> films</li><li><strong>17</strong> awards</li><li><strong>17</strong> venues</li><li><strong>2</strong> pages</li></ul>
        <div class="press-feature-actions"><a class="button" :href="siteBase('/assets/press/KCF-Press-Release-2-2026.pdf')" download>DOWNLOAD PRESS RELEASE (PDF) ↓</a><a class="download-link" :href="siteBase('/assets/press/KCF-Press-Release-2-2026.pdf')" target="_blank" rel="noopener noreferrer">READ ONLINE ↗</a></div>
      </div>
    </article>
    <p class="press-archive-label">EARLIER RELEASE</p>
    <article class="press-resource press-release-download"><div><h3>KCF 2026 Press Release (PDF)</h3><p>“A Bigger and Bolder Celebration of Film, Culture and Community” — 1 October 2026.</p><a class="download-link" :href="siteBase('/assets/press/KCF-Press-Release-2026.pdf')" download>DOWNLOAD PDF ↘</a></div></article>
    <div class="press-resource-grid"><article v-for="logo in logos" :key="logo.name" class="press-resource"><img :src="logo.preview" v-bind="imageAttributes(logo.preview,'140px')" :alt="logo.name" loading="lazy" /><div><h3>{{ logo.name }}</h3><a class="download-link" :href="siteBase(logo.download)" download>DOWNLOAD PNG ↘</a></div></article></div>
    <div class="press-photo-grid"><article v-for="photo in photos" :key="photo.source"><img :src="assets[photo.source as keyof typeof assets]" v-bind="imageAttributes(assets[photo.source as keyof typeof assets],undefined,photo.alt)" :alt="photo.alt" loading="lazy" /><div><p>{{ photo.alt }}</p><a class="download-link" :href="siteBase(photo.download)" download>DOWNLOAD ↘</a></div></article></div>
  </div></section>
</template>
