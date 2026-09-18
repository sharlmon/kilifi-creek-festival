<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
import sessions from '~/assets/programme.json'
import assets from '~/assets/asset-map.json'

const day = ref('all')
const venue = ref('all')
const query = ref('')
const savedOnly = ref(false)
const saved = ref<string[]>([])
const days = [...new Set(sessions.map(session => session.day))]
const venues = [...new Set(sessions.map(session => session.venue))]
const normalize = (value: string) => value.toLocaleLowerCase().replace(/[‘’']/g, '').replace(/\s+/g, ' ').trim()
const filtered = computed(() => sessions.filter(session =>
  (day.value === 'all' || session.day === day.value) &&
  (venue.value === 'all' || session.venue === venue.value) &&
  (!savedOnly.value || saved.value.includes(session.id)) &&
  normalize([session.day, session.venue, session.time, ...session.items].join(' ')).includes(normalize(query.value))
))
const grouped = computed(() => days.map(date => ({ day: date, sessions: filtered.value.filter(session => session.day === date) })).filter(group => group.sessions.length))
const expanded = ref<string[]>([])
const collapsedSearchResults = ref<string[]>([])
watch(query, () => { collapsedSearchResults.value = [] })
const isExpanded = (id: string) => normalize(query.value) ? !collapsedSearchResults.value.includes(id) : expanded.value.includes(id)
const allExpanded = computed(() => filtered.value.length > 0 && filtered.value.every(session => isExpanded(session.id)))
function toggleSession(id: string) {
  if(normalize(query.value)) {
    collapsedSearchResults.value = collapsedSearchResults.value.includes(id) ? collapsedSearchResults.value.filter(value => value !== id) : [...collapsedSearchResults.value, id]
    return
  }
  expanded.value = expanded.value.includes(id) ? expanded.value.filter(value => value !== id) : [...expanded.value, id]
}
function toggleAll() {
  if(normalize(query.value)) {
    collapsedSearchResults.value = allExpanded.value ? filtered.value.map(session => session.id) : []
  } else if(allExpanded.value) expanded.value = []
  else expanded.value = [...new Set([...expanded.value, ...filtered.value.map(session => session.id)])]
}
const hasFilters = computed(() => day.value !== 'all' || venue.value !== 'all' || Boolean(query.value) || savedOnly.value)
function toggleSave(id: string) {
  saved.value = saved.value.includes(id) ? saved.value.filter(value => value !== id) : [...saved.value, id]
  try { localStorage.setItem('kcf-programme-shortlist', JSON.stringify(saved.value)) } catch {}
}
function reset() { day.value = 'all'; venue.value = 'all'; query.value = ''; savedOnly.value = false }
onMounted(() => {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem('kcf-programme-shortlist') || '[]')
    if(Array.isArray(stored)) saved.value = stored.filter((id): id is string => typeof id === 'string' && sessions.some(session => session.id === id))
  } catch {}
})
</script>

