<script setup lang="ts">
type PopupState = 'open' | 'minimised' | 'closed'
const storageKey = 'kcf-donate-popup'
const state = ref<PopupState>('open')
const ready = ref(false)
const copied = ref('')

onMounted(() => {
  try {
    const saved = sessionStorage.getItem(storageKey)
    if (saved === 'open' || saved === 'minimised' || saved === 'closed') state.value = saved
  } catch {}
  ready.value = true
})

function setState(next: PopupState) {
  state.value = next
  try { sessionStorage.setItem(storageKey, next) } catch {}
}

async function copy(label: string, value: string) {
  try {
    await navigator.clipboard.writeText(value)
    copied.value = label
    setTimeout(() => { copied.value = '' }, 1600)
  } catch {}
}
</script>

<template>
  <div v-if="ready && state !== 'closed'" class="donate-popup" :class="state" role="complementary" aria-label="Donate to Kilifi Creek Festival">
    <button v-if="state === 'minimised'" type="button" class="donate-pill" aria-label="Show M-Pesa donation details" @click="setState('open')">
      <span class="logo-badge"><img :src="siteBase('/assets/brand/mpesa-logo.svg')" alt="M-PESA" width="64" height="25"></span>DONATE
    </button>
    <section v-else class="donate-card">
      <header>
        <p><span class="logo-badge"><img :src="siteBase('/assets/brand/mpesa-logo.svg')" alt="M-PESA" width="64" height="25"></span>DONATE</p>
        <div class="controls">
          <button type="button" aria-label="Minimise donation box" @click="setState('minimised')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14" /></svg></button>
          <button type="button" aria-label="Close donation box" @click="setState('closed')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
        </div>
      </header>
      <p class="donate-title">Support Kilifi Creek Festival</p>
      <dl>
        <div><dt>Paybill</dt><dd>542542</dd><button type="button" @click="copy('paybill', '542542')">{{ copied === 'paybill' ? 'Copied' : 'Copy' }}</button></div>
        <div><dt>Account</dt><dd>958885</dd><button type="button" @click="copy('account', '958885')">{{ copied === 'account' ? 'Copied' : 'Copy' }}</button></div>
      </dl>
      <p class="donate-name">Kilifi Creek Arts Festival</p>
    </section>
  </div>
</template>

<style scoped>
.donate-popup { position:fixed; bottom:16px; right:16px; z-index:60; max-width:calc(100vw - 32px); color:#fff; font-family:var(--font-interface); animation:donate-in .35s cubic-bezier(.22,1,.36,1); }
.donate-card { width:220px; padding:10px 12px 12px; border-radius:14px; border:1px solid #ffffff40; background:linear-gradient(160deg,#4fb848,#1f8a3b); box-shadow:0 16px 40px #0007; }
.donate-card header { display:flex; align-items:center; justify-content:space-between; gap:10px; }
.donate-card header p { display:flex; align-items:center; gap:6px; margin:0; font:700 9px/1.4 var(--font-label); letter-spacing:.08em; }
.logo-badge { display:inline-flex; align-items:center; padding:3px 7px; border-radius:7px; background:#fff; }
.logo-badge img { display:block; width:56px; height:auto; }
.controls { display:flex; gap:4px; }
.controls button { display:grid; place-items:center; width:26px; height:26px; border:0; border-radius:50%; background:#00000030; color:#fff; cursor:pointer; }
.controls button:hover { background:#00000055; }
.controls svg { width:13px; height:13px; }
.donate-title { margin:8px 0 8px; font:700 12px/1.3 var(--font-interface); }
dl { display:grid; gap:6px; margin:0; }
dl div { display:grid; grid-template-columns:46px 1fr auto; align-items:center; gap:6px; padding:6px 8px; border-radius:8px; background:#00000028; }
dt { font:600 8px/1.4 var(--font-label); letter-spacing:.06em; text-transform:uppercase; opacity:.85; }
dd { margin:0; font:800 14px/1.2 var(--font-interface); letter-spacing:.04em; }
dl button { min-height:24px; padding:0 8px; border:0; border-radius:999px; background:#fff; color:#1f6f31; font:700 10px/1 var(--font-interface); cursor:pointer; }
.donate-name { margin:8px 0 0; font-size:10px; opacity:.92; }
.donate-pill { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 12px 0 9px; border:1px solid #ffffff40; border-radius:999px; background:linear-gradient(160deg,#4fb848,#1f8a3b); color:#fff; font:700 9px/1 var(--font-label); letter-spacing:.08em; box-shadow:0 10px 28px #0006; cursor:pointer; }
.controls button:focus-visible,dl button:focus-visible,.donate-pill:focus-visible { outline:3px solid var(--brand-yellow); outline-offset:2px; }
@keyframes donate-in { from { opacity:0; transform:translateY(10px) scale(.97); } to { opacity:1; transform:none; } }
@media(prefers-reduced-motion:reduce) { .donate-popup { animation:none; } }
@media(max-width:680px) { .donate-popup { bottom:10px; right:10px; } .donate-card { width:210px; } }
</style>
