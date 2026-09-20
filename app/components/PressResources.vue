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
    <p class="eyebrow">PRESS RESOURCES</p><h2>Festival Logos and Photographs</h2>
    <p class="revamp-lead">Download current Kilifi Creek Festival brand marks and selected festival photographs.</p>
    <div class="press-resource-grid"><article v-for="logo in logos" :key="logo.name" class="press-resource"><img :src="logo.preview" v-bind="imageAttributes(logo.preview,'140px')" :alt="logo.name" loading="lazy" /><div><h3>{{ logo.name }}</h3><a class="download-link" :href="siteBase(logo.download)" download>DOWNLOAD PNG ↘</a></div></article></div>
    <div class="press-photo-grid"><article v-for="photo in photos" :key="photo.source"><img :src="assets[photo.source as keyof typeof assets]" v-bind="imageAttributes(assets[photo.source as keyof typeof assets],undefined,photo.alt)" :alt="photo.alt" loading="lazy" /><div><p>{{ photo.alt }}</p><a class="download-link" :href="siteBase(photo.download)" download>DOWNLOAD ↘</a></div></article></div>
  </div></section>
</template>
