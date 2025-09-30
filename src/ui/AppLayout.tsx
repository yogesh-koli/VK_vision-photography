import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Camera, Menu, Moon, Sun } from 'lucide-react'

export function AppLayout(): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const [dark, setDark] = React.useState(true)

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="brand-gradient inline-flex h-9 w-9 items-center justify-center rounded-full">
              <Camera className="h-5 w-5 text-black" />
            </span>
            <span className="text-lg font-semibold tracking-wide">VK_vision</span>
          </NavLink>
          <nav className="hidden gap-8 md:flex">
            <NavLink to="/gallery" className={linkCls}>Gallery</NavLink>
            <NavLink to="/videos" className={linkCls}>Videos</NavLink>
            <NavLink to="/offers" className={linkCls}>Offers</NavLink>
            <NavLink to="/about" className={linkCls}>About</NavLink>
            <NavLink to="/contact" className={linkCls}>Contact</NavLink>
            <NavLink to="/admin" className="btn-ghost">Edit</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button className="btn-ghost" onClick={() => setDark(v => !v)} aria-label="Toggle theme">
              {dark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
            </button>
            <button className="md:hidden btn-ghost" onClick={() => setOpen(o => !o)} aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-white/10 bg-black/60 md:hidden">
            <div className="container grid gap-2 py-4">
              <MobileLink to="/gallery" onClick={() => setOpen(false)}>Gallery</MobileLink>
              <MobileLink to="/videos" onClick={() => setOpen(false)}>Videos</MobileLink>
              <MobileLink to="/offers" onClick={() => setOpen(false)}>Offers</MobileLink>
              <MobileLink to="/about" onClick={() => setOpen(false)}>About</MobileLink>
              <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>
              <MobileLink to="/admin" onClick={() => setOpen(false)}>Edit</MobileLink>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        <Outlet />
      </main>

      <footer className="section border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted">© {new Date().getFullYear()} VK_vision Photography</p>
          <div className="flex items-center gap-4 text-sm text-muted">
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">YouTube</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function linkCls({ isActive }: { isActive: boolean }): string {
  return `text-sm ${isActive ? 'text-white' : 'text-muted hover:text-white'} transition` as const
}

function MobileLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }): React.ReactElement {
  return (
    <NavLink to={to} onClick={onClick} className={({ isActive }) => `px-2 py-2 ${isActive ? 'text-white' : 'text-muted hover:text-white'}`}>
      {children}
    </NavLink>
  )
}

