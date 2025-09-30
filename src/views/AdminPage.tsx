import React from 'react'

type Content = Record<string, unknown>

export function AdminPage(): React.ReactElement {
  const [authed, setAuthed] = React.useState<boolean>(() => localStorage.getItem('vk_admin_session') === '1')
  const [passwordInput, setPasswordInput] = React.useState<string>('')
  const [authError, setAuthError] = React.useState<string>('')

  const [json, setJson] = React.useState<string>(() => localStorage.getItem('vk_content') ?? defaultJson)
  const [error, setError] = React.useState<string>('')
  const [saved, setSaved] = React.useState<boolean>(false)
  const [newPwd, setNewPwd] = React.useState<string>('')
  const [pwdSaved, setPwdSaved] = React.useState<boolean>(false)

  function getAdminPassword(): string {
    const local = localStorage.getItem('vk_admin_password')
    if (local && local.length > 0) return local
    const envVal = (import.meta as any).env?.VITE_ADMIN_PASSWORD as string | undefined
    return envVal && envVal.length > 0 ? envVal : 'vkvision'
  }

  function tryLogin(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    if (passwordInput === getAdminPassword()) {
      localStorage.setItem('vk_admin_session', '1')
      setAuthed(true)
      setAuthError('')
      setPasswordInput('')
    } else {
      setAuthError('Incorrect password')
    }
  }

  function logout(): void {
    localStorage.removeItem('vk_admin_session')
    setAuthed(false)
  }

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

  function savePassword(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    if (!newPwd) return
    localStorage.setItem('vk_admin_password', newPwd)
    setPwdSaved(true)
    setTimeout(() => setPwdSaved(false), 1500)
    setNewPwd('')
  }

  if (!authed) {
    return (
      <section className="section">
        <div className="container max-w-md">
          <h2 className="h1">Admin Login</h2>
          <p className="mt-2 text-muted">Enter password to continue.</p>
          <form onSubmit={tryLogin} className="mt-6 grid gap-3">
            <input type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-white/10 bg-black/40 p-3" />
            <div className="flex items-center gap-3">
              <button className="btn-primary">Login</button>
              {authError && <span className="text-red-400">{authError}</span>}
            </div>
            <p className="text-xs text-muted">Default password is "vkvision". You can change it after login.</p>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="h1">Admin Editor</h2>
            <p className="mt-2 text-muted">Edit site content JSON. Keys used across pages: headline, subhead, bio, services, gallery, videos, offers.</p>
          </div>
          <button onClick={logout} className="btn-ghost">Logout</button>
        </div>
        <div className="mt-6 grid gap-4">
          <textarea value={json} onChange={e => setJson(e.target.value)} className="min-h-[300px] w-full rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm" />
          <div className="flex items-center gap-3">
            <button onClick={save} className="btn-primary">Save</button>
            {saved && <span className="text-green-400">Saved</span>}
            {error && <span className="text-red-400">{error}</span>}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Password</h3>
          <p className="mt-1 text-sm text-muted">Set a new password (stored locally in your browser). For deployments, set VITE_ADMIN_PASSWORD as an env var.</p>
          <form onSubmit={savePassword} className="mt-4 flex flex-wrap items-center gap-3">
            <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="New password" className="w-full max-w-xs rounded-xl border border-white/10 bg-black/40 p-3" />
            <button className="btn-ghost">Update</button>
            {pwdSaved && <span className="text-green-400">Updated</span>}
          </form>
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

