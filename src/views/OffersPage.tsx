import React from 'react'

type Offer = { title: string; desc: string; price: string }

export function OffersPage(): React.ReactElement {
  const offers = getOffers('offers', [
    { title: 'Wedding Editorial', desc: 'Full day coverage, film + photo, 2 shooters, 4K delivery', price: '₹1,20,000' },
    { title: 'Fashion Campaign', desc: 'Creative direction, studio + outdoor, retouching', price: '₹90,000' },
    { title: 'Travel Story', desc: 'On-location shoot, cinematic highlight film', price: '₹70,000' },
  ])

  return (
    <section className="section">
      <div className="container">
        <h2 className="h1">Signature Offers</h2>
        <p className="mt-3 text-muted">Custom packages available worldwide.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {offers.map((o, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">{o.title}</h3>
              <p className="mt-2 text-muted">{o.desc}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-medium">{o.price}</span>
                <a href="#contact" className="btn-primary">Enquire</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function getOffers(key: string, fallback: Offer[]): Offer[] {
  const data = localStorage.getItem('vk_content')
  if (!data) return fallback
  try {
    const json = JSON.parse(data) as Record<string, unknown>
    const value = json[key]
    return Array.isArray(value) ? (value as Offer[]) : fallback
  } catch {
    return fallback
  }
}

