<script setup lang="ts">
defineProps<{ items: { id: string, label: string }[] }>()
const route = useRoute()
</script>
<template>
  <nav v-if="items.length > 1" class="section-shortcuts" aria-label="On this page">
    <div><NuxtLink v-for="item in items" :key="item.id" :to="`#${item.id}`" :aria-current="route.hash === '#' + item.id ? 'location' : undefined">{{ item.label }}</NuxtLink></div>
  </nav>
</template>
<style scoped>
.section-shortcuts { padding:12px var(--space); border-bottom:1px solid var(--line); background:var(--panel); }
.section-shortcuts>div { display:flex; gap:8px; overflow:auto; max-width:1280px; margin:auto; scrollbar-width:thin; }
.section-shortcuts a { display:flex; align-items:center; flex-shrink:0; min-height:44px; padding:10px 14px; border-radius:999px; font-size:10px; color:var(--text); }
.section-shortcuts a:hover,.section-shortcuts a[aria-current] { background:var(--soft-bg); box-shadow:inset 0 0 0 1px var(--line); }
@media(max-width:760px) { .section-shortcuts { padding-inline:16px; } }
</style>
