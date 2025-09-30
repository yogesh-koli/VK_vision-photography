import React from 'react'

export function ContactPage(): React.ReactElement {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setStatus('sending')
    try {
      // Replace with your Formspree endpoint or serverless function
      const formspreeEndpoint = getContent('formspree', '')
      if (!formspreeEndpoint) {
        await new Promise(r => setTimeout(r, 600))
        setStatus('sent')
        return
      }
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setName(''); setEmail(''); setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section">
      <div className="container max-w-3xl">
        <h2 className="h1">Contact</h2>
        <p className="mt-3 text-muted">For bookings and collaborations. Set `formspree` URL in Admin to enable submissions.</p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <div>
            <label className="text-sm text-muted">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-3" />
          </div>
          <div>
            <label className="text-sm text-muted">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-3" />
          </div>
          <div>
            <label className="text-sm text-muted">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} required className="mt-1 min-h-[140px] w-full rounded-xl border border-white/10 bg-black/40 p-3" />
          </div>
          <div className="flex items-center gap-3">
            <button disabled={status==='sending'} className="btn-primary">
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
            {status === 'sent' && <span className="text-green-400">Sent!</span>}
            {status === 'error' && <span className="text-red-400">Error. Try again.</span>}
          </div>
        </form>
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

