<script setup lang="ts">
import { responsiveHtml } from '~/utils/images'
import content from '~/assets/content.json'
import heroes from '~/assets/hero-map.json'
import teamAdditions from '~/assets/team-additions.json'
import { sectionNavigation, venueDetails } from '~/utils/sections'
definePageMeta({ validate: route => ['about','screenings','industry','team','press','contact'].includes(String(route.params.slug)) })
const route=useRoute()
const slug=computed(()=>String(route.params.slug))
const titles: Record<string,string>={about:'About',screenings:'Screenings',industry:'Industry',team:'Team',press:'Press',contact:'Contact'}
const page=computed(()=>content[slug.value as keyof typeof content] as {html:string,title:string,description:string}|undefined)
const presentation = computed(() => sectionNavigation(venueDetails(page.value?.html || ''), `section-${slug.value}`, ['team','industry'].includes(slug.value)))
const shortcuts = computed(() => {
  if (slug.value === 'screenings') return [presentation.value.items[0]!, { id:'programme', label:'PROGRAM' }, ...presentation.value.items.slice(1)]
  if (slug.value === 'team') return [...presentation.value.items, ...teamAdditions.map(profile => ({ id:`team-${profile.id}`, label:profile.name }))]
  return presentation.value.items
})
if(!page.value?.html) throw createError({statusCode:404,statusMessage:'Page not found'})
// Replace only the poster presentation; retain the original recap, statistics and gallery.
const screeningParts = computed(() => {
  const html = presentation.value.html.replace(/<div class="bounded">\s*<img[^>]*alt="KCF 2025 Programming"[^>]*>\s*<\/div>/, '')
  const boundary = html.indexOf('</section>') + '</section>'.length
  return [html.slice(0, boundary), html.slice(boundary)]
})
function submit(e: Event) {
  const form=e.target as HTMLFormElement
  if(form.id!=='contact-form') return
  e.preventDefault()
  if(!form.reportValidity()) return
  const name=(form.querySelector('#name') as HTMLInputElement).value
  const email=(form.querySelector('#email') as HTMLInputElement).value
  const message=(form.querySelector('#message') as HTMLTextAreaElement).value
  window.location.href=`mailto:comms@kilificreekfestival.com?subject=${encodeURIComponent('Kilifi Creek Festival enquiry — '+name)}&body=${encodeURIComponent(`${message}\n\n${name}\n${email}`)}`
}
</script>
<template>
  <PageHero :title="titles[slug]" :image="heroes[slug as keyof typeof heroes]" />
  <SectionShortcuts :items="shortcuts" />
  <template v-if="slug === 'screenings'">
    <div class="original-content interior-content page-screenings" v-html="responsiveHtml(screeningParts[0])"></div>
    <ProgrammeSchedule />
    <div class="original-content interior-content page-screenings" v-html="responsiveHtml(screeningParts[1])"></div>
  </template>
  <div v-else-if="page" class="original-content interior-content" :class="'page-'+slug" @submit="submit">
    <div v-html="responsiveHtml(presentation.html)"></div>
    <TeamProfileAdditions v-if="slug === 'team'" />
    <PressResources v-if="slug === 'press'" />
  </div>
</template>
