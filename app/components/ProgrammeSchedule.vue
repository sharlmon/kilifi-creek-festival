<script setup lang="ts">
interface Item { t?: string, title: string, by?: string, star?: boolean, note?: string }
interface Venue { name: string, hours?: string, tag?: string, items: Item[] }
interface Day { weekday: string, date: string, venues: Venue[] }

const silent = 'Silent cinema with headsets · 11:00 – 19:00'
const experimental = (t = '11:00'): Item[] => [
  { t, title: 'Experimental Films Block', note: silent },
  { title: 'Audio Theatre' }
]

const days: Day[] = [
  { weekday: 'FRIDAY', date: '23 OCTOBER 2026', venues: [
    { name: 'Kivukoni School', hours: '13:00 – 16:00', items: [
      { t: '13:00', title: 'Film & Photography Masterclass for Kids' },
      { t: '16:00', title: 'Kids Shorts Block', by: 'Tunga Media' }
    ] },
    { name: 'Pwani University', hours: '14:00 – 17:00', items: [
      { t: '14:00', title: 'Special Shuga Mashariki on Tour', note: 'Watch Shuga Mashariki and meet the cast. Screening of Shuga Mashariki, interactive activities and real conversations.' },
      { t: '17:00', title: 'Docubox Screenings' },
      { title: 'Know Thy Body, Know Thyself', by: 'Antony “Ty” Ngachira · Kenya' },
      { title: 'Bella Is Dying Maybe Next Week', by: 'Abigail Arunga, Mkaiwawi Mwakaba · Kenya' },
      { title: 'Unasemaje', by: 'Kelvin Kagambo · Tanzania' },
      { title: 'Chess Not Checkers', by: 'Jennifer Gatero · Kenya' },
      { title: 'Follow the Leader Series' }
    ] },
    { name: 'The Terrace', hours: '19:00 – 23:00', items: [
      { t: '19:00', title: 'Tides', by: 'Reuben Odanga · Kenya' },
      { t: '23:00', title: 'Shuga Global After Party' }
    ] }
  ] },
  { weekday: 'SATURDAY', date: '24 OCTOBER 2026', venues: [
    { name: 'The Terrace', hours: '16:00 – 18:00', items: [
      { t: '16:00', title: 'Jai', by: 'Francesco Baldini & Silvia Zennaro · Italy' },
      { title: 'Werga – Son, Rythme, Vie', by: 'Jeannine Dissirama Bessoga · Togo', star: true },
      { t: '18:00', title: 'Garden of Silences', by: 'Henrique Dantas · Brazil', star: true }
    ] },
    { name: 'Distant Relatives', hours: '19:00 – 20:30', items: [
      { t: '19:00', title: 'When the Tiger Roars', by: 'Lam Can-zhao · China, Malaysia, Switzerland', star: true },
      { title: 'Victoria', by: 'Sam Soko · Kenya' },
      { t: '20:30', title: 'Matebeleland', by: 'Nyasha Kadandara · Zimbabwe', star: true }
    ] },
    { name: 'Tribe Bandas', hours: '19:00 – 22:30', items: [
      { t: '19:00', title: 'Where Lions Once Were', by: 'Bonie Mbogo & Emily Baker · Kenya' },
      { title: 'Mombasa Raha', by: 'Gabriella Hinzano · Kenya', star: true },
      { title: 'Unasemaje', by: 'Kelvin Kagambo · Tanzania' },
      { t: '20:00', title: 'Vuta N’Kuvute', by: 'Amil Shivji · Tanzania' },
      { t: '22:30', title: 'After Party' }
    ] }
  ] },
  { weekday: 'SUNDAY', date: '25 OCTOBER 2026', venues: [
    { name: 'Mazingira Park', hours: '19:00 – 20:30', items: [
      { t: '19:00', title: 'Chess Not Checkers', by: 'Jennifer Gatero · Kenya' },
      { title: 'What Next', by: 'Nyakundi Isaboke · Kenya' },
      { title: 'Dead Presidents', by: 'Mudzithe Phiri · Zambia' },
      { t: '20:30', title: 'The People Shall', by: 'Mark Maina Maingi & Nick Wambugu Gichuki · Kenya', star: true }
    ] },
    { name: 'Nzombere Village', hours: '19:00 – 20:30', items: [
      { t: '19:00', title: 'Jonathan', by: 'Lieven Corthouts · Belgium, Kenya', star: true },
      { title: 'Boti Tatu', by: 'Vincenzo Cavallo · Kenya' },
      { t: '20:30', title: 'Mvera', by: 'Daudi Anguka · Kenya' }
    ] },
    { name: 'Salty’s on the Creek', hours: '19:00 – 20:00', items: [
      { t: '19:00', title: 'After the Abyss', by: 'Keiria Shishay · Denmark, Kenya', star: true },
      { title: 'The Incredible Sensational Fiancée of Sèyí Àjàyí', by: 'Abbesi Akhamie · Nigeria, USA' },
      { t: '20:00', title: 'Variations on a Theme', by: 'Devon Delmar & Jason Jacobs · South Africa', star: true }
    ] },
    { name: 'Terrace Arts Space', hours: '20:30 – 23:00', items: [
      { t: '20:30', title: 'Sanara Student Films Showcase' },
      { t: '23:00', title: 'After Party' }
    ] }
  ] },
  { weekday: 'MONDAY', date: '26 OCTOBER 2026', venues: [
    { name: 'The Terrace', hours: '11:00 – 20:00', items: [
      { t: '11:00', title: 'Experimental Films Block', note: silent },
      { title: 'An Afternoon with a Gnawa', by: 'Meena Nanji · US', star: true },
      { title: 'Biriani', by: 'Mervin Yongene · Kenya', star: true },
      { title: 'Concrete Moves', by: 'Fagamou Fama Ndiaye · Senegal', star: true },
      { title: 'Stream of Consciousness in Bamboo Lodge', by: 'Wang Pin · China', star: true },
      { title: 'Where My Memory Began', by: 'Priscillia Kounkou Hoveyda · Sierra Leone', star: true },
      { title: 'My Jebba Story', by: 'Kagho Idhebor · Nigeria' },
      { title: 'Audio Theatre', note: 'Co-curated by Ogutu Mũraya and Maria Rößler. Storytelling by Sitawa Namwalie, Wanjikũ Mwawuganga, and Ogutu Mũraya, with archival audio of Wangarĩ Muta Maathai.' },
      { t: '19:00', title: 'Act of Love', by: 'Eric Mwangi · Kenya' },
      { title: 'Niña Chilapa (Chilapa Girl)', by: 'Juana Lotero López · Colombia', star: true },
      { title: 'The Crazy Ex', by: 'Brenda Wangari · Kenya' },
      { t: '20:00', title: 'Taste of Mango', by: 'Chloe Abrahams · United Kingdom' }
    ] },
    { name: 'White Star', hours: '15:00', items: [
      { t: '15:00', title: 'VR Village Opening', by: 'Presented by Pasquale Pes' }
    ] },
    { name: 'Kilifi Club', hours: '19:00 – 23:00', items: [
      { t: '19:00', title: 'Wa Kimani', by: 'Karanja Ngendo · Kenya', star: true },
      { title: '10 Toes Down', by: 'Ian Kituku · Kenya' },
      { title: '1992', by: 'Gilbert Lukalia · Kenya' },
      { t: '20:00', title: 'Kikuyu Land', by: 'Bea Wang’ondu & Andrew H. Brown · Kenya, USA', star: true },
      { t: '23:00', title: 'After Party' }
    ] },
    { name: 'Mekatilili Dhow', hours: '19:30', tag: 'Ticketed', items: [
      { t: '19:30', title: 'Shorts Block' },
      { title: 'Divine Secret', by: 'Siba Younes · Jordan' },
      { title: 'Grahan (The Eclipse)', by: 'Shariq Ali Khan · India' },
      { title: 'The Hollow', by: 'Muhammad Monis Khan & Muhammad Hamza Khan · Pakistan' },
      { title: 'La Reproduction', by: 'Jean-Marie Villeneuve · France' },
      { title: 'The Chant of the Waterway', by: 'Célia Marie Flavie Berby Maillot · France, Réunion' },
      { title: 'Humanity', by: 'Will Sidaros · United States, Kenya, Brazil, China, Netherlands, Australia, Antarctica' },
      { title: 'At Sea Without Support', by: 'Ivere Hounkpatin · Senegal' },
      { title: 'By the Book', by: 'Margaret Gathenya · Kenya' }
    ] }
  ] },
  { weekday: 'TUESDAY', date: '27 OCTOBER 2026', venues: [
    { name: 'Terrace Arts Space', hours: '11:00 – 19:00', items: experimental() },
    { name: 'White Star', hours: '14:00', items: [{ t: '14:00', title: 'VR Village' }] },
    { name: 'Mekatilili Dhow', hours: '19:00', tag: 'Ticketed', items: [
      { t: '19:00', title: 'Shorts Block' },
      { title: 'Tithes & Offerings', by: 'Tony Koros · Kenya' },
      { title: 'Final Act', by: 'Babi Astolfi & Lisa Soares · Brazil', star: true },
      { title: 'Birth of a Light', by: 'Jasmijn Schrofer · Netherlands', star: true },
      { title: 'Story za Njaba', by: 'David Wanjora · Kenya' },
      { title: 'Wakamba Forever', by: 'Warle Maina · Kenya' },
      { title: 'Grogan’s Lodge', by: 'Isaya Evans · Kenya' }
    ] },
    { name: 'Blue House', hours: '19:00 – 23:00', items: [
      { t: '19:00', title: 'Paradise Garden', by: 'Sonia Terrab · France', star: true },
      { title: 'Bella Is Dying Maybe Next Week', by: 'Abigail Arunga & Mkaiwiwi Mwakaba · Kenya' },
      { t: '20:30', title: 'The Woman Who Poked the Leopard', by: 'Patience Nitumwesiga · Uganda', star: true },
      { t: '23:00', title: 'After Party' }
    ] }
  ] },
  { weekday: 'WEDNESDAY', date: '28 OCTOBER 2026', venues: [
    { name: 'Terrace Arts Space', hours: '11:00 – 23:00', items: [
      ...experimental(),
      { t: '19:00', title: 'In Half', by: 'Jorge Morais Valle · Spain', star: true },
      { title: 'Dear Sikhonkwane', by: 'Sihle Hlophe · South Africa' },
      { title: 'Being You', by: 'Minenhle Luthuli · South Africa', star: true },
      { t: '20:30', title: 'How to Build a Library', by: 'Maia Lekow & Christopher King · Kenya' },
      { t: '23:00', title: 'After Party' }
    ] },
    { name: 'White Star', hours: '14:00', items: [{ t: '14:00', title: 'VR Village' }] },
    { name: 'Mekatilili Dhow', hours: '19:00', tag: 'Invite only', items: [
      { t: '19:00', title: 'Shorts Block' },
      { title: 'Tithes & Offerings', by: 'Tony Koros · Kenya' },
      { title: 'The Swap', by: 'Sally Wanja Ngoiri · Kenya' },
      { title: 'Big Sad Nairobi', by: 'Ink Space Studios · Kenya' },
      { title: 'Wa Kimani', by: 'Karanja Ngendo · Kenya', star: true },
      { title: 'Stories za Njamba', by: 'David Wanjora · Kenya' },
      { title: 'Urefu wa Kamba', by: 'Mageto Ndege · Kenya' }
    ] }
  ] },
  { weekday: 'THURSDAY', date: '29 OCTOBER 2026', venues: [
    { name: 'Terrace Arts Space', hours: '11:00 – 23:00', items: [
      { t: '11:00', title: 'Experimental Films Block', note: 'Silent cinema with headsets' },
      { title: 'Audio Theatre' },
      { t: '19:00', title: 'Sanara Fashion Showcase' },
      { t: '20:30', title: 'Afterlife of Waste', by: 'Antony Mwangi Njoroge · Kenya' },
      { t: '23:00', title: 'After Party' }
    ] },
    { name: 'White Star', hours: '11:00', items: [{ t: '11:00', title: 'VR Village' }] },
    { name: 'Boat Yard', hours: '19:00 – 20:30', items: [
      { t: '19:00', title: 'The Caretakers', by: 'Mital Patel · USA' },
      { title: 'Victoria', by: 'Sam Soko · Kenya' },
      { title: 'Owadwa', by: 'Shandra Apondi · Kenya' },
      { title: 'Lift Me Up', by: 'Tomisin Adepeju · United Kingdom' },
      { t: '20:30', title: 'Memory of Princess Mumbi', by: 'Damien Hauser · Kenya', star: true }
    ] }
  ] },
  { weekday: 'FRIDAY', date: '30 OCTOBER 2026', venues: [
    { name: 'Terrace Arts Space', hours: '11:00 – 20:30', items: [
      ...experimental(),
      { t: '19:00', title: 'What If the Sky Sees Us', by: 'Christine Abou Zein · Lebanon, Romania', star: true },
      { title: 'Whisper of the Well', by: 'Elif Dokur · Türkiye', star: true },
      { t: '20:30', title: 'My Semba', by: 'Hugo Salvaterra · Angola', star: true }
    ] },
    { name: 'Tides & Tables', hours: '19:00 – 23:00', items: [
      { t: '19:00', title: 'Ziwa', by: 'Samuel Tebandeke · Kenya' },
      { title: 'Asante Nyuki', by: 'Jason Runo; Pauline Kyalo · Kenya' },
      { t: '20:30', title: 'Truck Mama', by: 'Zippy Nyaruri · Kenya', star: true },
      { t: '23:00', title: 'After Party by Baobab Studios' }
    ] },
    { name: 'White Star', hours: '11:30', items: [{ t: '11:30', title: 'VR Village' }] },
    { name: 'Old Ferry', hours: '19:00 – 19:30', items: [
      { t: '19:00', title: 'Tsotzi', by: 'Suleiman Ngumbao' },
      { title: 'Mombasa Raha', by: 'Gabriella Hinzano' },
      { title: 'Beyond the Uniform', by: 'Bill Jones' },
      { t: '19:30', title: 'Boti Tatu', by: 'Vincenzo Cavallo · Kenya' }
    ] }
  ] },
  { weekday: 'SATURDAY', date: '31 OCTOBER 2026', venues: [
    { name: 'Mandharini', hours: '17:30 – 23:00', tag: 'Invite only', items: [
      { t: '19:00', title: 'Goat', by: 'Judy Kibinge · Kenya', star: true },
      { t: '19:30', title: 'One Woman One Bra', by: 'Vincho Nchogu · Kenya, Nigeria', star: true },
      { t: '21:00', title: 'Awards Ceremony' },
      { t: '00:00', title: 'After Party' }
    ] },
    { name: 'Terrace Arts Space', hours: '19:00 – 23:00', items: [
      { t: '19:00', title: 'Nlumbu (Deep Scars)', by: 'Fetafeta Chamani Prince · DR Congo', star: true },
      { title: 'Humanity', by: 'Will Sidaros · USA, Kenya, Australia, China, Brazil, Netherlands' },
      { t: '20:30', title: 'One Woman One Bra', by: 'Vincho Nchogu · Kenya, Nigeria', star: true },
      { t: '23:00', title: 'After Party' }
    ] },
    { name: 'White Star', hours: '10:30', items: [{ t: '10:30', title: 'VR Village' }] },
    { name: 'Bhukungu', hours: '19:00', tag: 'Karisa Maitha Grounds', items: [
      { t: '19:00', title: 'Uturi', by: 'Emmanuel Omondi · Alliance Française, Kenya' },
      { title: 'Hijab Dancer', by: 'Antony Oduor · Alliance Française, Kenya' },
      { title: 'Bigwa', by: 'Rashid Hunt · Alliance Française, Kenya' },
      { t: '20:00', title: 'Vuta N’Kuvute', by: 'Amil Shivji · Tanzania' }
    ] }
  ] }
]

