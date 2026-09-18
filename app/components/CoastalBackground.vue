<script setup lang="ts">
import ambience from '~/assets/ambience.json'
</script>
<template><div class="coastal-background" aria-hidden="true" :style="{ '--coastal-image': `url('${siteBase(ambience.src)}')` }"></div></template>
<style scoped>
.coastal-background { position:fixed; inset:0; overflow:hidden; z-index:-1; pointer-events:none; }
.coastal-background::before { content:''; position:absolute; inset:-32px; background-image:var(--coastal-image); background-size:cover; background-position:center; filter:blur(16px); opacity:.45; }
</style>
