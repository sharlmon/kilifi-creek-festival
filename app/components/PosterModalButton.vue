<script setup lang="ts">
defineProps<{ src: string, alt: string, label: string }>()
</script>

<template>
  <button type="button" class="poster-modal-trigger" :data-expand-image="siteBase(src)" :data-image-alt="alt" aria-haspopup="dialog">
    <span>{{ label }}</span>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" /></svg>
  </button>
</template>

<style scoped>
.poster-modal-trigger { display:inline-flex; align-items:center; gap:16px; min-height:44px; max-width:100%; padding:10px 14px; border:1px solid var(--line); border-radius:12px; color:var(--text); background:var(--panel); font:400 12px/1.6 var(--font-interface); text-align:left; cursor:pointer; }
.poster-modal-trigger svg { width:18px; height:18px; flex-shrink:0; }
.poster-modal-trigger:hover { border-color:var(--focus); }
.poster-modal-trigger:focus-visible { outline:3px solid var(--focus); outline-offset:4px; }
</style>
