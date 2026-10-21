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
    <button v-if="state === 'minimised'" type="button" class="donate-pill" aria-label="Show donation details" @click="setState('open')">
      <span class="pill-mark" aria-hidden="true">M</span> DONATE VIA M-PESA
    </button>
    <section v-else class="donate-card">
      <header>
        <p><span class="pill-mark" aria-hidden="true">M</span> DONATE VIA M-PESA</p>
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
.donate-popup { position:fixed; top:92px; right:16px; z-index:60; max-width:calc(100vw - 32px); color:#fff; font-family:var(--font-interface); animation:donate-in .35s cubic-bezier(.22,1,.36,1); }
.donate-card { width:290px; padding:14px 16px 16px; border-radius:16px; border:1px solid #ffffff40; background:linear-gradient(160deg,#4fb848,#1f8a3b); box-shadow:0 16px 40px #0007; }
.donate-card header { display:flex; align-items:center; justify-content:space-between; gap:10px; }
.donate-card header p { display:flex; align-items:center; gap:8px; margin:0; font:700 11px/1.4 var(--font-label); letter-spacing:.08em; }
.pill-mark { display:inline-grid; place-items:center; width:20px; height:20px; border-radius:50%; background:#fff; color:#1f8a3b; font:800 12px/1 var(--font-interface); }
.controls { display:flex; gap:4px; }
.controls button { display:grid; place-items:center; width:32px; height:32px; border:0; border-radius:50%; background:#00000030; color:#fff; cursor:pointer; }
.controls button:hover { background:#00000055; }
.controls svg { width:16px; height:16px; }
.donate-title { margin:12px 0 10px; font:700 15px/1.3 var(--font-interface); }
dl { display:grid; gap:8px; margin:0; }
dl div { display:grid; grid-template-columns:62px 1fr auto; align-items:center; gap:8px; padding:8px 10px; border-radius:10px; background:#00000028; }
dt { font:600 10px/1.4 var(--font-label); letter-spacing:.08em; text-transform:uppercase; opacity:.85; }
dd { margin:0; font:800 18px/1.2 var(--font-interface); letter-spacing:.04em; }
dl button { min-height:28px; padding:0 10px; border:0; border-radius:999px; background:#fff; color:#1f6f31; font:700 11px/1 var(--font-interface); cursor:pointer; }
.donate-name { margin:10px 0 0; font-size:12px; opacity:.92; }
.donate-pill { display:flex; align-items:center; gap:8px; min-height:44px; padding:0 16px 0 12px; border:1px solid #ffffff40; border-radius:999px; background:linear-gradient(160deg,#4fb848,#1f8a3b); color:#fff; font:700 11px/1 var(--font-label); letter-spacing:.08em; box-shadow:0 10px 28px #0006; cursor:pointer; }
.controls button:focus-visible,dl button:focus-visible,.donate-pill:focus-visible { outline:3px solid var(--brand-yellow); outline-offset:2px; }
@keyframes donate-in { from { opacity:0; transform:translateY(-10px) scale(.97); } to { opacity:1; transform:none; } }
@media(prefers-reduced-motion:reduce) { .donate-popup { animation:none; } }
@media(max-width:680px) { .donate-popup { top:78px; right:10px; } .donate-card { width:260px; } }
</style>
