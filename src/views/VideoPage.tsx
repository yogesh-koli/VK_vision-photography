import React from 'react'

export function VideoPage(): React.ReactElement {
  const urls = getArray('videos', [
    'https://player.vimeo.com/video/76979871',
  ])

  return (
    <section className="section">
      <div className="container">
        <h2 className="h1">Cinematic Films</h2>
        <p className="mt-3 text-muted">Paste Vimeo/YouTube embed URLs in Admin.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {urls.map((u, i) => (
            <div key={i} className="aspect-video overflow-hidden rounded-2xl border border-white/10">
              <iframe src={u} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={`Film ${i+1}`} />
            </div>
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

