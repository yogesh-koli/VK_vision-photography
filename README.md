# VK_vision Photography

A stylish React + Vite photography website with gallery, videos, offers, blog, and an admin editor backed by localStorage. Tailwind v4 styling, framer-motion animations, PWA, and SEO included.

## Tech
- React, React Router
- Tailwind CSS v4, Lucide icons, Framer Motion
- Vite + vite-plugin-pwa

## Quick start
```bash
# Windows PowerShell
cd D:\yogi-pro-1\VK_vision-photography
npm install
npm run dev
# http://localhost:5173/
```

## Edit your content (no backend)
Open /admin in the running site. It edits a JSON stored in localStorage.

Keys the site reads:
- headline, subhead, bio
- services: ["Weddings", ...]
- gallery: ["https://image1", ...]
- videos: ["https://www.youtube.com/embed/...", "https://player.vimeo.com/video/...", ...]
- offers: [{ title, desc, price }, ...]
- instagram: [post links]
- posts: [{ title, date: YYYY-MM-DD, excerpt, url? }, ...]
- formspree: "https://formspree.io/f/xxxxxx" (optional)

Admin password:
- Default: `vkvision`
- Change in Admin (browser-local) or set env var `VITE_ADMIN_PASSWORD` in hosting.

## Build
```bash
npm run build
npm run preview
```

## Deploy options
- GitHub Pages: push to main. Workflow in `.github/workflows/deploy.yml` publishes.
- Vercel: `npx vercel@latest deploy --prod`
- Netlify: `npx netlify-cli@latest deploy --build --prod`

SPA routing configs included for Vercel (`vercel.json`) and Netlify (`netlify.toml`).

## PWA
- Auto-update service worker via `vite-plugin-pwa`
- Installable on mobile/desktop

## Analytics (optional)
Set env vars in Vercel/Netlify:
- `VITE_GA_ID` (Google Analytics 4 ID)
- `VITE_PLAUSIBLE_DOMAIN` (e.g., `vkvision.in`)

## Custom domain
- Replace `public/CNAME` with your domain (e.g., `vkvision.in`).
- DNS: CNAME `www` → `yogesh-koli.github.io`. For apex, use A/ALIAS per your DNS provider or host on Vercel/Netlify.

## Notes
This repo uses client-side protection for the Admin page. For real auth (email/password or OAuth), add a backend (e.g., Supabase/Firebase).
