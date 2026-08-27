import { useEffect, useRef, useState } from 'react'

// Counts from 0 up to `end` once the element scrolls into view.
// Returns [ref, displayValue]. Non-numeric ends (e.g. "24/7") are
// passed straight through and rendered once visible.
export function useCountUp(end, { duration = 1800, suffix = '' } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(typeof end === 'number' ? 0 : '')
  const hasRun = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (hasRun.current) return
      hasRun.current = true

      if (typeof end !== 'number') {
        setValue(`${end}${suffix}`)
        return
      }

      if (prefersReduced) {
        setValue(`${end}${suffix}`)
        return
      }

      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(`${Math.round(eased * end)}${suffix}`)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [end, duration, suffix])

  return [ref, value]
}
