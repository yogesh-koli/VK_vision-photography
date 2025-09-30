import React from 'react'

type Content = Record<string, unknown>

export function AdminPage(): React.ReactElement {
  const [json, setJson] = React.useState<string>(() => localStorage.getItem('vk_content') ?? defaultJson)
  const [error, setError] = React.useState<string>('')
  const [saved, setSaved] = React.useState<boolean>(false)

  function save(): void {
    try {
      const parsed = JSON.parse(json) as Content
      localStorage.setItem('vk_content', JSON.stringify(parsed))
      setError('')
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    } catch (e) {
      setError('Invalid JSON. Please fix and try again.')
      setSaved(false)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="h1">Admin Editor</h2>
        <p className="mt-2 text-muted">Edit site content JSON. Keys used across pages: headline, subhead, bio, services, gallery, videos, offers.</p>
        <div className="mt-6 grid gap-4">
          <textarea value={json} onChange={e => setJson(e.target.value)} className="min-h-[300px] w-full rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm" />
          <div className="flex items-center gap-3">
            <button onClick={save} className="btn-primary">Save</button>
            {saved && <span className="text-green-400">Saved</span>}
            {error && <span className="text-red-400">{error}</span>}
          </div>
        </div>
        <details className="mt-6">
          <summary className="cursor-pointer text-muted">Sample schema</summary>
          <pre className="mt-2 overflow-auto rounded-lg border border-white/10 bg-black/40 p-4 text-xs">
{defaultJson}
          </pre>
        </details>
      </div>
    </section>
  )
}

const defaultJson = `{
  "headline": "Luxury Photography & Cinematic Films",
  "subhead": "Weddings, fashion editorials, destination stories — crafted with world-class aesthetics.",
  "bio": "Based in India, available worldwide. VK_vision blends editorial finesse with cinematic storytelling.",
  "services": ["Weddings", "Fashion", "Travel", "Commercial"],
  "gallery": [
    "https://images.unsplash.com/photo-1541151570296-2826d07b3fb4",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
  ],
  "videos": [
    "https://www.youtube.com/embed/dQw4w9WgXcQ"
  ],
  "offers": [
    { "title": "Wedding Editorial", "desc": "Full day coverage, film + photo, 2 shooters, 4K delivery", "price": "₹1,20,000" }
  ]
}`

