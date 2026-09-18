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
  return html.replace(/<iframe\b[^>]*title="The Terrace Kilifi location"[^>]*><\/iframe>/g, iframe => `<div class="venue-map">${iframe}<a class="venue-directions" href="https://www.google.com/maps/dir/?api=1&amp;destination=${destination}" target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a></div>`)
}
