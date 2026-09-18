<script setup lang="ts">
const dialog = ref<HTMLDialogElement>()
const stage = ref<HTMLElement>()
const fullImage = ref<HTMLImageElement>()
const photo = ref<{ src: string, alt: string }>()
const loading = ref(false)
const failed = ref(false)
const zoom = ref(1)
const offset = reactive({ x:0, y:0 })
const dragging = ref(false)
const route = useRoute()
const filename = computed(() => decodeURIComponent(photo.value?.src.split('/').at(-1) || 'festival-image.webp'))
let trigger: HTMLElement | undefined
let previousOverflow = ''
const pointers = new Map<number, {x: number, y: number}>()
let moved = false
let pinch: { distance:number, scale:number, x:number, y:number, cx:number, cy:number } | undefined

function fittedSize() {
  const image = fullImage.value
  const area = stage.value
  if (!image?.naturalWidth || !area) return { width:0, height:0 }
  const fit = Math.min(area.clientWidth / image.naturalWidth, area.clientHeight / image.naturalHeight)
  return { width:image.naturalWidth * fit, height:image.naturalHeight * fit }
}
function constrain() {
  const fit = fittedSize()
  const maxX = Math.max(0, (fit.width * zoom.value - (stage.value?.clientWidth || 0)) / 2)
  const maxY = Math.max(0, (fit.height * zoom.value - (stage.value?.clientHeight || 0)) / 2)
  offset.x = Math.max(-maxX, Math.min(maxX, offset.x))
  offset.y = Math.max(-maxY, Math.min(maxY, offset.y))
}
function setZoom(value:number, focal = { x:0, y:0 }) {
  const next = Math.min(5, Math.max(1, value))
  const ratio = next / zoom.value
  offset.x = (offset.x - focal.x) * ratio + focal.x
  offset.y = (offset.y - focal.y) * ratio + focal.y
  zoom.value = next
  if (next === 1) offset.x = offset.y = 0
  constrain()
}
function focalPoint(x:number, y:number) {
  const rect = stage.value!.getBoundingClientRect()
  return { x:x - rect.left - rect.width / 2, y:y - rect.top - rect.height / 2 }
}
function beginPinch() {
  const [a,b] = [...pointers.values()]
  if (!a || !b) { pinch = undefined; return }
  const center = focalPoint((a.x + b.x)/2, (a.y + b.y)/2)
  pinch = { distance:Math.max(1, Math.hypot(a.x-b.x,a.y-b.y)), scale:zoom.value, x:offset.x, y:offset.y, cx:center.x, cy:center.y }
}
function pointerDown(event:PointerEvent) {
  if (loading.value || failed.value || event.button > 0 || (event.target as Element).closest('a')) return
  if (!pointers.size) moved = false
  pointers.set(event.pointerId, {x:event.clientX, y:event.clientY})
  stage.value?.setPointerCapture(event.pointerId)
  dragging.value = zoom.value > 1
  if (pointers.size === 2) beginPinch()
}
function pointerMove(event:PointerEvent) {
  const previous = pointers.get(event.pointerId)
  if (!previous) return
  pointers.set(event.pointerId, {x:event.clientX,y:event.clientY})
  if (pointers.size === 2 && pinch) {
    const [a,b] = [...pointers.values()]
    if (!a || !b) return
    const center = focalPoint((a.x+b.x)/2,(a.y+b.y)/2)
    zoom.value = Math.min(5, Math.max(1, pinch.scale * Math.hypot(a.x-b.x,a.y-b.y) / pinch.distance))
    const ratio = zoom.value / pinch.scale
    offset.x = (pinch.x-pinch.cx)*ratio+center.x
    offset.y = (pinch.y-pinch.cy)*ratio+center.y
    moved = true
  } else if (zoom.value > 1) {
    const dx = event.clientX-previous.x, dy = event.clientY-previous.y
    offset.x += dx; offset.y += dy
    if (Math.abs(dx)+Math.abs(dy)>2) moved = true
  }
  constrain()
}
function pointerUp(event:PointerEvent) {
  pointers.delete(event.pointerId)
  if (stage.value?.hasPointerCapture(event.pointerId)) stage.value.releasePointerCapture(event.pointerId)
  pinch = undefined
  dragging.value = pointers.size > 0 && zoom.value > 1
}
function stageClick(event:MouseEvent) {
  if (moved || (event.target as Element).closest('a')) return
  const point = focalPoint(event.clientX,event.clientY)
  const fit = fittedSize()
  if (Math.abs(point.x-offset.x)>fit.width*zoom.value/2 || Math.abs(point.y-offset.y)>fit.height*zoom.value/2) close()
}
function wheel(event:WheelEvent) {
  if (loading.value || failed.value) return
  setZoom(zoom.value*Math.exp(-event.deltaY*.002),focalPoint(event.clientX,event.clientY))
}
async function open(image: HTMLElement) {
  if (dialog.value?.open) return
  trigger = image
  photo.value = { src:image.dataset.expandImage!, alt:image.dataset.imageAlt || image.getAttribute('alt') || '' }
  loading.value = true; failed.value = false
  zoom.value = 1; offset.x = offset.y = 0; pointers.clear(); moved = false
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  dialog.value?.showModal()
}
function close() { if (dialog.value?.open) dialog.value.close() }
function keydown(event: KeyboardEvent) {
  if (['+','=','-','0'].includes(event.key) && !loading.value && !failed.value) {
    event.preventDefault()
    setZoom(event.key === '0' ? 1 : zoom.value + (event.key === '-' ? -.5 : .5))
  }
  if (event.key.startsWith('Arrow') && zoom.value > 1) {
    event.preventDefault()
    if(event.key==='ArrowLeft') offset.x += 60
    if(event.key==='ArrowRight') offset.x -= 60
    if(event.key==='ArrowUp') offset.y += 60
    if(event.key==='ArrowDown') offset.y -= 60
    constrain()
  }
  if (event.key !== 'Tab') return
  const controls = Array.from(dialog.value?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]') || [])
  if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus() }
  else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus() }
}
function restore() {
  document.body.style.overflow = previousOverflow
  if (trigger?.isConnected) trigger.focus({preventScroll:true})
  trigger = undefined; photo.value = undefined; pointers.clear(); pinch = undefined; dragging.value = false
}
watch(() => route.fullPath, close)
onMounted(() => window.addEventListener('resize',constrain))
onBeforeUnmount(() => { window.removeEventListener('resize',constrain); if(dialog.value?.open) { dialog.value.close(); restore() } })
defineExpose({open})
</script>
<template>
  <dialog ref="dialog" class="photo-viewer" aria-label="Full image viewer" aria-modal="true" @keydown="keydown" @cancel.prevent="close" @close="restore" @click="($event.target === dialog) && close()">
    <div v-if="photo" class="photo-tools" aria-label="Image controls">
      <button type="button" aria-label="Zoom out" :disabled="zoom <= 1 || loading || failed" @click="setZoom(zoom-.5)">−</button>
      <button type="button" class="photo-reset" aria-label="Reset zoom" @click="setZoom(1)">{{ Math.round(zoom*100) }}%</button>
      <button type="button" aria-label="Zoom in" :disabled="zoom >= 5 || loading || failed" @click="setZoom(zoom+.5)">+</button>
      <a :href="photo.src" :download="filename" aria-label="Download image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></svg></a>
    </div>
    <button class="photo-close" aria-label="Close image viewer" autofocus @click="close"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
    <template v-if="photo">
      <div ref="stage" class="photo-stage" :class="{zoomed:zoom>1,dragging}" tabindex="0" aria-label="Image preview" aria-describedby="viewer-instructions" :aria-busy="loading" @pointerdown="pointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="pointerUp" @click="stageClick" @wheel.prevent="wheel" @dblclick.prevent="setZoom(zoom>1 ? 1 : 2, focalPoint($event.clientX,$event.clientY))">
        <span v-if="loading" class="photo-loading" role="status">Loading image…</span>
        <img ref="fullImage" :key="photo.src" :src="photo.src" :alt="photo.alt" draggable="false" decoding="async" :style="{transform:`translate(${offset.x}px, ${offset.y}px) scale(${zoom})`}" @load="loading=false;constrain()" @error="loading=false;failed=true" />
        <p v-if="failed" class="photo-error" role="alert">Unable to load this image. <a :href="photo.src" target="_blank" rel="noopener noreferrer">Open image</a></p>
      </div>
      <div class="photo-footer"><p class="photo-caption">{{ photo.alt }}</p><p id="viewer-instructions">Pinch or use + / − to zoom. Drag to move. Press 0 to reset.</p></div>
    </template>
  </dialog>
