<template>
  <section id="submissions" class="submission-closed" aria-labelledby="submissions-title">
    <div class="submission-inner">
      <div class="submission-copy">
        <p class="submission-year">KCF 2026</p>
        <p class="submission-status">SUBMISSIONS CLOSED</p>
        <h2 id="submissions-title">Film Submissions Are Now Closed</h2>
        <p>Thank you to every filmmaker who submitted work for the 2026 Kilifi Creek Festival. The confirmed programme will be shared in due time.</p>
        <NuxtLink class="button" to="/screenings#programme">VIEW 2026 PROGRAMME <span aria-hidden="true">↗</span></NuxtLink>
      </div>
      <div class="submission-festival">
        <BrandLogo />
        <p>23–31 October 2026<br /><span>KILIFI, KENYA</span></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.submission-closed { padding:72px var(--space); background:var(--feature-bg); color:var(--on-feature); }
.submission-inner { display:flex; align-items:center; justify-content:space-between; gap:64px; max-width:1280px; margin:auto; }
.submission-copy { max-width:760px; }
.submission-year { margin:0 0 14px; color:var(--yellow); font:500 12px/1.6 var(--font-label); letter-spacing:.16em; }
.submission-status { display:inline-flex; margin:0 0 24px; padding:8px 12px; border:1px solid #ffcb2175; border-radius:999px; color:var(--yellow); font:600 11px/1 var(--font-label); letter-spacing:.1em; }
h2 { margin:0 0 18px; color:var(--yellow); font-size:clamp(34px,4vw,56px); }
.submission-copy>p:last-of-type { max-width:650px; margin:0 0 28px; font-size:16px; line-height:1.8; }
.submission-festival { flex-shrink:0; text-align:center; }
.submission-festival :deep(.brand-logo) { width:142px; height:138px; margin:0 auto 18px; }
.submission-festival p { margin:0; font-size:13px; line-height:1.8; }
.submission-festival span { font-size:11px; letter-spacing:.12em; }
@media(max-width:760px) {
  .submission-closed { padding:48px 24px; }
  .submission-inner { align-items:flex-start; flex-direction:column; gap:36px; }
  .submission-festival { display:flex; align-items:center; gap:20px; text-align:left; }
  .submission-festival :deep(.brand-logo) { width:90px; height:88px; margin:0; }
}
</style>
