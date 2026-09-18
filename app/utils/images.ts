import manifest from '~/assets/responsive-images.json'
import { siteBase } from './siteBase'

export function imageAttributes(src: string, sizes = 'auto, (max-width: 760px) calc(100vw - 48px), 640px') {
  const image = manifest[src as keyof typeof manifest]
  if (!image) return { src: siteBase(src), decoding: 'async' as const }
  return {
    src: siteBase(src),
    srcset: image.variants.map(v => `${siteBase(v.src)} ${v.width}w`).join(', '),
    sizes, width: image.width, height: image.height, decoding: 'async' as const
  }
}

// Only image attributes change; the original content and HTML text stay intact.
export function responsiveHtml(html: string) {
  return html.replace(/href="(\/(?!\/)[^"]*)"/g, (_, path) => `href="${siteBase(path)}"`).replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&')
    if (!src) return tag
    const sizes = src.includes('/logo/') ? '170px' : undefined
    const attributes = { ...imageAttributes(src, sizes), loading: 'lazy' }
    let updated = tag.replace(/\s(?:src|width|height|decoding|loading|srcset|sizes)="[^"]*"/g, '')
    const encoded = Object.entries(attributes).map(([key, value]) => ` ${key}="${String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`).join('')
    return updated.replace(/\s*\/?>(?=$)/, encoded + '>')
  })
}
