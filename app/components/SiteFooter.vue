<template><footer class="site-footer"><div class="footer-top"><NuxtLink to="/" aria-label="Kilifi Creek Festival home"><BrandLogo /></NuxtLink><nav aria-label="Footer navigation"><NuxtLink v-for="[label,url] in [['About','/about'],['Screenings','/screenings'],['Industry','/industry'],['Team','/team'],['Press','/press'],['Contact','/contact']]" :key="url" :to="url">{{ label }}</NuxtLink></nav><a class="footer-email" href="mailto:comms@kilificreekfestival.com" aria-label="Email the festival">↗</a></div><p class="copyright">©2026 DESIGN BY TERRACE</p><p class="craft-credit">crafted by <a href="https://sharl-tech.co.ke/" target="_blank" rel="noopener noreferrer">sharltech</a></p></footer></template>

<style scoped>
.craft-credit { margin:8px 0 0; text-align:center; color:#ffffffcf; font:400 11px/1.6 var(--font-interface); letter-spacing:.04em; }
.craft-credit a { display:inline-flex; align-items:center; min-height:44px; color:var(--brand-yellow); text-decoration:underline; text-underline-offset:4px; }
.craft-credit a:hover { color:var(--brand-blue); }
.craft-credit a:focus-visible { outline:2px solid var(--brand-yellow); outline-offset:4px; border-radius:3px; }
</style>
