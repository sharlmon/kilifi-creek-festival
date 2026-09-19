const decode = (text: string) => text.replace(/&#(x[\da-f]+|\d+);/gi, (_, value) => String.fromCodePoint(value[0].toLowerCase() === 'x' ? parseInt(value.slice(1), 16) : Number(value))).replace(/&(amp|quot|apos|nbsp);/g, (_, value: string) => ({ amp:'&', quot:'"', apos:"'", nbsp:' ' }[value]!))

export function sectionNavigation(html: string, prefix: string, subheadings = false) {
  const items: {id: string, label: string}[] = []
  const updated = html.replace(/<h([123])([^>]*)>([\s\S]*?)<\/h\1>/g, (heading, level, attributes, text) => {
    if (level === '3' && !subheadings) return heading
    const id = attributes.match(/\bid="([^"]+)"/)?.[1] || `${prefix}-${items.length + 1}`
    items.push({ id, label: decode(text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()) })
    return `<h${level}${attributes}${attributes.includes('id="') ? '' : ` id="${id}"`} tabindex="-1">${text}</h${level}>`
  })
  return { html:updated, items }
}

// Use only the headquarters location already supplied in the original website.
export function venueDetails(html: string) {
  const destination = encodeURIComponent('The Terrace Art Space, Mnarani, Bandari Beach, Kilifi, Kenya')
  const maps = `https://www.google.com/maps/search/?api=1&amp;query=${destination}`
  const directions = `https://www.google.com/maps/dir/?api=1&amp;destination=${destination}`
  return html.replace(/<iframe\b[^>]*title="The Terrace Kilifi location"[^>]*><\/iframe>/g, () => `<div class="venue-map" aria-label="The Terrace Art Space location">
    <div class="venue-visual" aria-hidden="true">
      <svg viewBox="0 0 640 320" role="presentation"><defs><linearGradient id="venue-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6CC3F2"/><stop offset="1" stop-color="#FFCB21"/></linearGradient></defs><rect width="640" height="320" fill="url(#venue-sky)"/><circle cx="510" cy="72" r="38" fill="#FD6910" opacity=".92"/><path d="M0 214C94 176 166 243 258 211s166-17 225 8 103 14 157-12v113H0Z" fill="#033932"/><path d="M0 240c92-32 158 22 250-4s170-8 236 12 105 1 154-17" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="6"/><path d="M316 85c-47 0-85 37-85 83 0 64 85 121 85 121s85-57 85-121c0-46-38-83-85-83Zm0 118a36 36 0 1 1 0-72 36 36 0 0 1 0 72Z" fill="#FD6910" stroke="#fff" stroke-width="7"/></svg>
    </div>
    <div class="venue-location-copy"><span>Festival Headquarters</span><strong>The Terrace Art Space</strong><p>Mnarani, Bandari Beach, Kilifi</p></div>
    <div class="venue-actions"><a class="venue-action venue-open" href="${maps}" target="_blank" rel="noopener noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a><a class="venue-action venue-directions" href="${directions}" target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a></div>
  </div>`)
}
