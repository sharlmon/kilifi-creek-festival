<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
import assets from '~/assets/asset-map.json'
const props = defineProps<{title?: string, home?: boolean, image?: string}>()
const heroImage = computed(() => assets[(props.image || (props.home ? 'home.jpg' : 'image4.jpg')) as keyof typeof assets])
const baseURL = useRuntimeConfig().app.baseURL
useHead(() => {
  const image = imageAttributes(heroImage.value, '100vw', undefined, baseURL)
  return { link: [{ key:'hero-preload', rel:'preload', as:'image', href:image.src, imagesrcset: 'srcset' in image ? image.srcset : undefined, imagesizes:'100vw', fetchpriority:'high' }] }
})
</script>
<template>
  <section class="hero" :class="{ 'home-hero': home }">
    <img class="hero-image" :src="heroImage" v-bind="imageAttributes(heroImage, '100vw', home ? 'Festival filmmakers celebrating with their awards' : 'Kilifi Creek Festival — ' + title)" loading="eager" :alt="home ? 'Festival filmmakers celebrating with their awards' : 'Kilifi Creek Festival — ' + title" fetchpriority="high" />
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="hero-content">
      <div class="hero-title">
        <p v-if="!home" class="festival-lockup">KILIFI CREEK FESTIVAL</p>
        <h1 v-if="home">KILIFI CREEK<br /><span>FESTIVAL</span></h1>
        <h1 v-else>{{ title }}</h1>
      </div>
      <div class="hero-details">
        <p class="eyebrow">23 - 31 OCTOBER 2026</p>
        <p class="hero-location">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
          Kilifi Creek, Kenya
        </p>
        <a v-if="home" class="button" href="https://filmfreeway.com/KilifiCreekFestival" target="_blank" rel="noopener noreferrer">SUBMIT FILM <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position:relative;
  display:flex;
  align-items:flex-end;
  min-height:clamp(500px,68svh,720px);
  overflow:hidden;
  background:#17181d;
  color:#fff;
}
.home-hero { min-height:clamp(600px,85svh,880px); }
.hero-image { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; }
/* Leave the upper photograph clear; shade only the area behind the title. */
.hero-shade { pointer-events:none; position:absolute; inset:0; background:linear-gradient(180deg,transparent 35%,#10111528 55%,#101115c7 100%); }
.hero-content { pointer-events:none; position:relative; width:100%; max-width:1440px; margin:0 auto; padding:180px clamp(24px,5vw,72px) 32px; }
.hero-title { padding-bottom:26px; }
.hero h1 { color:#fff; font:400 clamp(64px,7.5vw,110px)/.98 var(--font-display); letter-spacing:.015em; margin:0; text-shadow:0 2px 20px #00000035; overflow-wrap:anywhere; }
.home-hero h1 { font-size:clamp(72px,8.5vw,128px); }
.hero h1 span { color:#fff; }
.festival-lockup { margin:0 0 16px; font:500 11px/1.6 var(--font-interface); letter-spacing:.15em; color:var(--brand-yellow); }
.hero-details { pointer-events:auto; display:flex; align-items:center; gap:28px; padding:12px 16px; border:1px solid #ffffff30; border-radius:12px; background:#17181d50; backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
.hero:not(.home-hero) .hero-details { width:fit-content; max-width:100%; }
.hero .eyebrow { color:var(--brand-yellow); font:500 11px/1.7 var(--font-interface); letter-spacing:.12em; margin:0; }
.hero-location { display:flex; align-items:center; gap:9px; margin:0; color:#fff; font:400 12px/1.7 var(--font-interface); }
.hero-location svg { width:18px; height:18px; flex-shrink:0; color:var(--brand-yellow); }
.hero .button { margin-left:auto; min-height:44px; padding:10px 20px; font-size:11px; border-radius:8px; gap:22px; white-space:nowrap; }
@media(max-width:760px) {
  .hero { min-height:520px; }
  .home-hero { min-height:640px; }
  .hero-content { padding:140px 24px 24px; }
  .hero-title { padding-bottom:22px; }
  .hero h1 { font-size:clamp(58px,12vw,84px); }
  .home-hero .hero-content { position:static; padding:0; }
  .home-hero .hero-title { position:absolute; z-index:2; top:104px; left:24px; right:24px; padding:0; }
  .home-hero h1 { font-size:clamp(58px,17vw,70px); line-height:.92; }
  .home-hero .hero-details { position:absolute; z-index:2; left:24px; right:24px; bottom:24px; }
  .hero-details { flex-wrap:wrap; gap:10px 24px; padding:14px; }
  .hero .eyebrow { font-size:10px; letter-spacing:.08em; }
  .hero-location { font-size:11px; }
  .hero .button { margin:4px 0 0; flex-basis:100%; justify-content:space-between; }
}
@media(max-width:360px) {
  .hero-content { padding-inline:20px; }
  .hero h1 { font-size:56px; }
  .home-hero .hero-title { top:98px; left:20px; right:20px; }
  .home-hero .hero-details { left:20px; right:20px; bottom:20px; }
  .home-hero h1 { font-size:56px; }
}
@supports not (backdrop-filter:blur(1px)) {
  .hero-details { background:#17181dd9; }
}
</style>
