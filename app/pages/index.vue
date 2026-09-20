<script setup lang="ts">
import { imageAttributes, responsiveHtml } from '~/utils/images'
import content from '~/assets/content.json'
import assets from '~/assets/asset-map.json'
import { venueDetails } from '~/utils/sections'
const home = content.home
// The sections are extracted from the original HTML without rewriting their copy.
const headquarters = home.sections.find(s => s.includes('FESTIVAL HEADQUARTERS'))!
const shortcuts = [{id:'highlights-heading',label:'2025 HIGHLIGHTS'}, {id:'goals-heading',label:'2026 GOALS'}, {id:'partners',label:'2026 PARTNERS'}, {id:'submissions',label:'SUBMISSIONS CLOSED'}, {id:'festival-team',label:'FESTIVAL TEAM'}, {id:'headquarters',label:'FESTIVAL HEADQUARTERS'}]
</script>
<template>
  <PageHero home />
  <SectionShortcuts :items="shortcuts" />
  <section class="theme-strip"><p>{{ home.quote }}</p><span class="tide-mark" aria-hidden="true">≈</span></section>
  <section class="intro-section homepage-rewrite"><div class="intro-copy"><p>Set along the winding waters of Kilifi Creek, KCF is an artist-led, community-rooted celebration of cinema, culture, and creative exchange. Through Creekside screenings, workshops, performances, exhibitions, and community gatherings, we bring together filmmakers, artists, and audiences from Kenya and around the world.</p><p>Join us from 23–31 October 2026 as we transform Kilifi into a living cultural corridor where storytelling meets nature, heritage, and community.</p><div class="intro-actions"><NuxtLink class="button" to="/screenings#programme">VIEW 2026 PROGRAMME <span aria-hidden="true">↗</span></NuxtLink><NuxtLink class="button button-dark" to="/partners">PARTNER WITH US <span aria-hidden="true">↗</span></NuxtLink><NuxtLink class="button button-dark" to="/visit">PLAN YOUR VISIT <span aria-hidden="true">↗</span></NuxtLink></div></div><div class="intro-photo"><img :src="assets['home.jpg']" v-bind="imageAttributes(assets['home.jpg'], undefined, 'Festival filmmakers celebrating with their awards')" alt="Festival filmmakers celebrating with their awards" loading="lazy" /></div></section>
  <section class="home-visuals"><div><img :src="assets['homepage/Picture1.png']" v-bind="imageAttributes(assets['homepage/Picture1.png'], undefined, 'Interview at KCF')" alt="Interview at KCF" loading="lazy" /></div><div><img :src="assets['homepage/Picture2.png']" v-bind="imageAttributes(assets['homepage/Picture2.png'], undefined, 'Dhow on Kilifi Creek')" alt="Dhow on Kilifi Creek" loading="lazy" /></div><div><img :src="assets['homepage/Picture3.png']" v-bind="imageAttributes(assets['homepage/Picture3.png'], undefined, 'Outdoor screening')" alt="Outdoor screening" loading="lazy" /></div></section>
  <BrandHighlights />
  <section id="partners" class="home-partners"><div class="home-partners-inner"><p class="eyebrow">CONFIRMED KCF 2026 PARTNERS</p><h2>Partners and Brands</h2><ConfirmedPartners /><div class="home-partners-action"><NuxtLink class="button button-dark" to="/partners">VIEW PARTNERSHIPS <span aria-hidden="true">↗</span></NuxtLink></div></div></section>
  <SubmissionsTimeline />
  <section id="festival-team" class="team-preview"><div><h2>Festival Team</h2><p>{{ home.team }}</p><NuxtLink class="button" to="/team">READ MORE <span aria-hidden="true">↗</span></NuxtLink></div><div class="team-photo"><img :src="assets['image5.jpg']" v-bind="imageAttributes(assets['image5.jpg'], undefined, 'Festival Team')" alt="Festival Team" loading="lazy" /></div></section>
  <div id="headquarters" class="original-content headquarters-section" v-html="responsiveHtml(venueDetails(headquarters))"></div>
</template>

<style scoped>
.home-partners { padding:var(--section-space) var(--space); background:var(--soft-bg); }
.home-partners-inner { max-width:1280px; margin:auto; }
.home-partners h2 { margin-bottom:0; }
.home-partners-action { display:flex; justify-content:flex-end; margin-top:28px; }
@media(max-width:760px) { .home-partners-action { justify-content:flex-start; } }
</style>
