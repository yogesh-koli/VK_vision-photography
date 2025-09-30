import React from 'react'
import { motion } from 'framer-motion'
import heroVid from '/vite.svg'

export function HomePage(): React.ReactElement {
  const headline = getContent('headline', 'Luxury Photography & Cinematic Films')
  const sub = getContent('subhead', 'Weddings, fashion editorials, destination stories — crafted with world-class aesthetics.')

  return (
    <section className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div>
          <motion.h1 className="display" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {headline}
          </motion.h1>
          <motion.p className="mt-6 text-lg text-muted" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {sub}
          </motion.p>
          <div className="mt-8 flex gap-4">
            <a href="/gallery" className="btn-primary">Explore Gallery</a>
            <a href="/offers" className="btn-ghost">View Offers</a>
          </div>
        </div>
        <motion.div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <img src={heroVid} alt="VK_vision" className="absolute inset-0 h-full w-full object-contain opacity-80" />
          <div className="absolute inset-0 brand-gradient opacity-10" />
        </motion.div>
      </div>

      <div className="container mt-16 grid grid-cols-2 gap-4 md:mt-24 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5"></div>
        ))}
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

