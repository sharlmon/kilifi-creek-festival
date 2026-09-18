<script setup lang="ts">
import assets from '~/assets/asset-map.json'
import milestones from '~/assets/submissions.json'

// Transcribed exactly from the original submissions poster; no deadline is inferred.
const selected = ref(0)
const active = computed(() => milestones[selected.value]!)
const submissionUrl = 'https://filmfreeway.com/KilifiCreekFestival'
const calendarHref = computed(() => siteBase(`/assets/calendar/kcf-${active.value.day}.ics`))
</script>

<template>
  <section class="submission-experience" aria-labelledby="submissions-title" id="submissions">
    <div class="submission-inner">
      <div class="submission-heading">
        <div>
          <p class="submission-year">2026</p>
          <h2 id="submissions-title">CALL FOR SUBMISSIONS</h2>
          <p>Filmmakers are invited to submit their work to KCF via <a :href="submissionUrl" target="_blank" rel="noopener noreferrer">FilmFreeway</a>.</p>
        </div>
        <div class="submission-festival">
          <BrandLogo />
          <p>23<sup>rd</sup> – 31<sup>st</sup> October 2026<br /><span>KILIFI, KENYA</span></p>
        </div>
      </div>

      <p class="submission-hint">Select a date to explore the submission timeline.</p>
      <ol class="submission-timeline" aria-label="Submission milestones">
        <li v-for="(milestone, index) in milestones" :key="milestone.day">
          <button type="button" :aria-pressed="selected === index" aria-controls="submission-detail" @click="selected = index">
            <span class="milestone-number" aria-hidden="true">0{{ index + 1 }}</span>
            <span class="milestone-dot" aria-hidden="true"></span>
            <span class="milestone-date">{{ milestone.date }}</span>
            <span class="milestone-label">{{ milestone.label }}</span>
          </button>
        </li>
      </ol>

      <div class="submission-detail" id="submission-detail" aria-live="polite" aria-atomic="true">
        <div>
          <p class="submission-selected-date">{{ active.date }} <span>2026</span></p>
          <h3>{{ active.label }}</h3>
        </div>
        <a class="calendar-action" :href="calendarHref" :download="`kcf-${active.day}.ics`" :aria-label="`Add ${active.label}, ${active.date} 2026 to calendar`">Add to calendar <span aria-hidden="true">↗</span></a>
      </div>

      <div class="submission-bottom">
        <div class="submission-link">
          <p>SUBMIT YOUR FILM HERE:</p>
          <a :href="submissionUrl" target="_blank" rel="noopener noreferrer">{{ submissionUrl }}</a>
        </div>
        <a class="button" :href="submissionUrl" target="_blank" rel="noopener noreferrer">Submit on FilmFreeway →</a>
      </div>
      <p class="submission-note">Dates shown are from the original 2026 poster. Check FilmFreeway for current submission availability and requirements.</p>
      <div class="submission-poster">
        <PosterModalButton :src="assets['Call for submissions.png']" alt="KCF Call for Submissions Flyer" label="View original poster" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.submission-experience { padding:72px var(--space); background:var(--feature-bg); color:var(--on-feature); }