<template>
  <section class="programme-schedule" id="programme" aria-labelledby="programme-title">
    <div class="programme-inner">
      <div class="programme-heading">
        <div>
          <p class="programme-kicker">KCF 2025 Recap</p>
          <h2 id="programme-title">PROGRAM</h2>
          <p>A WEEK OF CINEMA &amp; COMMUNITY ALONG THE WATER</p>
        </div>
        <div class="programme-identity"><BrandLogo /><span>YORA</span></div>
      </div>
      <div class="programme-tools">
        <label class="programme-search"><span class="sr-only">Search films, filmmakers or venues</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg><input v-model="query" type="search" placeholder="Search the programme" /></label>
        <label>Day<select v-model="day"><option value="all">All days</option><option v-for="date in days" :key="date" :value="date">{{ date }}</option></select></label>
        <label>Venue<select v-model="venue"><option value="all">All venues</option><option v-for="place in venues" :key="place" :value="place">{{ place }}</option></select></label>
        <button class="shortlist-filter" type="button" :aria-pressed="savedOnly" @click="savedOnly = !savedOnly"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4Z" /></svg>My shortlist <span>{{ saved.length }}</span></button>
      </div>
      <div class="programme-results"><p role="status">{{ filtered.length }} {{ filtered.length === 1 ? 'session' : 'sessions' }}</p><div><button v-if="hasFilters" type="button" @click="reset">Reset filters</button><button v-if="filtered.length" type="button" @click="toggleAll">{{ allExpanded ? 'Collapse all' : 'Expand all' }}</button></div></div>
      <div v-if="filtered.length" class="programme-agenda">
        <section v-for="group in grouped" :key="group.day" class="agenda-day" :aria-label="group.day">
          <h3 class="agenda-date">{{ group.day }}</h3>
          <div class="agenda-sessions">
            <article v-for="session in group.sessions" :key="session.id" class="programme-card programme-session" :aria-labelledby="`${session.id}-title`" :data-session="session.id">
              <div class="session-row">
                <button class="session-expand" type="button" :aria-expanded="isExpanded(session.id)" :aria-controls="`${session.id}-films`" @click="toggleSession(session.id)">
                  <span class="sr-only">{{ session.day }}</span>
                  <span class="session-info"><span class="session-venue" :id="`${session.id}-title`">{{ session.venue }}</span><span v-if="session.invitation" class="session-invitation">{{ session.invitation }}</span></span>
                  <span v-if="session.time" class="session-time">{{ session.time }}</span>
                  <span class="session-disclosure"><span>{{ isExpanded(session.id) ? 'Hide session' : 'View session' }}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></span>
                </button>
                <button type="button" class="save-session" :aria-pressed="saved.includes(session.id)" :aria-label="`${saved.includes(session.id) ? 'Remove' : 'Save'} ${session.day} at ${session.venue}${saved.includes(session.id) ? ' from shortlist' : ' to shortlist'}`" @click="toggleSave(session.id)"><svg viewBox="0 0 24 24" :fill="saved.includes(session.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4Z" /></svg><span class="sr-only">{{ saved.includes(session.id) ? 'Saved' : 'Save' }}</span></button>
              </div>
              <div :id="`${session.id}-films`" :hidden="!isExpanded(session.id)" class="session-detail">
                <ul class="programme-films"><li v-for="(item, index) in session.items" :key="index" :class="{'programme-qa': item.startsWith('+')}"><template v-if="item.includes(' by ')"><span class="film-title">{{ item.slice(0, item.indexOf(' by ')) }}</span><span class="film-credit"> by {{ item.slice(item.indexOf(' by ') + 4) }}</span></template><template v-else>{{ item }}</template></li></ul>
              </div>
            </article>
          </div>
        </section>
      </div>
      <div v-else class="programme-empty"><h3>No sessions match these filters.</h3><p>{{ savedOnly && !saved.length ? 'Save a session to create your shortlist.' : 'Try another day, venue or search.' }}</p><button class="button" type="button" @click="reset">Show all sessions</button></div>
      <p class="programme-archive">Explore the archived 2025 programme. Saved sessions are a personal shortlist on this device.</p>
      <div class="programme-original-note"><p>All screenings are FREE, but RSVP is required on<br /><a href="https://www.kilificreekfestival.com/" target="_blank" rel="noopener noreferrer">https://www.kilificreekfestival.com/</a></p><small>This notice is preserved from the 2025 poster. The 2026 programme is coming soon.</small></div>
      <details class="programme-poster"><summary>View original programme poster</summary><img :src="assets['2025prog.jpg.png']" v-bind="imageAttributes(assets['2025prog.jpg.png'], 'auto, (max-width: 760px) calc(100vw - 48px), 900px', 'KCF 2025 Programming')" alt="KCF 2025 Programming" loading="lazy" /></details>
    </div>
  </section>
</template>

