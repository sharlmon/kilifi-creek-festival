<script setup lang="ts">
import { imageAttributes, responsiveHtml } from '~/utils/images'
import content from '~/assets/content.json'
import assets from '~/assets/asset-map.json'
const home = content.home
useSeoMeta({title:'Kilifi Creek Festival -- Home',description:'Kilifi Creek Festival (KCF) is an artist-led, community-rooted film, arts and cultural festival set along the Kilifi Creek in coastal Kenya. 23-31 October 2026.'})
// The sections are extracted from the original HTML without rewriting their copy.
const headquarters = home.sections.find(s => s.includes('FESTIVAL HEADQUARTERS'))!
const partners = home.sections.find(s => s.includes('Partners &amp; Brands'))!
</script>
<template>
  <PageHero home />
  <section class="theme-strip"><p>{{ home.quote }}</p><span class="tide-mark" aria-hidden="true">≈</span></section>
  <section class="intro-section"><div class="intro-copy"><p>{{ home.intro }}</p><NuxtLink class="button button-dark" to="/about">READ MORE <span aria-hidden="true">↗</span></NuxtLink></div><div class="intro-photo"><img :src="assets['home.jpg']" v-bind="imageAttributes(assets['home.jpg'])" alt="Festival filmmakers celebrating with their awards" loading="lazy" /></div></section>
  <section class="home-visuals"><NuxtLink to="/industry"><img :src="assets['homepage/Picture1.png']" v-bind="imageAttributes(assets['homepage/Picture1.png'])" alt="Interview at KCF" loading="lazy" /></NuxtLink><NuxtLink to="/screenings"><img :src="assets['homepage/Picture2.png']" v-bind="imageAttributes(assets['homepage/Picture2.png'])" alt="Dhow on Kilifi Creek" loading="lazy" /></NuxtLink><NuxtLink to="/screenings"><img :src="assets['homepage/Picture3.png']" v-bind="imageAttributes(assets['homepage/Picture3.png'])" alt="Outdoor screening" loading="lazy" /></NuxtLink></section>
  <BrandHighlights />
  <div class="original-content partners-section" v-html="responsiveHtml(partners)"></div>
  <SubmissionsTimeline />
  <section class="team-preview"><div><h2>Festival Team</h2><p>{{ home.team }}</p><NuxtLink class="button" to="/team">READ MORE <span aria-hidden="true">↗</span></NuxtLink></div><NuxtLink to="/team"><img :src="assets['image5.jpg']" v-bind="imageAttributes(assets['image5.jpg'])" alt="Festival Team" loading="lazy" /></NuxtLink></section>
  <div class="original-content headquarters-section" v-html="responsiveHtml(headquarters)"></div>
</template>
