<script setup lang="ts">
type Theme = 'system' | 'light' | 'dark'
const mode = ref<Theme>('system')
const systemDark = ref(false)
const dark = computed(() => mode.value === 'dark' || (mode.value === 'system' && systemDark.value))
let devicePreference: MediaQueryList | undefined
function readTheme(): Theme {
  try {
    const saved = localStorage.getItem('kcf-theme')
    return saved === 'light' || saved === 'dark' ? saved : 'system'
  } catch { return 'system' }
}
function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
}
function change() {
  mode.value = dark.value ? 'light' : 'dark'
  apply(mode.value)
  try { localStorage.setItem('kcf-theme', mode.value) } catch { /* Selection still works without browser storage. */ }
}
function sync(event: StorageEvent) {
  if (event.key === 'kcf-theme' || event.key === null) { mode.value = readTheme(); apply(mode.value) }
}
function deviceChanged(event: MediaQueryListEvent) { systemDark.value = event.matches }
onMounted(() => {
  devicePreference = window.matchMedia('(prefers-color-scheme: dark)')
  systemDark.value = devicePreference.matches
  mode.value = readTheme()
  apply(mode.value)
  devicePreference.addEventListener('change', deviceChanged)
  window.addEventListener('storage', sync)
})
onBeforeUnmount(() => { window.removeEventListener('storage', sync); devicePreference?.removeEventListener('change', deviceChanged) })
</script>
<template>
  <button type="button" class="theme-control theme-toggle" role="switch" aria-label="Dark mode" :aria-checked="dark" :title="dark ? 'Switch to light mode' : 'Switch to dark mode'" @click="change">
    <span class="theme-track" aria-hidden="true"><span class="theme-thumb">
      <svg class="theme-icon" :data-icon="dark ? 'dark' : 'light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path v-if="dark" d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" />
        <template v-else><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></template>
      </svg>
    </span></span>
  </button>
</template>
