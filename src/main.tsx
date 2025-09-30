import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './styles.css'
import { AppLayout } from './ui/AppLayout'
import { HomePage } from './views/HomePage'
import { GalleryPage } from './views/GalleryPage'
import { VideoPage } from './views/VideoPage'
import { AboutPage } from './views/AboutPage'
import { OffersPage } from './views/OffersPage'
import { AdminPage } from './views/AdminPage'
import { ContactPage } from './views/ContactPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'videos', element: <VideoPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'offers', element: <OffersPage /> },
      { path: 'admin', element: <AdminPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
])

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<RouterProvider router={router} />)

