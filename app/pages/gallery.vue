<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
import assets from '~/assets/asset-map.json'

type GalleryCategory = 'festival' | 'screenings' | 'creek' | 'community' | 'industry'

const activeFilter = ref<'all' | GalleryCategory>('all')
const filters: { label: string, value: 'all' | GalleryCategory }[] = [
  { label: 'All moments', value: 'all' },
  { label: 'Festival', value: 'festival' },
  { label: 'Screenings', value: 'screenings' },
  { label: 'On the creek', value: 'creek' },
  { label: 'Community', value: 'community' },
  { label: 'Industry', value: 'industry' }
]

const photos: { source: keyof typeof assets, alt: string, caption: string, category: GalleryCategory, layout: string }[] = [
  { source: 'home-hero-2026.jpg', alt: 'Festival filmmakers celebrating together with their awards', caption: 'Festival celebrations', category: 'festival', layout: 'panorama' },
  { source: 'aboutpage/262A9869.jpg.jpeg', alt: 'Singer performing on the Kilifi Creek Festival stage', caption: 'Live at the creek', category: 'festival', layout: 'portrait' },
  { source: 'drive-2026/outdoor-screening.jpg', alt: 'Audience gathered for an outdoor screening surrounded by film murals', caption: 'Cinema under the trees', category: 'screenings', layout: 'landscape' },
  { source: 'aboutpage/W0700769-2.jpg.jpeg', alt: 'Festival guests sharing a conversation beside Kilifi Creek', caption: 'Creekside conversations', category: 'creek', layout: 'standard' },
  { source: 'drive-2026/festival-discussion.jpg', alt: 'Young filmmakers speaking during a festival discussion', caption: 'Stories in conversation', category: 'industry', layout: 'standard' },
  { source: 'aboutpage/W0700758.jpg.jpeg', alt: 'Passenger boat crossing the calm waters of Kilifi Creek', caption: 'Across Kilifi Creek', category: 'creek', layout: 'wide' },
  { source: 'drive-2026/community-audience.jpg', alt: 'Festival audience listening during a community programme', caption: 'Community at the centre', category: 'community', layout: 'standard' },
  { source: 'aboutpage/262A9843.jpg.jpeg', alt: 'Singer and guitarist performing together at the festival', caption: 'Sounds of the festival', category: 'festival', layout: 'wide' },
  { source: 'screenings/262A9334.jpg (1).jpeg', alt: 'Audience watching a film at an open-air night screening', caption: 'Open-air cinema', category: 'screenings', layout: 'standard' },
  { source: 'aboutpage/W0701861.jpeg', alt: 'Festival creatives standing together for a group portrait', caption: 'Kilifi creatives', category: 'community', layout: 'wide' },
  { source: 'industry/W0701998.jpg.jpeg', alt: 'Filmmakers smiling during a festival question and answer session', caption: 'Filmmaker exchange', category: 'industry', layout: 'portrait' },
  { source: 'screenings/W0700861.jpg.jpeg', alt: 'Audience seated in front of an outdoor film screen at night', caption: 'Stories after sunset', category: 'screenings', layout: 'standard' },
  { source: 'aboutpage/262A9259.jpg (3).jpeg', alt: 'Festival technical crew preparing projection equipment outdoors', caption: 'Behind the screens', category: 'industry', layout: 'standard' },
  { source: 'drive-2026/industry-hero.jpg', alt: 'Filmmakers taking part in a relaxed open-air panel', caption: 'Ideas in the open air', category: 'industry', layout: 'wide' }
]

const filteredPhotos = computed(() => activeFilter.value === 'all' ? photos : photos.filter(photo => photo.category === activeFilter.value))
</script>

<template>
  <PageHero title="Gallery" image="aboutpage/W0700758.jpg.jpeg" />
  <div class="gallery-page">
    <section class="gallery-intro">
      <div>
        <p class="eyebrow">KILIFI CREEK FESTIVAL IN PICTURES</p>
        <h2>Film, Art, Community<br>and the Creek</h2>
      </div>
      <p class="gallery-lead">A glimpse of the screenings, performances, conversations and shared moments that bring the festival to life along Kilifi Creek.</p>
    </section>

    <section class="gallery-section" aria-labelledby="gallery-heading">
      <div class="gallery-toolbar">
        <h2 id="gallery-heading" class="visually-hidden">Festival photo gallery</h2>
        <div class="gallery-filters" aria-label="Filter gallery photographs">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            :class="{ active: activeFilter === filter.value }"
            :aria-pressed="activeFilter === filter.value"
            @click="activeFilter = filter.value"
          >{{ filter.label }}</button>
        </div>
        <p class="gallery-count" aria-live="polite">{{ filteredPhotos.length }} photographs</p>
      </div>

      <div class="gallery-grid">
        <article v-for="photo in filteredPhotos" :key="photo.source" class="gallery-card" :class="photo.layout">
          <img
            :src="assets[photo.source]"
            v-bind="imageAttributes(assets[photo.source], '(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 50vw, 40vw', photo.alt)"
            :alt="photo.alt"
            loading="lazy"
          >
          <div class="gallery-caption">
            <span>{{ photo.category }}</span>
            <p>{{ photo.caption }}</p>
            <span class="gallery-expand" aria-hidden="true">↗</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.gallery-page { color:var(--text); }
