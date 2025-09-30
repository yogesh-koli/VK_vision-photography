import React from 'react'

export function GalleryPage(): React.ReactElement {
  const urls = getArray('gallery', [
    'https://images.unsplash.com/photo-1541151570296-2826d07b3fb4',
    'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
  ])

  return (
    <section className="section">
      <div className="container">
        <h2 className="h1">Signature Gallery</h2>
        <p className="mt-3 text-muted">Update images in the Admin page.</p>
        <div className="mt-8 columns-1 gap-4 md:columns-2 lg:columns-3">
          {urls.map((u, i) => (
            <img key={i} src={`${u}?auto=format&fit=crop&w=1200&q=80`} alt="Gallery" className="mb-4 w-full rounded-xl border border-white/10" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}

function getArray(key: string, fallback: string[]): string[] {
  const data = localStorage.getItem('vk_content')
  if (!data) return fallback
  try {
    const json = JSON.parse(data) as Record<string, unknown>
    const value = json[key]
    return Array.isArray(value) ? (value as string[]) : fallback
  } catch {
    return fallback
  }
}

