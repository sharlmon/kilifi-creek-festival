import manifest from '~/assets/responsive-images.json'
import { siteBase } from './siteBase'

const forbiddenHtml = /<\/?(?:script|iframe|object|embed|base|meta|link)\b|\son[a-z]+\s*=|(?:href|src)\s*=\s*["']\s*(?:javascript:|data:text\/html)/i

function assertSafeHtml(html: string) {
  if (forbiddenHtml.test(html)) throw new Error('Unsafe HTML was blocked from rendering.')
}

export function imageViewerAttributes(src: string, baseURL?: string) {
  const image = manifest[src as keyof typeof manifest]
  return { 'data-expand-image': siteBase(image?.variants.at(-1)?.src || src, baseURL), 'data-download-image': siteBase(src, baseURL), 'data-image-original': siteBase(src, baseURL) }
}

export function imageAttributes(src: string, sizes = 'auto, (max-width: 760px) calc(100vw - 48px), 640px', photoAlt?: string, baseURL?: string) {
  const interaction = photoAlt !== undefined && !src.includes('/logo/') && !src.includes('/brand/') ? {
    role: 'button', tabindex: 0, 'aria-label': `View full image: ${photoAlt}`,
    'aria-haspopup': 'dialog', ...imageViewerAttributes(src, baseURL)
  } : {}
  const image = manifest[src as keyof typeof manifest]
  if (!image) return { ...interaction, src: siteBase(src, baseURL), decoding: 'async' as const }
  return {
    ...interaction,
    src: siteBase(image.variants.filter(v => v.width <= 640).at(-1)?.src || image.variants[0].src, baseURL),
    srcset: image.variants.map(v => `${siteBase(v.src, baseURL)} ${v.width}w`).join(', '),
    sizes, width: image.width, height: image.height, decoding: 'async' as const
  }
}

// Only image attributes change; the original content and HTML text stay intact.
export function responsiveHtml(html: string) {
  assertSafeHtml(html)
  return html.replace(/href="(\/(?!\/)[^"]*)"/g, (_, path) => `href="${siteBase(path)}"`).replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&')
    if (!src) return tag
    const sizes = src.includes('/logo/') ? '170px' : undefined
    const alt = tag.match(/\balt="([^"]*)"/)?.[1] || 'Kilifi Creek Festival photograph'
    const attributes = { ...imageAttributes(src, sizes, alt), loading: 'lazy' }
    let updated = tag.replace(/\s(?:src|width|height|decoding|loading|srcset|sizes)="[^"]*"/g, '')
    const encoded = Object.entries(attributes).map(([key, value]) => ` ${key}="${String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`).join('')
    return updated.replace(/\s*\/?>(?=$)/, encoded + '>')
  })
}
