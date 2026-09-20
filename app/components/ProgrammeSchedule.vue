<script setup lang="ts">
const days = [
  { weekday: 'FRIDAY', date: '23 OCTOBER 2026' },
  { weekday: 'SATURDAY', date: '24 OCTOBER 2026' },
  { weekday: 'SUNDAY', date: '25 OCTOBER 2026' },
  { weekday: 'MONDAY', date: '26 OCTOBER 2026' },
  { weekday: 'TUESDAY', date: '27 OCTOBER 2026' },
  { weekday: 'WEDNESDAY', date: '28 OCTOBER 2026' },
  { weekday: 'THURSDAY', date: '29 OCTOBER 2026' },
  { weekday: 'FRIDAY', date: '30 OCTOBER 2026' },
  { weekday: 'SATURDAY', date: '31 OCTOBER 2026' }
]

const tracks = [
  {
    title: 'Festival Screenings',
    description: 'Confirmed films, screening times, and audience information will be added here.'
  },
  {
    title: 'Industry Sessions',
    description: 'Confirmed panels, workshops, masterclasses, and professional sessions will be added here.'
  }
]
</script>

<template>
  <section id="programme" class="programme-preview" aria-labelledby="programme-title">
    <div class="programme-inner">
      <header class="programme-heading">
        <div>
          <p class="programme-kicker">23–31 OCTOBER 2026</p>
          <h2 id="programme-title">FESTIVAL AND INDUSTRY PROGRAM</h2>
          <p class="programme-intro">Select a day to view its festival screenings and industry sessions. Venue and time details will be updated once they are confirmed.</p>
        </div>
        <p class="programme-status"><span aria-hidden="true"></span> PROGRAM COMING SOON</p>
      </header>

      <div class="programme-days">
        <details v-for="(day, index) in days" :key="day.date" class="programme-day">
          <summary>
            <span class="day-number">DAY {{ index + 1 }}</span>
            <span class="day-date"><strong>{{ day.weekday }}</strong><span>{{ day.date }}</span></span>
            <span class="day-venues"><strong>VENUES</strong><span>XXX</span></span>
            <span class="day-action"><span>VIEW DAY</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></span>
          </summary>
          <div class="programme-detail">
            <section v-for="track in tracks" :key="track.title" class="programme-track">
              <p class="track-type">{{ track.title }}</p>
              <h3>Schedule to be confirmed</h3>
              <p>{{ track.description }}</p>
              <dl>
                <div><dt>Venue</dt><dd>XXX</dd></div>
                <div><dt>Time</dt><dd>XXX</dd></div>
              </dl>
            </section>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.programme-preview { padding:72px var(--space); background:var(--soft-bg); }
.programme-inner { max-width:1180px; margin:auto; }
.programme-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:48px; margin-bottom:36px; }
.programme-heading>div { max-width:820px; }
.programme-kicker { margin:0 0 12px; color:var(--accent-text); font:600 11px/1.6 var(--font-interface); letter-spacing:.12em; }
h2 { margin:0 0 16px; color:var(--heading); font-size:clamp(38px,5vw,64px); }
.programme-intro { max-width:780px; margin:0; font-size:16px; line-height:1.8; }
.programme-status { display:flex; align-items:center; gap:10px; flex-shrink:0; margin:0 0 8px; color:var(--muted); font:600 11px/1.4 var(--font-interface); letter-spacing:.08em; }
.programme-status>span { width:9px; height:9px; border-radius:50%; background:var(--brand-yellow); box-shadow:0 0 0 5px #ffcb2126; }
.programme-days { overflow:hidden; border:1px solid var(--glass-border); border-radius:18px; background:var(--panel); box-shadow:var(--glass-shadow); }
.programme-day { border-bottom:1px solid var(--line); }
.programme-day:last-child { border-bottom:0; }
.programme-day summary { display:grid; grid-template-columns:90px minmax(220px,.8fr) minmax(300px,1.45fr) 110px; align-items:center; gap:24px; min-height:96px; padding:20px 28px; cursor:pointer; list-style:none; color:var(--text); transition:background .2s; }
.programme-day summary::-webkit-details-marker { display:none; }
.programme-day summary:hover { background:color-mix(in srgb,var(--brand-header-green) 12%,transparent); }
.programme-day summary:focus-visible { outline:3px solid var(--focus); outline-offset:-4px; }
.day-number,.day-date,.day-venues { min-width:0; }
.day-number { color:var(--muted); font:600 11px/1.5 var(--font-interface); letter-spacing:.1em; }
.day-date,.day-venues { display:flex; flex-direction:column; gap:5px; }
.day-date strong,.day-venues strong { color:var(--accent-text); font:600 11px/1.4 var(--font-interface); letter-spacing:.08em; }
.day-date>span { color:var(--heading); font:400 24px/1.15 var(--font-display); letter-spacing:.015em; }
.day-venues>span { overflow:hidden; color:var(--text); font:500 12px/1.5 var(--font-interface); text-overflow:ellipsis; white-space:nowrap; }
.day-action { display:flex; align-items:center; justify-content:flex-end; gap:10px; color:var(--muted); font:600 10px/1.4 var(--font-interface); letter-spacing:.06em; }
.day-action svg { width:18px; height:18px; transition:transform .2s; }
.programme-day[open] summary { background:color-mix(in srgb,var(--brand-header-green) 16%,transparent); }
.programme-day[open] .day-action svg { transform:rotate(180deg); }
.programme-detail { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; padding:0 28px 28px 142px; }
.programme-track { padding:22px; border:1px solid var(--line); border-radius:14px; background:color-mix(in srgb,var(--panel) 88%,var(--soft-bg)); }
.track-type { margin:0 0 14px; color:var(--accent-text); font:600 11px/1.4 var(--font-interface); letter-spacing:.08em; text-transform:uppercase; }
.programme-track h3 { margin:0 0 10px; color:var(--heading); font-size:22px; }
.programme-track>p:not(.track-type) { margin:0 0 18px; font-size:13px; line-height:1.65; }
.programme-track dl { display:grid; gap:8px; margin:0; padding-top:15px; border-top:1px solid var(--line); }
.programme-track dl div { display:flex; justify-content:space-between; gap:18px; font:500 11px/1.5 var(--font-interface); }
.programme-track dt { color:var(--muted); }
.programme-track dd { max-width:70%; margin:0; color:var(--text); text-align:right; }
@media(max-width:900px) {
  .programme-heading { align-items:flex-start; flex-direction:column; gap:20px; }
  .programme-day summary { grid-template-columns:70px minmax(180px,.85fr) minmax(220px,1.2fr) 36px; gap:16px; }
  .day-action>span { display:none; }
  .programme-detail { padding-left:114px; }
}
@media(max-width:680px) {
  .programme-preview { padding:48px 24px; }
  .programme-day summary { grid-template-columns:1fr 32px; gap:8px 14px; padding:18px 20px; }
  .day-number { grid-column:1; }
  .day-date { grid-column:1; }
  .day-venues { grid-column:1; margin-top:6px; }
  .day-venues>span { white-space:normal; }
  .day-action { grid-column:2; grid-row:1 / 4; }
  .programme-detail { grid-template-columns:1fr; padding:0 20px 20px; }
  .programme-track dd { max-width:65%; }
}
</style>
