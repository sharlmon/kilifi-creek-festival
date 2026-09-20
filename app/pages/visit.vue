<script setup lang="ts">
import { venueDetails } from '~/utils/sections'
import { responsiveHtml } from '~/utils/images'
const shortcuts = [{id:'visit-overview',label:'PLAN YOUR VISIT'}, {id:'visit-headquarters',label:'FESTIVAL HEADQUARTERS'}, {id:'visit-contact',label:'VISITOR ENQUIRIES'}]
const venue = venueDetails('<iframe title="The Terrace Kilifi location"></iframe>')
</script>

<template>
  <PageHero title="Plan Your Visit" image="homepage/Picture2.png" />
  <SectionShortcuts :items="shortcuts" />
  <div class="revamp-page page-visit">
    <section id="visit-overview" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">23–31 OCTOBER 2026</p><h2>Plan Your Time in Kilifi</h2>
      <p class="revamp-lead">Join us as Kilifi becomes a living cultural corridor where storytelling meets nature, heritage and community.</p>
      <div class="visit-summary"><article><strong>Festival Dates</strong><p>23–31 October 2026</p></article><article><strong>Location</strong><p>Kilifi Creek, Kenya</p></article><article><strong>Festival Headquarters</strong><p>The Terrace Art Space, Mnarani, Bandari Beach, Kilifi</p></article></div>
    </div></section>
    <section id="visit-headquarters" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">START AT THE CREEK</p><h2>Festival Headquarters</h2>
      <div class="visit-location"><div class="visit-location-copy"><h3>The Terrace Art Space</h3><p>An innovative venue on the shores of the creek, serving as the creative heart of the festival. Join us for screenings, workshops, and sunset conversations.</p></div><div v-html="responsiveHtml(venue)"></div></div>
    </div></section>
    <section id="visit-contact" class="revamp-section"><div class="revamp-inner revamp-narrow">
      <p class="eyebrow">VISITOR ENQUIRIES</p><h2>Talk to the Festival Team</h2><p class="revamp-lead">For questions about attending Kilifi Creek Festival, contact the team directly.</p>
      <div class="revamp-actions"><a class="button" href="mailto:comms@kilificreekfestival.com?subject=Planning%20a%20visit%20to%20KCF%202026">CONTACT US <span aria-hidden="true">↗</span></a></div>
    </div></section>
  </div>
</template>
