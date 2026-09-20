<script setup lang="ts">
const days = [
  { weekday: 'TUESDAY', date: '27 OCTOBER 2026' },
  { weekday: 'WEDNESDAY', date: '28 OCTOBER 2026' },
  { weekday: 'THURSDAY', date: '29 OCTOBER 2026' },
  { weekday: 'FRIDAY', date: '30 OCTOBER 2026' },
  { weekday: 'SATURDAY', date: '31 OCTOBER 2026' }
]

const tracks = [
  {
    title: 'Festival Screenings',
    description: 'The day’s confirmed films, screening times, and audience information will be added here.'
  },
  {
    title: 'Industry Programme',
    description: 'Confirmed panels, workshops, masterclasses, and professional sessions will be added here.'
  }
]
</script>

<template>
  <section id="programme" class="programme-preview" aria-labelledby="programme-title">
    <div class="programme-inner">
      <header class="programme-heading">
        <div>
          <p class="programme-kicker">27–31 OCTOBER 2026</p>
          <h2 id="programme-title">2026 Programme</h2>
          <p class="programme-intro">The festival programme is taking shape. Each day will include dedicated festival screenings and industry activities. Confirmed films, sessions, times, and locations will be published here in due time.</p>
        </div>
        <p class="programme-status"><span aria-hidden="true"></span> PROGRAMME COMING SOON</p>
      </header>

      <div class="programme-days">
        <article v-for="(day, index) in days" :key="day.date" class="programme-day">
          <div class="programme-date">
            <span>DAY {{ String(index + 1).padStart(2, '0') }}</span>
            <p>{{ day.weekday }}</p>
            <h3>{{ day.date }}</h3>
          </div>
          <div class="programme-tracks">
            <section v-for="track in tracks" :key="track.title" class="programme-track">
              <p class="track-type">{{ track.title }}</p>
              <h4>Schedule to be confirmed</h4>
              <p>{{ track.description }}</p>
              <dl>
                <div><dt>Location</dt><dd>To be confirmed</dd></div>
                <div><dt>Time</dt><dd>To be confirmed</dd></div>
              </dl>
            </section>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.programme-preview { padding:72px var(--space); background:var(--soft-bg); }
.programme-inner { max-width:1180px; margin:auto; }
.programme-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:48px; margin-bottom:36px; }
.programme-heading>div { max-width:800px; }
.programme-kicker { margin:0 0 12px; color:var(--accent-text); font:600 11px/1.6 var(--font-interface); letter-spacing:.12em; }
h2 { margin:0 0 16px; color:var(--heading); font-size:clamp(38px,5vw,64px); }
.programme-intro { margin:0; max-width:760px; font-size:16px; line-height:1.8; }
.programme-status { display:flex; align-items:center; gap:10px; flex-shrink:0; margin:0 0 8px; color:var(--muted); font:600 11px/1.4 var(--font-interface); letter-spacing:.08em; }
.programme-status span { width:9px; height:9px; border-radius:50%; background:var(--brand-yellow); box-shadow:0 0 0 5px #ffcb2126; }
.programme-days { overflow:hidden; border:1px solid var(--glass-border); border-radius:18px; background:var(--panel); box-shadow:var(--glass-shadow); }
.programme-day { display:grid; grid-template-columns:230px minmax(0,1fr); gap:30px; padding:28px; border-bottom:1px solid var(--line); }
.programme-day:last-child { border-bottom:0; }
.programme-date>span { color:var(--muted); font:600 10px/1.5 var(--font-interface); letter-spacing:.12em; }
.programme-date p { margin:18px 0 4px; color:var(--accent-text); font:600 12px/1.4 var(--font-interface); letter-spacing:.08em; }
.programme-date h3 { margin:0; color:var(--heading); font-size:26px; line-height:1.15; }
.programme-tracks { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
.programme-track { padding:22px; border:1px solid var(--line); border-radius:14px; background:color-mix(in srgb,var(--panel) 88%,var(--soft-bg)); }
.track-type { margin:0 0 14px; color:var(--accent-text); font:600 11px/1.4 var(--font-interface); letter-spacing:.08em; text-transform:uppercase; }
.programme-track h4 { margin:0 0 10px; color:var(--heading); font-size:20px; }
.programme-track>p:not(.track-type) { margin:0 0 18px; font-size:13px; line-height:1.65; }
.programme-track dl { display:grid; gap:8px; margin:0; padding-top:15px; border-top:1px solid var(--line); }
.programme-track dl div { display:flex; justify-content:space-between; gap:18px; font:500 11px/1.5 var(--font-interface); }
.programme-track dt { color:var(--muted); }
.programme-track dd { margin:0; color:var(--text); text-align:right; }
@media(max-width:900px) {
  .programme-heading { align-items:flex-start; flex-direction:column; gap:20px; }
  .programme-day { grid-template-columns:1fr; gap:20px; }
  .programme-date p { margin-top:10px; }
}
@media(max-width:680px) {
  .programme-preview { padding:48px 24px; }
  .programme-day { padding:20px; }
  .programme-tracks { grid-template-columns:1fr; }
  .programme-date h3 { font-size:23px; }
}
</style>
