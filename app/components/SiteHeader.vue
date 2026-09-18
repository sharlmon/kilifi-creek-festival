<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
const toggle = ref<HTMLButtonElement>()
const menu = ref<HTMLElement>()
const links = [['Home','/'],['About','/about'],['Screenings','/screenings'],['Industry','/industry'],['Team','/team'],['Press','/press'],['Contact','/contact']]
watch(() => route.path, () => { open.value = false })
watch(open, v => { if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '' })
function close() { open.value=false; toggle.value?.focus() }
function keydown(e: KeyboardEvent) {
  if(e.key==='Escape') close()
  if(e.key==='Tab' && open.value) {
    const theme = (e.currentTarget as HTMLElement).querySelector<HTMLButtonElement>('.theme-toggle')
    const nodes = [...Array.from(menu.value?.querySelectorAll<HTMLElement>('a') || []), theme, toggle.value].filter(Boolean) as HTMLElement[]
    if(e.shiftKey && document.activeElement===nodes[0]) { e.preventDefault(); nodes.at(-1)?.focus() }
    else if(!e.shiftKey && document.activeElement===nodes.at(-1)) { e.preventDefault(); nodes[0]?.focus() }
  }
}
function resize() { if (window.innerWidth >= 1024) open.value = false }
function scroll() { scrolled.value = window.scrollY > 24 }
onMounted(() => { scroll(); window.addEventListener('resize', resize); window.addEventListener('scroll', scroll, { passive: true }) })
onBeforeUnmount(() => { if(import.meta.client) { document.body.style.overflow=''; window.removeEventListener('resize', resize); window.removeEventListener('scroll', scroll) } })
</script>
<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header" :class="{ scrolled }" @keydown="keydown">
    <div class="header-inner"><NuxtLink to="/" class="home-logo" aria-label="Kilifi Creek Festival home"><BrandLogo /></NuxtLink>
      <nav id="site-navigation" ref="menu" :class="{open}" aria-label="Main navigation"><NuxtLink v-for="[label,url] in links" :key="url" :to="url" :aria-current="route.path===url ? 'page' : undefined">{{ label }}</NuxtLink><a class="button" href="https://filmfreeway.com/KilifiCreekFestival" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">🎬</span> SUBMIT FILM</a></nav>
      <div class="header-actions"><ThemeControl /><button ref="toggle" class="menu-toggle" :aria-expanded="open" aria-controls="site-navigation" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="open=!open">{{ open ? '×' : '☰' }}</button></div>
    </div>
  </header>
</template>
