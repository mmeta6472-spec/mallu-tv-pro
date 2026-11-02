import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { useTVNavigation } from './useTVNavigation.js'
import './styles.css'
import './platform.css'

function CrossPlatformApp() {
  useTVNavigation()
  return <App />
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><CrossPlatformApp /></React.StrictMode>
)

// Install the web app shell for supported browsers. Network playback still requires internet.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
