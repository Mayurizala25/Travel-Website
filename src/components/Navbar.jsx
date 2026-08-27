import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

// Hash targets scroll natively; only the Tours route needs SPA navigation.
function NavItem({ link, className, onClick, children }) {
  if (link.route) {
    return (
      <Link to={link.route} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a href={link.to} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

const PHONE_DISPLAY = '+91 85301 65142'
const PHONE_HREF = 'tel:+918530165142'

const navLinks = [
  { label: 'Home', to: '/#home', section: 'home' },
  { label: 'Tours', to: '/tours', route: '/tours' },
  { label: 'Destinations', to: '/#destinations', section: 'destinations' },
  { label: 'Blog', to: '/blog', route: '/blog' },
  { label: 'Why Us', to: '/#why-us', section: 'why-us' },
  { label: 'Contact', to: '/#enquiry', section: 'enquiry' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const ids = navLinks.filter((link) => link.section).map((link) => link.section)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [location.pathname])

  const isActive = (link) => {
    if (link.route) return location.pathname === link.route
    return location.pathname === '/' && activeSection === link.section
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line/70 bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,37,69,0.18)] backdrop-blur-xl'
          : 'border-b border-transparent bg-white/40 backdrop-blur-md'
      }`}
    >
      <nav
        className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        <a href="/#home" className="group flex shrink-0 items-center" aria-label="Rudra Tour & Travelling home">
          <img src="/logo.png" alt="Rudra Tour & Travelling" className="h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85 sm:h-14" />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavItem
                link={link}
                className={`group relative py-1 text-sm font-medium transition-colors ${
                  isActive(link) ? 'text-navy' : 'text-muted hover:text-navy'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gold transition-all duration-300 ${
                    isActive(link) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  aria-hidden="true"
                />
              </NavItem>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Phone className="size-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-drawer"
              className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-white px-6 pb-8 pt-6 shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <img src="/logo.png" alt="Rudra Tour & Travelling" className="h-14 w-auto object-contain" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-full text-navy hover:bg-navy/5"
                  aria-label="Close menu"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <ul className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <NavItem
                      link={link}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                        isActive(link) ? 'bg-navy/5 text-navy' : 'text-muted hover:bg-navy/5 hover:text-navy'
                      }`}
                    >
                      {link.label}
                    </NavItem>
                  </li>
                ))}
              </ul>

              <a
                href={PHONE_HREF}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-soft"
              >
                <Phone className="size-4" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
