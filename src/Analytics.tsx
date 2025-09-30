import React from 'react'

export function Analytics(): React.ReactElement | null {
  React.useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID as string | undefined
    const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined

    if (gaId) {
      const s1 = document.createElement('script')
      s1.async = true
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(s1)

      const s2 = document.createElement('script')
      s2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`
      document.head.appendChild(s2)
    }

    if (plausibleDomain) {
      const p = document.createElement('script')
      p.setAttribute('defer', '')
      p.setAttribute('data-domain', plausibleDomain)
      p.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(p)
    }
  }, [])

  return null
}

