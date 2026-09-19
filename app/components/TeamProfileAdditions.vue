<script setup lang="ts">
import additions from '~/assets/team-additions.json'
import assets from '~/assets/asset-map.json'
import { imageAttributes } from '~/utils/images'

const profiles = additions.map(profile => ({
  ...profile,
  image: profile.imageKey ? assets[profile.imageKey as keyof typeof assets] : null
}))
</script>

<template>
  <section class="team-section team-additions" aria-label="Additional KCF team profiles">
    <article v-for="profile in profiles" :id="`team-${profile.id}`" :key="profile.name" class="profile">
      <div class="bounded">
        <div class="center">
          <h3>{{ profile.name }}</h3>
          <p>{{ profile.role }}</p>
        </div>
        <div>
          <div class="bounded">
            <img v-if="profile.image" :src="profile.image" v-bind="imageAttributes(profile.image, '(max-width: 760px) calc(100vw - 48px), 320px', profile.name)" :alt="profile.name" loading="lazy" />
            <div v-else class="profile-placeholder" role="img" :aria-label="profile.name">
              <span aria-hidden="true">{{ profile.initials }}</span>
            </div>
          </div>
        </div>
        <div class="center bounded">
          <p v-for="paragraph in profile.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.team-additions { padding-top:0; }
.profile-placeholder { position:sticky; top:84px; display:grid; place-items:center; aspect-ratio:4/5; border:1px solid var(--glass-border); border-radius:var(--radius); background:linear-gradient(145deg,#033932e6,#191a1fee); box-shadow:var(--glass-shadow); color:var(--brand-yellow); }
.profile-placeholder span { font:400 clamp(76px,8vw,112px)/1 var(--font-display); letter-spacing:.04em; }
@media(max-width:760px) { .profile-placeholder { position:static; } }
</style>
