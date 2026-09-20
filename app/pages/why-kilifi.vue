<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
import assets from '~/assets/asset-map.json'
const shortcuts = [{id:'why-kilifi',label:'WHY KILIFI'}, {id:'kilifi-story',label:'THE KILIFI STORY'}, {id:'kilifi-frames',label:'KILIFI IN FRAMES'}]
const themes = ['The creek','The mangroves','The dhow culture','Community spaces','Local creatives','Coastal storytelling traditions']
const gallery = [
  { source:'homepage/Picture2.png', alt:'Dhow on Kilifi Creek' },
  { source:'aboutpage/W0700758.jpg.jpeg', alt:'Kilifi Creek Festival community gathering' },
  { source:'homepage/Picture3.png', alt:'Outdoor cinema in Kilifi' }
]
</script>

<template>
  <PageHero title="Why Kilifi" image="homepage/Picture2.png" />
  <SectionShortcuts :items="shortcuts" />
  <div class="revamp-page page-why-kilifi">
    <section id="why-kilifi" class="revamp-section"><div class="revamp-inner story-intro">
      <p class="story-quote">Most festivals happen in cities.<span>KCF happens on the water.</span></p>
      <div><p class="revamp-lead">It is not just a venue. It is part of the festival’s identity.</p><ul class="story-themes"><li v-for="theme in themes" :key="theme">{{ theme }}</li></ul></div>
    </div></section>
    <section id="kilifi-story" class="revamp-section"><div class="revamp-inner revamp-narrow">
      <p class="eyebrow">WATER, HERITAGE AND COMMUNITY</p><h2>The Kilifi Story</h2>
      <div class="revamp-copy"><p>Kilifi Creek Festival is an artist-led, community-rooted film, arts and cultural festival set along the winding waters of Kilifi Creek, Kenya. Conceived as a decentralized alternative to urban-centered cultural events, the festival brings international cinema into dialogue with nature, coastal heritage and local communities.</p><p>KCF creates immersive, site-specific, multidisciplinary experiences where storytelling unfolds across mangroves, boats, public spaces and community hubs. Grounded in access and sustainability, the festival fosters meaningful cultural, artistic and industry exchange while positioning Kilifi as a dynamic site for cinematic and creative encounters.</p></div>
    </div></section>
    <section id="kilifi-frames" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">THE CREEK IN FRAMES</p><h2>Nature Is Part of the Programme</h2>
      <div class="story-gallery"><img v-for="photo in gallery" :key="photo.source" :src="assets[photo.source as keyof typeof assets]" v-bind="imageAttributes(assets[photo.source as keyof typeof assets],undefined,photo.alt)" :alt="photo.alt" loading="lazy" /></div>
    </div></section>
  </div>
</template>
