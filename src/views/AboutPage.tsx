import React from 'react'

export function AboutPage(): React.ReactElement {
  const bio = getContent('bio', `Based in India, available worldwide. VK_vision blends editorial finesse with cinematic storytelling — from intimate weddings to fashion campaigns.`)
  const services = getArray('services', ['Weddings', 'Fashion', 'Travel', 'Commercial'])

  return (
    <section className="section">
      <div className="container grid items-start gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="h1">About</h2>
          <p className="mt-6 text-lg text-muted">
            {bio}
          </p>
        </div>
        <div>
          <h3 className="h2">Services</h3>
          <ul className="mt-4 grid gap-2 text-muted">
            {services.map((s, i) => (
              <li key={i} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function getContent(key: string, fallback: string): string {
  const data = localStorage.getItem('vk_content')
  if (!data) return fallback
  try {
    const json = JSON.parse(data) as Record<string, string>
    return json[key] ?? fallback
  } catch {
    return fallback
  }
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