<style scoped>
.programme-schedule { background:var(--soft-bg); padding:64px var(--space); }
.programme-inner { max-width:1120px; margin:auto; }
.programme-heading { display:flex; align-items:center; justify-content:space-between; gap:32px; margin-bottom:32px; }
.programme-kicker { color:var(--muted); font-size:11px; letter-spacing:.12em; margin:0 0 10px; }
h2 { color:var(--heading); margin:0 0 12px; font-size:40px; }
.programme-heading>div>p:last-child { font-size:11px; letter-spacing:.04em; margin:0; }
.programme-identity { display:flex; align-items:center; gap:16px; border-radius:12px; padding:4px 14px; }
.programme-identity :deep(.brand-logo) { width:56px; height:58px; }
.programme-identity>span { color:var(--yellow); font-weight:700; font-size:14px; letter-spacing:.05em; }
.programme-tools { display:grid; grid-template-columns:minmax(0,1.5fr) 140px minmax(0,1fr) auto; align-items:end; gap:12px; padding:16px; border:1px solid var(--glass-border); border-radius:14px; background:var(--panel); box-shadow:var(--glass-shadow); }
.programme-tools label { display:grid; gap:7px; font-size:11px; font-weight:500; color:var(--muted); min-width:0; }
.programme-tools input,.programme-tools select { font:inherit; font-size:12px; width:100%; min-width:0; min-height:44px; padding:10px 12px; color:var(--text); border:1px solid var(--control-border); border-radius:10px; }
.programme-tools .programme-search { display:block; position:relative; }
.programme-search input { padding-left:38px; }
.programme-search svg { width:17px; height:17px; position:absolute; left:13px; top:14px; color:var(--muted); z-index:1; pointer-events:none; }
input::placeholder { color:var(--muted); opacity:1; }
.shortlist-filter { min-height:44px; display:flex; gap:8px; align-items:center; padding:10px 12px; border:1px solid var(--control-border); color:var(--text); font-size:12px; white-space:nowrap; }
.shortlist-filter svg { width:16px; height:16px; }
.shortlist-filter>span { color:var(--muted); padding-left:4px; }
.programme-results { display:flex; justify-content:space-between; align-items:center; margin:14px 0; gap:16px; }
.programme-results p { margin:0; color:var(--muted); font-size:12px; }
.programme-results>div { display:flex; gap:20px; }
.programme-results button { padding:10px 0; min-height:44px; border:0; background:transparent; color:var(--link); font-size:12px; }
.programme-results button:hover { text-decoration:underline; text-underline-offset:4px; }
.programme-agenda { padding:0 28px; background:var(--panel); border:1px solid var(--glass-border); border-radius:16px; box-shadow:var(--glass-shadow); }
.agenda-day { display:grid; grid-template-columns:110px minmax(0,1fr); gap:24px; padding:20px 0; border-bottom:1px solid var(--line); }
.agenda-day:last-child { border:0; }
.agenda-date { font:600 12px/1.6 var(--font-interface); color:var(--muted); letter-spacing:.04em; margin:18px 0 0; }
.agenda-sessions { min-width:0; }
.programme-session { background:transparent; border:0; border-radius:0; padding:0; min-width:0; }
.programme-session+.programme-session { border-top:1px solid var(--line); margin-top:10px; padding-top:10px; }
.session-row { display:flex; align-items:center; gap:16px; }
.session-expand { display:grid; grid-template-columns:minmax(0,1fr) 130px 94px; align-items:center; gap:16px; width:100%; min-width:0; min-height:60px; padding:10px 0; color:var(--text); text-align:left; background:none; border:0; }
.session-info { grid-column:1; min-width:0; }
.session-venue { display:block; font-size:14px; font-weight:600; line-height:1.5; color:var(--heading); }
.session-expand:hover .session-venue { text-decoration:underline; text-underline-offset:4px; }
.session-invitation { display:block; font-size:11px; color:var(--muted); margin-top:4px; }
.session-time { grid-column:2; font-size:12px; color:var(--muted); font-variant-numeric:tabular-nums; white-space:nowrap; }
.session-disclosure { grid-column:3; display:flex; align-items:center; justify-content:flex-end; gap:8px; color:var(--muted); font-size:11px; }
.session-disclosure svg { width:16px; height:16px; flex-shrink:0; transition:transform .2s; }
.session-expand[aria-expanded=true] .session-disclosure svg { transform:rotate(180deg); }
.save-session { display:flex; align-items:center; justify-content:center; padding:10px; width:44px; min-height:44px; flex-shrink:0; color:var(--muted); border:1px solid transparent; border-radius:10px; }
.save-session svg { width:18px; height:18px; }
.session-detail { padding:4px 60px 12px 0; }
.session-detail[hidden] { display:none; }
.programme-films { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:0 28px; margin:0; padding:0; list-style:none; }
.programme-films li { padding:12px 0; border-top:1px solid var(--line); font-size:13px; line-height:1.6; min-width:0; }
.film-title { display:block; font-size:13px; font-weight:500; color:var(--heading); }
.film-credit { display:block; font-size:12px; color:var(--muted); }
.programme-films .programme-qa { grid-column:1 / -1; color:var(--muted); font-size:11px; padding:10px 0 0; }
.programme-empty { padding:40px 24px; text-align:center; border:1px solid var(--line); border-radius:var(--radius); }
.programme-empty h3 { font-size:24px; color:var(--heading); }
.programme-empty p { color:var(--muted); font-size:13px; }
.programme-archive { color:var(--muted); font-size:12px; margin:24px 0 0; }
.programme-original-note { margin-top:20px; padding-top:20px; border-top:1px solid var(--line); }
.programme-original-note p { font-size:12px; margin:0 0 8px; }
.programme-original-note a { color:var(--link); text-decoration:underline; overflow-wrap:anywhere; }
.programme-original-note small { color:var(--muted); font-size:11px; }
.programme-poster { margin-top:16px; }
.programme-poster summary { cursor:pointer; color:var(--link); width:fit-content; font-size:12px; padding:12px 0; }
.programme-poster img { max-width:min(100%,600px); border-radius:var(--radius); margin-top:16px; }
@media(max-width:1000px) {
  .programme-tools { grid-template-columns:minmax(0,1fr) minmax(0,1fr); }
  .programme-search { grid-column:1 / -1; }
  .shortlist-filter { justify-self:start; }
  .agenda-day { grid-template-columns:90px minmax(0,1fr); gap:20px; }
  .session-expand { grid-template-columns:minmax(0,1fr) 110px 18px; gap:12px; }
  .session-disclosure>span { display:none; }
}
@media(max-width:760px) {
  .programme-schedule { padding:40px 24px; }
  .programme-heading { align-items:flex-start; gap:20px; margin-bottom:24px; }
  h2 { font-size:34px; }
  .programme-heading>div>p:last-child { font-size:10px; }
  .programme-identity { padding:4px 8px; gap:8px; }
  .programme-identity :deep(.brand-logo) { width:42px; height:46px; }
  .programme-identity>span { font-size:11px; }
  .programme-tools { padding:12px; }
  .programme-agenda { padding:0 16px; }
  .agenda-day { display:block; padding:18px 0; }
  .agenda-date { font-size:11px; margin:0 0 10px; }
  .session-row { gap:8px; align-items:center; }
  .session-expand { grid-template-columns:minmax(0,1fr) 18px; gap:4px 8px; }
  .session-venue { font-size:13px; }
  .session-time { grid-row:2; grid-column:1; font-size:11px; }
  .session-disclosure { grid-column:2; grid-row:1 / 3; }
  .session-detail { padding:4px 0 10px; }
  .programme-films { grid-template-columns:1fr; }
}
@media(max-width:420px) {
  .programme-heading { flex-direction:column; gap:16px; }
  .programme-results>div { gap:16px; }
}
</style>
