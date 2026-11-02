import { useEffect } from 'react'

// Directional focus navigation for Android TV remotes and desktop keyboards.
export function useTVNavigation() {
  useEffect(() => {
    function onKeyDown(event) {
      const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
      if (!directions.includes(event.key)) return
      if (event.target?.matches?.('input, textarea, select, [contenteditable="true"]')) return

      const elements = [...document.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter(el => {
        const r = el.getBoundingClientRect()
        const s = getComputedStyle(el)
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'
      })
      if (!elements.length) return
      const current = document.activeElement
      if (!elements.includes(current)) {
        elements[0].focus({ preventScroll: true })
        return
      }
      const a = current.getBoundingClientRect()
      const ax = a.left + a.width / 2
      const ay = a.top + a.height / 2
      const horizontal = event.key === 'ArrowLeft' || event.key === 'ArrowRight'
      const sign = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1
      const options = elements.filter(el => el !== current).map(el => {
        const r = el.getBoundingClientRect()
        const x = r.left + r.width / 2
        const y = r.top + r.height / 2
        const primary = horizontal ? (x - ax) * sign : (y - ay) * sign
        const secondary = horizontal ? Math.abs(y - ay) : Math.abs(x - ax)
        return { el, primary, secondary }
      }).filter(x => x.primary > 2)
      options.sort((a, b) => (a.primary + a.secondary * 1.8) - (b.primary + b.secondary * 1.8))
      if (!options.length) return
      event.preventDefault()
      const next = options[0].el
      next.focus({ preventScroll: true })
      const r = next.getBoundingClientRect()
      if (r.top < 0 || r.bottom > innerHeight || r.left < 0 || r.right > innerWidth) {
        next.scrollIntoView({ block: 'nearest', inline: 'nearest' })
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])
}
