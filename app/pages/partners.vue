<script setup lang="ts">
import { imageAttributes } from '~/utils/images'

const shortcuts = [
  { id:'why-partner', label:'WHY PARTNER WITH KCF' },
  { id:'reach', label:'2026 REACH' },
  { id:'support', label:'WHAT PARTNERS SUPPORT' },
  { id:'confirmed-partners', label:'CONFIRMED PARTNERS' },
  { id:'partnership-contact', label:'CONTACT' }
]
const benefits = [
  'Reach 5,000+ people across digital and physical activations',
  'Connect with youth and creative audiences',
  'Support coastal cultural development',
  'Align with sustainability and community impact',
  'National and international visibility'
]
const metrics = [
  ['5,000+','Total audience reach'], ['120','Creatives directly trained'], ['14','Workshops and mentorship sessions'], ['18','Panels and industry discussions'], ['33','Local and international films']
]
const allocations = [
  ['Filmmakers, trainers, experts logistics and facilitation',28], ['Festival production',20], ['Accommodation',13], ['Pre and post-festival activations',12], ['Meals and catering',9], ['Screening venues and equipment',8], ['Local transport',5], ['Opening and closing events',3], ['Marketing and communications',2]
]
const support = [
  ['Programme & Screenings','Pre- and post-festival activations, curated screenings across seven venues along the Creek, community impact screenings and outreach initiatives.'],
  ['Skills Development & Industry Engagement','Masterclasses, workshops, panel discussions, skills exchange, capacity-building sessions, and support for participating filmmakers, trainers, and industry experts.'],
  ['Festival Production & Technical Delivery','Sound, projection, staging, coordination and implementation of the full festival programme.'],
  ['Logistics & Operations','Transport, equipment movement, venue coordination and on-ground operational support.'],
  ['Guest Hosting & Hospitality','Travel, accommodation and care for invited festival guests.'],
  ['Special Events','Opening and Closing events.'],
  ['Marketing & Communications','Outdoor advertising, flyers, posters, branded materials, digital campaigns and media collaborations.']
]
const partners = [
  { name:'Goethe-Institut' }, { name:'EUNIC' }, { name:'Chevening' }, { name:'British Council' },
  { name:'Baruu Collective', image:'/assets/static/images/logo/baruu.png' },
  { name:'The Terrace', image:'/assets/static/images/logo/terrace.png' },
  { name:'Afrofilms International', image:'/assets/static/images/logo/afrofilms.png' },
  { name:'Tawi Creative Hub', image:'/assets/static/images/logo/tawi.png' },
  { name:'Docubox' }, { name:'Movies That Matter' }, { name:'Sauti Sessions' }, { name:'Distant Relatives' }, { name:"Salty's on the Creek" }, { name:'Blue House' }
]
</script>

<template>
  <PageHero title="Partner With Us" image="image5.jpg" />
  <SectionShortcuts :items="shortcuts" />
  <div class="revamp-page page-partners">
    <section id="why-partner" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">KCF 2026 PARTNERSHIPS</p><h2>Partner With Kilifi Creek Festival</h2>
      <p class="revamp-lead">We are seeking support to deliver a high-impact film festival in Kilifi that prioritizes skills exchange, industry development, and sustainable creative growth, with a strong focus on engaging women, youth, and underrepresented indigenous communities along the Kenyan coast.</p>
      <ul class="benefit-list"><li v-for="benefit in benefits" :key="benefit">{{ benefit }}</li></ul>
    </div></section>
    <section id="reach" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">AUDIENCE AND INDUSTRY</p><h2>Our 2026 Reach</h2>
      <div class="metric-strip"><div v-for="[value,label] in metrics" :key="label" class="metric-tile"><strong>{{ value }}</strong><span>{{ label }}</span></div></div>
    </div></section>
    <section id="support" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">PARTNERSHIP ALLOCATION</p><h2>What Partner Support Enables</h2>
      <div class="allocation-list"><div v-for="[label,value] in allocations" :key="label" class="allocation-row"><span class="allocation-label">{{ label }}</span><span class="allocation-track" aria-hidden="true"><span class="allocation-fill" :style="{ width:value+'%' }"></span></span><span class="allocation-value">{{ value }}%</span></div></div>
      <div class="revamp-card-grid"><article v-for="([title,copy],index) in support" :key="title" class="revamp-card"><span class="revamp-card-number">{{ index+1 }}</span><h3>{{ title }}</h3><p>{{ copy }}</p></article></div>
    </div></section>
    <section id="confirmed-partners" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">CONFIRMED KCF 2026 PARTNERS</p><h2>Creative and Community Partners</h2>
      <div class="partner-logo-grid"><article v-for="partner in partners" :key="partner.name" class="partner-logo-card"><img v-if="partner.image" :src="partner.image" v-bind="imageAttributes(partner.image,'150px')" :alt="partner.name" loading="lazy" /><span v-else>{{ partner.name }}</span></article></div>
    </div></section>
    <section id="partnership-contact" class="revamp-section"><div class="revamp-inner revamp-narrow">
      <p class="eyebrow">START A CONVERSATION</p><h2>Contact the Partnerships Team</h2><p class="revamp-lead">Support Kilifi Creek Festival through a financial contribution or an in-kind partnership.</p>
      <div class="revamp-actions"><a class="button" href="mailto:comms@kilificreekfestival.com?subject=Kilifi%20Creek%20Festival%20partnership">CONTACT PARTNERSHIPS TEAM <span aria-hidden="true">↗</span></a></div>
    </div></section>
  </div>
</template>
