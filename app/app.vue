<script setup lang="ts">
import fonts from '~/assets/fonts.json'
useHead({ link: [fonts.afolkalips, fonts['lemon-milk-regular']].map(font => ({ rel: 'preload', as: 'font', type: 'font/woff2', href: siteBase(font.url), crossorigin: 'anonymous' })) })
useHead({ script: [{ key: 'theme-init', innerHTML: "try{var t=localStorage.getItem('kcf-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'system'}catch(e){document.documentElement.dataset.theme='system'}" }] })
</script>
<template><NuxtRouteAnnouncer /><SiteHeader /><main id="main-content"><NuxtPage /></main><SiteFooter /></template>
