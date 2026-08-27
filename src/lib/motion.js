// Shared Framer Motion presets so every section reveals consistently
// (fade + slide up on scroll into view).

export const viewport = { once: true, amount: 0.2 }

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Parent wrapper that staggers its children (each child uses `fadeUp`).
export const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}