.submission-inner { max-width:1280px; margin:auto; }
.submission-heading { display:flex; justify-content:space-between; align-items:center; gap:48px; }
.submission-heading>div:first-child { max-width:800px; }
.submission-year { color:var(--yellow); font-size:12px; letter-spacing:.18em; margin:0 0 16px; }
h2 { color:var(--yellow); font-size:clamp(32px,3.6vw,52px); }
.submission-heading a,.submission-link a { text-decoration:underline; text-underline-offset:4px; }
.submission-festival { flex-shrink:0; text-align:center; }
.submission-festival :deep(.brand-logo) { margin:0 auto 16px; width:120px; height:115px; }
.submission-festival p { font-size:13px; line-height:1.8; margin:0; }
.submission-festival span { font-size:11px; letter-spacing:.12em; }
.submission-hint { font-size:13px; color:#c4d8cf; margin:36px 0 18px; }
.submission-timeline { display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); padding:0; margin:0; list-style:none; }
.submission-timeline li { min-width:0; }
.submission-timeline button { display:flex; flex-direction:column; position:relative; width:100%; text-align:left; background:transparent; color:inherit; border:0; padding:14px 16px 22px; border-radius:10px; min-height:180px; }
.submission-timeline button::before { content:''; position:absolute; height:1px; background:#6d8f81; left:0; right:0; top:59px; }
.submission-timeline li:first-child button::before { left:24px; }
.submission-timeline li:last-child button::before { right:calc(100% - 24px); }
.milestone-number { font-size:11px; color:#c4d8cf; letter-spacing:.12em; margin-bottom:16px; }
.milestone-dot { width:16px; height:16px; border:2px solid #accabd; background:var(--feature-bg); border-radius:50%; z-index:1; margin-bottom:20px; }
.milestone-date { font-size:14px; font-weight:700; margin-bottom:6px; }
.milestone-label { font-size:11px; letter-spacing:.04em; max-width:150px; }
.submission-timeline button:hover { background:#ffffff09; }
.submission-timeline button[aria-pressed=true] { background:#ffcb2112; color:var(--yellow); }
.submission-timeline button[aria-pressed=true] .milestone-dot { background:var(--yellow); border-color:var(--yellow); box-shadow:0 0 0 5px #ffcb211a; }
.submission-experience :focus-visible { outline-color:var(--yellow); }
.submission-detail { display:flex; justify-content:space-between; align-items:center; gap:24px; border:1px solid #688d7f; border-radius:var(--radius); padding:28px 32px; margin:20px 0 32px; background:#ffffff04; }
.submission-selected-date { margin:0 0 8px; color:var(--yellow); font-size:12px; font-weight:700; letter-spacing:.08em; }
.submission-selected-date span { margin-left:10px; color:#c4d8cf; }
h3 { font-size:clamp(24px,2.5vw,34px); margin:0; }
.calendar-action { display:inline-flex; gap:24px; align-items:center; flex-shrink:0; border:1px solid #89a89b; border-radius:var(--radius); padding:12px 18px; font-size:13px; }
.calendar-action:hover { color:var(--yellow); border-color:var(--yellow); }
.submission-bottom { display:flex; justify-content:space-between; align-items:center; gap:24px; }
.submission-link { min-width:0; }
.submission-link p { font-size:11px; letter-spacing:.08em; margin:0 0 6px; }
.submission-link a { font-size:13px; overflow-wrap:anywhere; }
.submission-bottom .button { flex-shrink:0; font-size:13px; }
.submission-note { font-size:12px; color:#c4d8cf; margin:24px 0; max-width:760px; }
.submission-poster { border-top:1px solid #ffffff25; padding-top:18px; }
@media(max-width:1000px) {
  .submission-timeline { grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px 0; }
  .submission-timeline li:nth-child(3) button::before,.submission-timeline li:last-child button::before { right:calc(100% - 24px); }
  .submission-timeline li:nth-child(4) button::before { left:24px; }
}
@media(max-width:760px) {
  .submission-experience { padding:45px 24px; }
  .submission-heading { align-items:flex-start; gap:20px; }
  .submission-heading p { font-size:14px; }
  .submission-detail { padding:24px; flex-direction:column; align-items:flex-start; }
  .submission-bottom { flex-direction:column; align-items:flex-start; }
  .submission-timeline { grid-template-columns:1fr; gap:0; }
  .submission-timeline button { min-height:0; display:grid; grid-template-columns:16px 1fr; gap:5px 20px; padding:18px 16px; }
  .milestone-number { display:none; }
  .milestone-dot { grid-column:1; grid-row:1 / 3; margin:2px 0 0; }
  .milestone-date,.milestone-label { grid-column:2; margin:0; max-width:none; }
  .submission-timeline button::before,.submission-timeline li:nth-child(n) button::before { width:1px; height:auto; left:23px; top:24px; bottom:-24px; right:auto; }
  .submission-timeline li:last-child button::before { display:none; }
  .submission-hint { margin-top:24px; }
  .submission-heading { flex-direction:column; }
  .submission-festival { display:flex; align-items:center; gap:20px; text-align:left; }
  .submission-festival :deep(.brand-logo) { width:80px; height:80px; margin:0; }
}
</style>