</template>
<style scoped>
.photo-viewer { position:fixed; inset:0; width:100%; height:100%; max-width:none; max-height:none; margin:0; padding:76px 32px 20px; border:0; background:#101115f2; color:#fff; backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
.photo-viewer[open] { display:flex; flex-direction:column; gap:16px; }
.photo-viewer::backdrop { background:#101115cc; }
.photo-tools { display:flex; align-items:center; gap:6px; position:absolute; top:16px; left:32px; }
.photo-tools button,.photo-tools a,.photo-close { display:grid; place-items:center; height:44px; min-width:44px; border:1px solid #ffffff45; border-radius:999px; background:#ffffff14; color:#fff; cursor:pointer; }
.photo-tools button { font:400 24px/1 var(--font-interface); }
.photo-tools button.photo-reset { font-size:11px; width:62px; }
.photo-tools button:disabled { opacity:.35; cursor:default; }
.photo-tools svg,.photo-close svg { width:20px; height:20px; }
.photo-close { position:absolute; top:16px; right:20px; width:44px; }
.photo-tools button:not(:disabled):hover,.photo-tools a:hover,.photo-close:hover { background:#ffffff30; }
.photo-viewer :focus-visible { outline:3px solid var(--brand-yellow); outline-offset:3px; }
.photo-stage { position:relative; display:flex; align-items:center; justify-content:center; flex:1; min-height:0; overflow:hidden; touch-action:none; }
.photo-stage.zoomed { cursor:grab; }
.photo-stage.dragging { cursor:grabbing; }
.photo-stage img { width:100%; height:100%; object-fit:contain; border-radius:0; user-select:none; pointer-events:none; transform-origin:center; }
.photo-footer { flex-shrink:0; text-align:center; }
.photo-caption { margin:0 0 4px; font:400 11px/1.6 var(--font-interface); color:#ffffffd9; }
.photo-footer p:last-child { margin:0; color:#ffffff99; font:400 9px/1.6 var(--font-interface); }
.photo-loading,.photo-error { position:absolute; padding:16px; background:#17181d; border-radius:12px; font-size:12px; }
.photo-error a { color:var(--brand-yellow); text-decoration:underline; }
@media(max-width:760px) { .photo-viewer { padding:72px 12px max(20px,env(safe-area-inset-bottom)); } .photo-close { right:12px; } .photo-tools { left:12px; } .photo-caption { font-size:10px; padding-inline:12px; } }
</style>
