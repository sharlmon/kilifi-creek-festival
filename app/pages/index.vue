<script setup lang="ts">
import { imageAttributes, responsiveHtml } from '~/utils/images'
import content from '~/assets/content.json'
import assets from '~/assets/asset-map.json'
import { venueDetails } from '~/utils/sections'
const home = content.home
useSeoMeta({title:'Kilifi Creek Festival -- Home',description:'Kilifi Creek Festival (KCF) is an artist-led, community-rooted film, arts and cultural festival set along the Kilifi Creek in coastal Kenya. 23-31 October 2026.'})
// The sections are extracted from the original HTML without rewriting their copy.
const headquarters = home.sections.find(s => s.includes('FESTIVAL HEADQUARTERS'))!
const partners = home.sections.find(s => s.includes('Partners &amp; Brands'))!
const shortcuts = [{id:'highlights-heading',label:'OUR 2026 HIGHLIGHTS'}, {id:'partners',label:'Partners & Brands'}, {id:'submissions',label:'CALL FOR SUBMISSIONS'}, {id:'festival-team',label:'Festival Team'}, {id:'headquarters',label:'FESTIVAL HEADQUARTERS'}]
</script>
<template>
  <PageHero home />
  <SectionShortcuts :items="shortcuts" />
  <section class="theme-strip"><p>{{ home.quote }}</p><span class="tide-mark" aria-hidden="true">≈</span></section>
  <section class="intro-section"><div class="intro-copy"><p>{{ home.intro }}</p><NuxtLink class="button button-dark" to="/about">READ MORE <span aria-hidden="true">↗</span></NuxtLink></div><div class="intro-photo"><img :src="assets['home.jpg']" v-bind="imageAttributes(assets['home.jpg'], undefined, 'Festival filmmakers celebrating with their awards')" alt="Festival filmmakers celebrating with their awards" loading="lazy" /></div></section>
  <section class="home-visuals"><div><img :src="assets['homepage/Picture1.png']" v-bind="imageAttributes(assets['homepage/Picture1.png'], undefined, 'Interview at KCF')" alt="Interview at KCF" loading="lazy" /></div><div><img :src="assets['homepage/Picture2.png']" v-bind="imageAttributes(assets['homepage/Picture2.png'], undefined, 'Dhow on Kilifi Creek')" alt="Dhow on Kilifi Creek" loading="lazy" /></div><div><img :src="assets['homepage/Picture3.png']" v-bind="imageAttributes(assets['homepage/Picture3.png'], undefined, 'Outdoor screening')" alt="Outdoor screening" loading="lazy" /></div></section>
  <BrandHighlights />
  <div id="partners" class="original-content partners-section" v-html="responsiveHtml(partners)"></div>
  <SubmissionsTimeline />
  <section id="festival-team" class="team-preview"><div><h2>Festival Team</h2><p>{{ home.team }}</p><NuxtLink class="button" to="/team">READ MORE <span aria-hidden="true">↗</span></NuxtLink></div><div class="team-photo"><img :src="assets['image5.jpg']" v-bind="imageAttributes(assets['image5.jpg'], undefined, 'Festival Team')" alt="Festival Team" loading="lazy" /></div></section>
  <div id="headquarters" class="original-content headquarters-section" v-html="responsiveHtml(venueDetails(headquarters))"></div>
</template>
