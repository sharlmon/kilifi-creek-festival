<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const exploreOpen = ref(false)
const scrolled = ref(false)
const toggle = ref<HTMLButtonElement>()
const menu = ref<HTMLElement>()
const explore = ref<HTMLElement>()
const exploreToggle = ref<HTMLButtonElement>()
const links = [['Home','/'],['About','/about'],['Programme','/screenings'],['Industry','/industry'],['Team','/team'],['Press','/press']]
const exploreLinks = [['Why Kilifi','/why-kilifi'],['Community Impact','/impact'],['Plan Your Visit','/visit'],['Partner With Us','/partners'],['Contact','/contact']]
watch(() => route.path, () => { open.value = false; exploreOpen.value = false })
watch(open, v => { if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '' })
function close() { open.value=false; toggle.value?.focus() }
function keydown(e: KeyboardEvent) {
  if(e.key==='Escape' && exploreOpen.value) { exploreOpen.value=false; exploreToggle.value?.focus(); return }
  if(e.key==='Escape' && open.value) close()
  if(e.key==='Tab' && open.value) {
    const theme = (e.currentTarget as HTMLElement).querySelector<HTMLButtonElement>('.theme-toggle')
    const nodes = [...Array.from(menu.value?.querySelectorAll<HTMLElement>('a,button') || []), theme, toggle.value].filter(Boolean) as HTMLElement[]
    if(e.shiftKey && document.activeElement===nodes[0]) { e.preventDefault(); nodes.at(-1)?.focus() }
    else if(!e.shiftKey && document.activeElement===nodes.at(-1)) { e.preventDefault(); nodes[0]?.focus() }
  }
}
function outside(e: PointerEvent) { if(exploreOpen.value && !explore.value?.contains(e.target as Node)) exploreOpen.value=false }
function resize() { if (window.innerWidth >= 1024) open.value = false; exploreOpen.value=false }
function scroll() { scrolled.value = window.scrollY > 24 }
onMounted(() => { scroll(); window.addEventListener('resize', resize); window.addEventListener('scroll', scroll, { passive: true }); document.addEventListener('pointerdown', outside) })
onBeforeUnmount(() => { if(import.meta.client) { document.body.style.overflow=''; window.removeEventListener('resize', resize); window.removeEventListener('scroll', scroll); document.removeEventListener('pointerdown', outside) } })
</script>
<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header" :class="{ scrolled }" @keydown="keydown">
    <div class="header-inner"><NuxtLink to="/" class="home-logo" aria-label="Kilifi Creek Festival home"><BrandLogo /></NuxtLink>
      <nav id="site-navigation" ref="menu" :class="{open}" aria-label="Main navigation"><NuxtLink v-for="[label,url] in links" :key="url" :to="url" :aria-current="route.path===url ? 'page' : undefined">{{ label }}</NuxtLink><div ref="explore" class="explore-menu" :class="{ open:exploreOpen }"><button ref="exploreToggle" type="button" class="explore-trigger" :class="{ active:exploreLinks.some(([,url]) => route.path===url) }" :aria-expanded="exploreOpen" aria-controls="explore-navigation" @click="exploreOpen=!exploreOpen">Explore <span aria-hidden="true">⌄</span></button><div id="explore-navigation" class="explore-panel" :aria-hidden="!exploreOpen"><NuxtLink v-for="[label,url] in exploreLinks" :key="url" :to="url" :tabindex="exploreOpen ? 0 : -1" :aria-current="route.path===url ? 'page' : undefined" @click="exploreOpen=false">{{ label }}</NuxtLink></div></div><NuxtLink class="submit-link" to="/screenings#programme">2026 PROGRAMME <span class="submit-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 18 18 6M6 6h12v12" /></svg></span></NuxtLink></nav>
      <div class="header-actions"><ThemeControl /><button ref="toggle" class="menu-toggle" :aria-expanded="open" aria-controls="site-navigation" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="open=!open">{{ open ? '×' : '☰' }}</button></div>
    </div>
  </header>
</template>

<style scoped>
.site-header nav .submit-link { display:inline-flex; align-items:center; gap:14px; min-height:44px; margin-left:6px; padding:6px 6px 6px 16px; border:1px solid #03393266; border-radius:999px; background:#ffffff24; color:var(--brand-teal); font:500 11px/1.4 var(--font-interface); letter-spacing:.02em; white-space:nowrap; transition:background .2s,border-color .2s; }
.site-header nav .submit-link:hover { color:var(--brand-teal); background:#ffffff50; border-color:var(--brand-yellow); }
.submit-arrow { display:grid; place-items:center; width:30px; height:30px; flex-shrink:0; border-radius:50%; background:var(--brand-yellow); color:var(--brand-teal); }
.submit-arrow svg { width:16px; height:16px; transition:transform .2s; }
.submit-link:hover .submit-arrow svg { transform:translate(1px,-1px); }
.submit-link:focus-visible { outline:3px solid var(--brand-yellow); outline-offset:4px; }
.explore-menu { position:relative; }
.explore-trigger { display:flex; align-items:center; gap:6px; min-height:44px; padding:8px 0; border:0; background:none; color:inherit; cursor:pointer; font:inherit; letter-spacing:inherit; text-transform:inherit; white-space:nowrap; }
.explore-trigger span { color:var(--brand-yellow); transition:transform .28s cubic-bezier(.22,1,.36,1); }
.explore-menu.open .explore-trigger span { transform:rotate(180deg); }
.explore-trigger.active { color:var(--brand-yellow); }
.explore-panel { position:absolute; top:calc(100% + 12px); right:-20px; z-index:5; display:grid; width:230px; max-height:0; padding:0 10px; overflow:hidden; visibility:hidden; opacity:0; transform:translateY(-12px) scale(.97); transform-origin:top center; border:0 solid #ffffff38; border-radius:14px; background:color-mix(in srgb,var(--brand-header-green) 96%,transparent); box-shadow:0 18px 50px #0006; backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); transition:max-height .32s cubic-bezier(.22,1,.36,1),padding .32s cubic-bezier(.22,1,.36,1),border-width .18s ease,opacity .2s ease,transform .32s cubic-bezier(.22,1,.36,1),visibility 0s linear .32s; }
.explore-menu.open .explore-panel { max-height:360px; padding:10px; visibility:visible; opacity:1; transform:translateY(0) scale(1); border-width:1px; transition-delay:0s; }
.explore-panel a { min-height:44px; padding:11px 12px; border-radius:8px; color:#fff; font-size:11px; }
.explore-panel a:hover,.explore-panel a[aria-current=page] { color:var(--brand-teal); background:var(--brand-yellow); }
@media(max-width:1023px) { .site-header nav.open .submit-link { margin:18px 0 0; padding-left:20px; gap:24px; font-size:12px; } .site-header nav.open .explore-menu { width:min(100%,320px); } .site-header nav.open .explore-trigger { justify-content:center; width:100%; font-size:18px; } .site-header nav.open .explore-panel { position:static; width:100%; margin-top:4px; box-shadow:none; background:#ffffff0a; } .site-header nav.open .explore-menu.open .explore-panel { padding:5px; border-color:#ffffff25; } .site-header nav.open .explore-panel a { text-align:center; font-size:14px; } }
@media(prefers-reduced-motion:reduce) { .site-header nav .submit-link,.submit-arrow svg,.explore-trigger span,.explore-panel { transition:none; } }
</style>