const venueSummary = (day: Day) => day.venues.map(v => v.name).join(' · ')
</script>

<template>
  <section id="programme" class="programme-preview" aria-labelledby="programme-title">
    <div class="programme-inner">
      <header class="programme-heading">
        <div>
          <p class="programme-kicker">23–31 OCTOBER 2026</p>
          <h2 id="programme-title">FESTIVAL SCREENING PROGRAMME</h2>
          <p class="programme-intro">Water is memory, movement and magic. Select a day to view its screenings by venue.</p>
        </div>
        <p class="programme-status"><span aria-hidden="true"></span> ★ IN COMPETITION</p>
      </header>

      <div class="programme-days">
        <details v-for="(day, index) in days" :key="day.date" class="programme-day">
          <summary>
            <span class="day-number">DAY {{ index + 1 }}</span>
            <span class="day-date"><strong>{{ day.weekday }}</strong><span>{{ day.date }}</span></span>
            <span class="day-venues"><strong>VENUES</strong><span>{{ venueSummary(day) }}</span></span>
            <span class="day-action"><span>VIEW DAY</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></span>
          </summary>
          <div class="programme-detail">
            <section v-for="venue in day.venues" :key="venue.name" class="programme-track">
              <p class="track-type">{{ venue.name }}<span v-if="venue.tag" class="venue-tag">{{ venue.tag }}</span></p>
              <p v-if="venue.hours" class="venue-hours">{{ venue.hours }}</p>
              <ul class="screening-list">
                <li v-for="(item, i) in venue.items" :key="i" :class="{ 'has-time': item.t }">
                  <span class="item-time">{{ item.t }}</span>
                  <span class="item-body">
                    <strong><span v-if="item.star" class="star" title="In competition">★</span>{{ item.title }}</strong>
                    <span v-if="item.by" class="item-by">{{ item.by }}</span>
                    <span v-if="item.note" class="item-note">{{ item.note }}</span>
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </details>
      </div>

      <aside class="donate" aria-labelledby="donate-title">
        <div>
          <p class="programme-kicker">SUPPORT THE FESTIVAL</p>
          <h3 id="donate-title">KCF DONATION PAYMENT DETAILS</h3>
        </div>
        <dl>
          <div><dt>Paybill</dt><dd>542542</dd></div>
          <div><dt>Account</dt><dd>958885 <span>(Kilifi Creek Arts Festival)</span></dd></div>
        </dl>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.programme-preview { padding:72px var(--space); background:var(--soft-bg); }
