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
      <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid slice" role="presentation">
        <rect width="640" height="320" fill="#F5F1E8"/>
        <path d="M0 0h164c18 35 12 72 36 105 27 37 28 77 2 111-27 35-34 70-25 104H0Z" fill="var(--brand-blue)"/>
        <path d="M164 0c18 35 12 72 36 105 27 37 28 77 2 111-27 35-34 70-25 104" fill="none" stroke="var(--brand-teal)" stroke-width="8"/>
        <g fill="none" stroke-linecap="round">
          <path d="M208 37c71 42 100 55 173 48 86-8 141 23 259 1" stroke="#fff" stroke-width="18"/>
          <path d="M208 37c71 42 100 55 173 48 86-8 141 23 259 1" stroke="var(--brand-yellow)" stroke-width="10"/>
          <path d="M206 266c65-35 113-51 174-50 93 2 152-28 260-92" stroke="#fff" stroke-width="14"/>
          <path d="M206 266c65-35 113-51 174-50 93 2 152-28 260-92" stroke="var(--brand-orange)" stroke-width="6"/>
          <path d="M284 0c-8 55 4 105 45 145 31 31 39 77 30 125" stroke="#D8D2C5" stroke-width="6"/>
          <path d="M539 0c-19 45-23 90-2 129 19 34 14 86-11 129" stroke="#D8D2C5" stroke-width="6"/>
          <path d="M234 153h90m145 31h117" stroke="#D8D2C5" stroke-width="5"/>
        </g>
        <g font-family="'Lemon Milk',Arial,sans-serif">
          <text x="34" y="275" fill="var(--brand-teal)" font-size="15" font-weight="700" letter-spacing="2">KILIFI CREEK</text>
          <text x="468" y="42" fill="var(--brand-teal)" font-size="13" font-weight="700" letter-spacing="2">MNARANI</text>
          <path d="M431 76c-28 0-50 22-50 50 0 38 50 82 50 82s50-44 50-82c0-28-22-50-50-50Zm0 72a22 22 0 1 1 0-44 22 22 0 0 1 0 44Z" fill="#EA4335" stroke="#fff" stroke-width="6"/>
          <path d="M431 208v17" stroke="var(--brand-teal)" stroke-width="3" stroke-linecap="round"/>
          <rect x="315" y="225" width="232" height="60" rx="13" fill="var(--brand-teal)"/>
          <text x="431" y="248" fill="var(--brand-yellow)" font-size="10" font-weight="700" text-anchor="middle" letter-spacing="1.4">FESTIVAL HEADQUARTERS</text>
          <text x="431" y="270" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">THE TERRACE ART SPACE</text>
        </g>
      </svg>
    </div>
    <div class="venue-location-copy"><span>Festival Headquarters</span><strong>The Terrace Art Space</strong><p>Mnarani, Bandari Beach, Kilifi</p></div>
    <div class="venue-actions"><a class="venue-action venue-open" href="${maps}" target="_blank" rel="noopener noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a><a class="venue-action venue-directions" href="${directions}" target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a></div>
  </div>`)
}
