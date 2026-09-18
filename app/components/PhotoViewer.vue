<script setup lang="ts">
const dialog = ref<HTMLDialogElement>()
const photo = ref<{ src: string, alt: string }>()
const loading = ref(false)
const failed = ref(false)
const route = useRoute()
let trigger: HTMLImageElement | undefined
let previousOverflow = ''

async function open(image: HTMLImageElement) {
  if (dialog.value?.open) return
  trigger = image
  photo.value = { src: image.dataset.expandImage!, alt: image.alt }
  loading.value = true
  failed.value = false
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  dialog.value?.showModal()
}
function close() {
  if (!dialog.value?.open) return
  dialog.value.close()
}
function keydown(event: KeyboardEvent) {
  if (event.key !== 'Tab') return
  const controls = Array.from(dialog.value?.querySelectorAll<HTMLElement>('button, a[href]') || [])
  const first = controls[0]
  const last = controls.at(-1)
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
function restore() {
  document.body.style.overflow = previousOverflow
  if (trigger?.isConnected) trigger.focus({ preventScroll: true })
  trigger = undefined
  photo.value = undefined
}
watch(() => route.fullPath, close)
onBeforeUnmount(() => { if (dialog.value?.open) { dialog.value.close(); restore() } })
defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="photo-viewer" aria-label="Full image viewer" aria-modal="true" @keydown="keydown" @cancel.prevent="close" @close="restore" @click="($event.target === dialog) && close()">
    <button class="photo-close" aria-label="Close image viewer" autofocus @click="close">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M18 6 6 18" /></svg>
    </button>
    <template v-if="photo">
      <div class="photo-stage" :aria-busy="loading" @click.self="close">
        <span v-if="loading" class="photo-loading" role="status">Loading image…</span>
        <img :key="photo.src" :src="photo.src" :alt="photo.alt" decoding="async" @load="loading = false" @error="loading = false; failed = true" />
        <p v-if="failed" class="photo-error" role="alert">Unable to load this image. <a :href="photo.src" target="_blank" rel="noopener noreferrer">Open image</a></p>
      </div>
      <p class="photo-caption">{{ photo.alt }}</p>
    </template>
  </dialog>
</template>

<style scoped>
.photo-viewer { position:fixed; inset:0; width:100%; height:100%; max-width:none; max-height:none; margin:0; padding:76px 32px 24px; border:0; background:#101115f2; color:#fff; backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
.photo-viewer[open] { display:flex; flex-direction:column; gap:16px; }
.photo-viewer::backdrop { background:#101115cc; }
.photo-close { position:absolute; top:16px; right:20px; width:44px; height:44px; display:grid; place-items:center; color:#fff; border:1px solid #ffffff45; border-radius:50%; background:#ffffff14; cursor:pointer; }
.photo-close svg { width:24px; height:24px; }
.photo-close:hover { background:#ffffff30; }
.photo-close:focus-visible,.photo-error a:focus-visible { outline:3px solid var(--brand-yellow); outline-offset:4px; }
.photo-stage { position:relative; display:flex; align-items:center; justify-content:center; flex:1; min-height:0; }
.photo-stage img { width:100%; height:100%; object-fit:contain; border-radius:0; }
.photo-caption { flex-shrink:0; margin:0; text-align:center; font:400 11px/1.6 var(--font-interface); color:#ffffffbd; }
.photo-loading,.photo-error { position:absolute; padding:16px; background:#17181d; border-radius:12px; font-size:12px; }
.photo-error a { color:var(--brand-yellow); text-decoration:underline; }
@media(max-width:760px) { .photo-viewer { padding:72px 12px max(20px,env(safe-area-inset-bottom)); } .photo-close { right:12px; } .photo-caption { font-size:10px; padding-inline:12px; } }
</style>
