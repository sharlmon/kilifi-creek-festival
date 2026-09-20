<script setup lang="ts">
import { festivalPartners } from '~/data/partners'
</script>

<template>
  <div class="confirmed-partner-grid">
    <article v-for="partner in festivalPartners" :key="partner.name" class="confirmed-partner-card">
      <img
        :src="siteBase(partner.image)"
        :alt="partner.name"
        :width="partner.width"
        :height="partner.height"
        loading="lazy"
      />
      <span class="sr-only">{{ partner.name }}</span>
    </article>
  </div>
</template>

<style scoped>
.confirmed-partner-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin-top:34px; }
.confirmed-partner-card { display:grid; place-items:center; min-height:164px; padding:24px; overflow:hidden; border:1px solid #dde5e2; border-radius:14px; background:#fff; box-shadow:0 10px 30px #062f2910; }
.confirmed-partner-card img { display:block; width:auto; height:auto; max-width:100%; max-height:100px; object-fit:contain; }
.confirmed-partner-card:nth-child(5) img { max-height:118px; }
.confirmed-partner-card img[alt="Chicken & Egg Films"] { max-height:116px; }
@media(max-width:1000px) { .confirmed-partner-grid { grid-template-columns:repeat(3,minmax(0,1fr)); } }
@media(max-width:760px) { .confirmed-partner-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; } .confirmed-partner-card { min-height:132px; padding:18px; } .confirmed-partner-card img { max-height:82px; } .confirmed-partner-card img[alt="Chicken & Egg Films"] { max-height:96px; } }
@media(max-width:420px) { .confirmed-partner-grid { grid-template-columns:1fr; } .confirmed-partner-card { min-height:140px; } }
</style>
