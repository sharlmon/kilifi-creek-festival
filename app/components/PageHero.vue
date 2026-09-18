<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
import assets from '~/assets/asset-map.json'
const props = defineProps<{title?: string, home?: boolean, image?: string}>()
const heroImage = computed(() => assets[(props.image || (props.home ? 'home.jpg' : 'image4.jpg')) as keyof typeof assets])
</script>
<template><section class="hero" :class="{ 'home-hero': home }"><img class="hero-image" :src="heroImage" v-bind="imageAttributes(heroImage, '100vw')" loading="eager" :alt="home ? 'Festival filmmakers celebrating with their awards' : 'Kilifi Creek Festival — ' + title" fetchpriority="high" /><div class="hero-shade"></div><div class="hero-content"><div class="hero-copy"><p class="eyebrow">23 - 31 OCTOBER 2026</p><h1 v-if="home">KILIFI CREEK<br /><span>FESTIVAL</span></h1><template v-else><p class="festival-lockup">KILIFI CREEK FESTIVAL</p><h1>{{ title }}</h1></template><p class="hero-location"><span aria-hidden="true">⌖</span> Kilifi Creek, Kenya</p><a v-if="home" class="button" href="https://filmfreeway.com/KilifiCreekFestival" target="_blank" rel="noopener noreferrer">SUBMIT FILM <span aria-hidden="true">↗</span></a></div></div></section></template>