.programme-inner { max-width:1180px; margin:auto; }
.programme-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:48px; margin-bottom:36px; }
.programme-heading>div { max-width:820px; }
.programme-kicker { margin:0 0 12px; color:var(--accent-text); font:600 11px/1.6 var(--font-label); letter-spacing:.12em; }
h2 { margin:0 0 16px; color:var(--heading); font-size:clamp(38px,5vw,64px); }
.programme-intro { max-width:780px; margin:0; font-size:16px; line-height:1.8; }
.programme-status { display:flex; align-items:center; gap:10px; flex-shrink:0; margin:0 0 8px; color:var(--muted); font:600 11px/1.4 var(--font-label); letter-spacing:.08em; }
.programme-status>span { width:9px; height:9px; border-radius:50%; background:var(--brand-yellow); box-shadow:0 0 0 5px #ffcb2126; }
.programme-days { overflow:hidden; border:1px solid var(--glass-border); border-radius:18px; background:var(--panel); box-shadow:var(--glass-shadow); }
.programme-day { border-bottom:1px solid var(--line); }
.programme-day:last-child { border-bottom:0; }
.programme-day summary { display:grid; grid-template-columns:90px minmax(220px,.8fr) minmax(300px,1.45fr) 110px; align-items:center; gap:24px; min-height:96px; padding:20px 28px; cursor:pointer; list-style:none; color:var(--text); transition:background .2s; }
.programme-day summary::-webkit-details-marker { display:none; }
.programme-day summary:hover { background:color-mix(in srgb,var(--brand-header-green) 12%,transparent); }
.programme-day summary:focus-visible { outline:3px solid var(--focus); outline-offset:-4px; }
.day-number,.day-date,.day-venues { min-width:0; }
.day-number { color:var(--muted); font:600 11px/1.5 var(--font-label); letter-spacing:.1em; }
.day-date,.day-venues { display:flex; flex-direction:column; gap:5px; }
.day-date strong,.day-venues strong { color:var(--accent-text); font:600 11px/1.4 var(--font-label); letter-spacing:.08em; }
.day-date>span { color:var(--heading); font:400 24px/1.15 var(--font-display); letter-spacing:.015em; }
.day-venues>span { overflow:hidden; color:var(--text); font:500 12px/1.5 var(--font-interface); text-overflow:ellipsis; white-space:nowrap; }
.day-action { display:flex; align-items:center; justify-content:flex-end; gap:10px; color:var(--muted); font:600 10px/1.4 var(--font-label); letter-spacing:.06em; }
.day-action svg { width:18px; height:18px; transition:transform .2s; }
.programme-day[open] summary { background:color-mix(in srgb,var(--brand-header-green) 16%,transparent); }
.programme-day[open] .day-action svg { transform:rotate(180deg); }
.programme-detail { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; padding:0 28px 28px 142px; }
.programme-track { padding:22px; border:1px solid var(--line); border-radius:14px; background:color-mix(in srgb,var(--panel) 88%,var(--soft-bg)); }
.track-type { margin:0 0 14px; color:var(--accent-text); font:600 11px/1.4 var(--font-label); letter-spacing:.08em; text-transform:uppercase; }
.programme-track h3 { margin:0 0 10px; color:var(--heading); font-size:22px; }
.programme-track>p:not(.track-type) { margin:0 0 18px; font-size:13px; line-height:1.65; }
.programme-track dl { display:grid; gap:8px; margin:0; padding-top:15px; border-top:1px solid var(--line); }
.programme-track dl div { display:flex; justify-content:space-between; gap:18px; font:500 11px/1.5 var(--font-label); }
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
.programme-day[open] .programme-detail { max-height:none; }
.venue-tag { margin-left:10px; padding:2px 8px; border-radius:999px; background:var(--brand-yellow); color:#0b2e27; font-size:10px; letter-spacing:.06em; }
.venue-hours { margin:0 0 14px; color:var(--muted); font:600 11px/1.4 var(--font-label); letter-spacing:.06em; }
.screening-list { display:grid; gap:10px; margin:0; padding:15px 0 0; border-top:1px solid var(--line); list-style:none; }
.screening-list li { display:grid; grid-template-columns:48px 1fr; gap:10px; font-size:13px; line-height:1.5; }
.screening-list li.has-time:not(:first-child) { margin-top:6px; }
.item-time { color:var(--accent-text); font:600 11px/1.7 var(--font-label); }
.item-body { display:flex; flex-direction:column; min-width:0; }
.item-body strong { color:var(--heading); font-weight:700; }
.star { margin-right:4px; color:var(--brand-yellow); }
.item-by,.item-note { color:var(--muted); font-size:12px; }
.donate { display:flex; align-items:center; justify-content:space-between; gap:32px; margin-top:28px; padding:26px 28px; border:1px solid var(--glass-border); border-radius:18px; background:var(--panel); box-shadow:var(--glass-shadow); }
.donate h3 { margin:0; color:var(--heading); font-size:26px; }
.donate dl { display:grid; gap:10px; margin:0; min-width:280px; }
.donate dl div { display:flex; justify-content:space-between; gap:20px; font:500 12px/1.5 var(--font-label); }
.donate dt { color:var(--muted); }
.donate dd { margin:0; color:var(--text); text-align:right; font-weight:700; font-size:16px; }
.donate dd span { display:block; color:var(--muted); font-size:11px; font-weight:500; }
@media(max-width:680px) { .donate { flex-direction:column; align-items:flex-start; padding:22px 20px; gap:18px; } .donate dl { min-width:0; width:100%; } }
</style>