.gallery-intro { display:grid; grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr); align-items:end; gap:clamp(40px,8vw,120px); width:min(1280px,100%); margin-inline:auto; padding:clamp(64px,9vw,120px) clamp(24px,5vw,72px) clamp(48px,6vw,80px); }
.gallery-intro .eyebrow { margin-bottom:18px; color:var(--brand-orange); }
.gallery-intro h2 { margin:0; color:var(--heading); font:400 clamp(48px,6.2vw,86px)/.94 var(--font-display); letter-spacing:.015em; }
.gallery-lead { max-width:480px; margin:0 0 6px; font-size:clamp(17px,1.7vw,22px); line-height:1.75; }
.gallery-section { padding:0 clamp(16px,3vw,44px) clamp(72px,10vw,140px); }
.gallery-toolbar { display:flex; align-items:center; justify-content:space-between; gap:24px; width:min(1340px,100%); margin:0 auto 26px; padding-top:22px; border-top:1px solid var(--line); }
.gallery-filters { display:flex; flex-wrap:wrap; gap:8px; }
.gallery-filters button { min-height:42px; padding:9px 16px; border:1px solid var(--glass-border); border-radius:999px; background:var(--panel); color:var(--text); cursor:pointer; font:500 10px/1.3 var(--font-interface); letter-spacing:.04em; text-transform:uppercase; transition:background .2s,color .2s,border-color .2s,transform .2s; }
.gallery-filters button:hover { border-color:var(--brand-orange); transform:translateY(-2px); }
.gallery-filters button.active { border-color:var(--brand-yellow); background:var(--brand-yellow); color:var(--brand-teal); }
.gallery-filters button:focus-visible { outline:3px solid var(--brand-yellow); outline-offset:3px; }
.gallery-count { flex-shrink:0; margin:0; color:var(--muted); font:500 10px/1.4 var(--font-label); letter-spacing:.08em; text-transform:uppercase; }
.gallery-grid { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); grid-auto-rows:34px; grid-auto-flow:dense; gap:14px; width:min(1340px,100%); margin-inline:auto; }
.gallery-card { position:relative; grid-column:span 4; grid-row:span 10; min-height:340px; overflow:hidden; border-radius:18px; background:#151713; box-shadow:var(--glass-shadow); }
.gallery-card.standard { grid-row:span 11; }
.gallery-card.portrait { grid-column:span 4; grid-row:span 15; }
.gallery-card.wide { grid-column:span 8; grid-row:span 11; }
.gallery-card.landscape { grid-column:span 8; grid-row:span 13; }
.gallery-card.panorama { grid-column:1/-1; grid-row:span 13; }
.gallery-card img { width:100%; height:100%; object-fit:cover; transition:transform .6s cubic-bezier(.22,1,.36,1),filter .4s; }
.gallery-card:hover img { transform:scale(1.035); filter:saturate(1.06); }
.gallery-card:focus-within img { transform:scale(1.02); }
.gallery-caption { pointer-events:none; position:absolute; inset:auto 0 0; display:grid; grid-template-columns:1fr auto; align-items:end; gap:3px 14px; padding:54px 18px 17px; color:#fff; background:linear-gradient(180deg,transparent,#071c18d9); }
.gallery-caption>span:first-child { grid-column:1; color:var(--brand-yellow); font:500 9px/1.4 var(--font-label); letter-spacing:.1em; text-transform:uppercase; }
.gallery-caption p { grid-column:1; margin:0; font:500 14px/1.45 var(--font-interface); }
.gallery-expand { grid-column:2; grid-row:1/3; display:grid; place-items:center; width:36px; height:36px; border:1px solid #ffffff80; border-radius:50%; font:400 17px/1 var(--font-interface); }
.visually-hidden { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
@media(max-width:1000px) {
  .gallery-intro { grid-template-columns:1fr; align-items:start; gap:24px; }
  .gallery-grid { grid-template-columns:repeat(8,minmax(0,1fr)); }
  .gallery-card,.gallery-card.portrait { grid-column:span 4; }
  .gallery-card.wide,.gallery-card.landscape,.gallery-card.panorama { grid-column:span 8; }
}
@media(max-width:760px) {
  .gallery-intro { padding:54px 24px 42px; }
  .gallery-intro h2 { font-size:clamp(44px,14vw,66px); }
  .gallery-section { padding:0 16px 72px; }
  .gallery-toolbar { align-items:flex-start; flex-direction:column; gap:14px; }
  .gallery-filters { width:100%; flex-wrap:nowrap; overflow-x:auto; padding:2px 2px 8px; scrollbar-width:none; }
  .gallery-filters::-webkit-scrollbar { display:none; }
  .gallery-filters button { flex:0 0 auto; }
  .gallery-count { padding-left:2px; }
  .gallery-grid { display:block; }
  .gallery-card { width:100%; min-height:0; height:clamp(300px,100vw,460px); margin-bottom:12px; border-radius:14px; }
  .gallery-card.portrait { height:clamp(440px,135vw,620px); }
  .gallery-card.panorama,.gallery-card.wide,.gallery-card.landscape { height:clamp(280px,78vw,420px); }
}
@media(prefers-reduced-motion:reduce) {
  .gallery-filters button,.gallery-card img { transition:none; }
}
</style>
