<script setup lang="ts">
const shortcuts = [
  { id:'impact', label:'OUR IMPACT' }, { id:'mission', label:'2026 MISSION' }, { id:'audience-strategy', label:'AUDIENCE STRATEGY' }, { id:'impact-metrics', label:'IMPACT METRICS' }
]
const areas = [
  ['Community Impact','Local audiences experience stories reflecting their own lives and landscapes, sparking emotional engagement and sustained dialogue.'],
  ['Artistic Exchange & Mentorship','Emerging local creatives engage directly with established Kenyan and international filmmakers through masterclasses, Q&As, residencies and informal mentorship.'],
  ['Economic & Tourism Impact','The festival activates local venues, transport providers, food vendors, accommodation facilities and boat operators while introducing visiting filmmakers to Kilifi’s cultural and natural heritage.'],
  ['Environmental Responsibility','Programming foregrounds water and conservation themes while production choices prioritize reusable infrastructure, local sourcing and sustainable fashion practices.'],
  ['Women’s Empowerment','KCF places a strong focus on women’s participation and targeted workshops that support creative documentation, networks and sustainable income streams.'],
  ['Youth & Skills Development','Workshops, mentorship, school outreach, storytelling labs and industry sessions create pathways for participation and professional growth.']
]
const strategy = [
  'Pre- and post-festival activation through community screenings, youth filmmaking workshops, school outreach and storytelling labs, local filmmaker meetups, mentorship sessions, editing and project development labs, and industry networking sessions',
  'Curated creekside screenings that attract diverse audiences and support cultural tourism',
  'Grassroots access initiatives through schools, tertiary institutions, and community screenings',
  'Livestreaming of selected activations, screenings, Q&A sessions, and panel discussions to expand reach beyond Kilifi'
]
const metrics = [
  ['2,500','On-site Festival Attendance'], ['2,500','Activation, Grassroots Impact Screenings and Live Streams'], ['14','Masterclasses, Workshops & Mentorship Sessions'], ['18','Panels, Industry Discussions & Q&As'], ['33','Local and International Films'], ['120','Directly Trained Participants']
]
</script>

<template>
  <PageHero title="Community Impact" image="image6.jpg" />
  <SectionShortcuts :items="shortcuts" />
  <div class="revamp-page page-impact">
    <section id="impact" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">OUR IMPACT</p><h2>Artistic Exchange With Lasting Value</h2>
      <p class="revamp-lead">Operating in a context of high socio-economic inequality, Kilifi Creek Festival uses artistic exchange to reduce barriers to access and to position Kilifi as a growing creative hub.</p>
      <div class="impact-area-grid"><article v-for="[title,copy] in areas" :key="title" class="impact-area"><h3>{{ title }}</h3><p>{{ copy }}</p></article></div>
    </div></section>
    <section id="mission" class="revamp-section"><div class="revamp-inner revamp-narrow">
      <p class="eyebrow">KCF 2026 MISSION</p><h2>Growing Kilifi’s Creative Economy</h2>
      <div class="revamp-copy"><p>KCF generates sustained economic value across Kilifi by creating direct income opportunities for venues, creatives, technicians, hospitality providers, and small businesses, ensuring that the benefits of the festival are widely distributed across the local cultural economy.</p><p>The 2026 edition will further expand this impact by creating employment opportunities for local practitioners while providing a platform for connection between Kilifi-based, Kenyan and diasporic creatives. Through its multidisciplinary programme, KCF actively supports emerging filmmakers, artists and local artisans by integrating them into both the programme and the wider festival ecosystem.</p><p>Through its curated film programme, KCF contributes to increasing the visibility of African cinema, showcasing diverse stories and voices while strengthening the presence and recognition of African filmmakers both locally and internationally.</p></div>
    </div></section>
    <section id="audience-strategy" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">KCF 2026 AUDIENCE STRATEGY</p><h2>Access Before, During and After the Festival</h2>
      <ul class="benefit-list"><li v-for="item in strategy" :key="item">{{ item }}</li></ul>
    </div></section>
    <section id="impact-metrics" class="revamp-section"><div class="revamp-inner">
      <p class="eyebrow">TARGETS AND ESTIMATES</p><h2>2026 Impact Metrics</h2>
      <div class="revamp-card-grid"><article v-for="[value,label] in metrics" :key="label" class="revamp-card"><span class="revamp-card-number">{{ value }}</span><h3>{{ label }}</h3></article></div>
      <div class="revamp-actions"><NuxtLink class="button" to="/partners">PARTNER WITH US <span aria-hidden="true">↗</span></NuxtLink></div>
    </div></section>
  </div>
</template>
