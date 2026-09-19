export const siteUrl = 'https://sharlmon.github.io/kilifi-creek-festival'

export const siteName = 'Kilifi Creek Festival'

export const defaultDescription = 'Kilifi Creek Festival (KCF) is an artist-led, community-rooted film, arts and cultural festival set along the Kilifi Creek in coastal Kenya. 23-31 October 2026.'

const pages: Record<string, { title: string, description: string }> = {
  '/': {
    title: 'Kilifi Creek Festival — Film, Art & Music in Kilifi, Kenya',
    description: defaultDescription
  },
  '/about': {
    title: 'About — Kilifi Creek Festival',
    description: "KCF is an artist-led, community-rooted film, arts and cultural festival set along the Kilifi Creek on Kenya's coast."
  },
  '/screenings': {
    title: 'Screenings — Kilifi Creek Festival',
    description: 'KCF 2025 featured 47 screenings, 33 films from 15 countries across 7 unique venues along the Kilifi Creek.'
  },
  '/industry': {
    title: 'Industry — Kilifi Creek Festival',
    description: 'KCF Industry programme features daytime workshops, masterclasses, Q&As and professional exchanges alongside evening outdoor screenings.'
  },
  '/team': {
    title: 'Team — Kilifi Creek Festival',
    description: 'Meet the KCF Team — the creative leaders and organizers behind the Kilifi Creek Festival.'
  },
  '/press': {
    title: 'Press — Kilifi Creek Festival',
    description: 'KCF press coverage from digital media outlets including Sanaa Post, Sinema Focus, The Star, The Coast, and Hapa Kenya.'
  },
  '/contact': {
    title: 'Contact — Kilifi Creek Festival',
    description: 'Get in touch with the Kilifi Creek Festival team. Email comms@kilificreekfestival.com for enquiries and collaboration.'
  }
}

export function seoForRoute(path: string) {
  const normalized = path === '/' ? '/' : path.replace(/\/$/, '')
  return pages[normalized] || { title: siteName, description: defaultDescription }
}

export function canonicalUrl(path: string) {
  const normalized = path === '/' ? '/' : path.replace(/\/$/, '')
  return `${siteUrl}${normalized}`
}
