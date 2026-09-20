<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
const toggle = ref<HTMLButtonElement>()
const menu = ref<HTMLElement>()
const links = [['Home','/'],['About','/about'],['Screenings','/screenings'],['Industry','/industry'],['Team','/team'],['Press','/press']]
const exploreLinks = [['Why Kilifi','/why-kilifi'],['Community Impact','/impact'],['Plan Your Visit','/visit'],['Partner With Us','/partners'],['Contact','/contact']]
watch(() => route.path, () => { open.value = false })
watch(open, v => { if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '' })
function close() { open.value=false; toggle.value?.focus() }
function keydown(e: KeyboardEvent) {
  if(e.key==='Escape') close()
  if(e.key==='Tab' && open.value) {
    const theme = (e.currentTarget as HTMLElement).querySelector<HTMLButtonElement>('.theme-toggle')
    const nodes = [...Array.from(menu.value?.querySelectorAll<HTMLElement>('a,summary') || []), theme, toggle.value].filter(Boolean) as HTMLElement[]
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
      <nav id="site-navigation" ref="menu" :class="{open}" aria-label="Main navigation"><NuxtLink v-for="[label,url] in links" :key="url" :to="url" :aria-current="route.path===url ? 'page' : undefined">{{ label }}</NuxtLink><details class="explore-menu"><summary :class="{ active: exploreLinks.some(([,url]) => route.path===url) }">Explore <span aria-hidden="true">⌄</span></summary><div class="explore-panel"><NuxtLink v-for="[label,url] in exploreLinks" :key="url" :to="url" :aria-current="route.path===url ? 'page' : undefined">{{ label }}</NuxtLink></div></details><a class="submit-link" href="https://filmfreeway.com/KilifiCreekFestival" target="_blank" rel="noopener noreferrer">SUBMIT FILM <span class="submit-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 18 18 6M6 6h12v12" /></svg></span></a></nav>
      <div class="header-actions"><ThemeControl /><button ref="toggle" class="menu-toggle" :aria-expanded="open" aria-controls="site-navigation" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="open=!open">{{ open ? '×' : '☰' }}</button></div>
    </div>
  </header>
</template>

<style scoped>
.site-header nav .submit-link { display:inline-flex; align-items:center; gap:14px; min-height:44px; margin-left:6px; padding:6px 6px 6px 16px; border:1px solid #ffffff50; border-radius:999px; background:#ffffff0c; color:#fff; font:500 11px/1.4 var(--font-interface); letter-spacing:.02em; white-space:nowrap; transition:background .2s,border-color .2s; }
.site-header nav .submit-link:hover { color:#fff; background:#ffffff1c; border-color:var(--brand-yellow); }
.submit-arrow { display:grid; place-items:center; width:30px; height:30px; flex-shrink:0; border-radius:50%; background:var(--brand-yellow); color:var(--brand-teal); }
.submit-arrow svg { width:16px; height:16px; transition:transform .2s; }
.submit-link:hover .submit-arrow svg { transform:translate(1px,-1px); }
.submit-link:focus-visible { outline:3px solid var(--brand-yellow); outline-offset:4px; }
.explore-menu { position:relative; }
.explore-menu summary { display:flex; align-items:center; gap:6px; min-height:44px; padding:8px 0; cursor:pointer; list-style:none; white-space:nowrap; }
.explore-menu summary::-webkit-details-marker { display:none; }
.explore-menu summary span { color:var(--brand-yellow); transition:transform .2s; }
.explore-menu[open] summary span { transform:rotate(180deg); }
.explore-menu summary.active { color:var(--brand-yellow); }
.explore-panel { position:absolute; top:calc(100% + 12px); right:-20px; display:grid; width:230px; padding:10px; border:1px solid #ffffff38; border-radius:14px; background:#033932f5; box-shadow:0 18px 50px #0006; backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); }
.explore-panel a { min-height:44px; padding:11px 12px; border-radius:8px; color:#fff; font-size:11px; }
.explore-panel a:hover,.explore-panel a[aria-current=page] { color:var(--brand-teal); background:var(--brand-yellow); }
@media(max-width:1023px) { .site-header nav.open .submit-link { margin:18px 0 0; padding-left:20px; gap:24px; font-size:12px; } .site-header nav.open .explore-menu { width:min(100%,320px); } .site-header nav.open .explore-menu summary { justify-content:center; font-size:18px; } .site-header nav.open .explore-panel { position:static; width:100%; margin-top:4px; padding:5px; border-color:#ffffff25; box-shadow:none; background:#ffffff0a; } .site-header nav.open .explore-panel a { text-align:center; font-size:14px; } }
@media(prefers-reduced-motion:reduce) { .site-header nav .submit-link,.submit-arrow svg { transition:none; } }
</style>
