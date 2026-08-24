import { useState } from 'react'
import { Compass, Menu, X } from 'lucide-react'

const navigationLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Tours', href: '/tours' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Travel Guides', href: '/#travel-guides' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-8 px-5 py-4 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        <a
          href="/#home"
          className="flex shrink-0 items-center gap-2.5 text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
          onClick={closeMenu}
          aria-label="Wanderly home"
        >
          <Compass className="size-7 text-[var(--primary)]" strokeWidth={1.8} aria-hidden="true" />
          <span className="font-serif text-xl font-semibold tracking-tight">Wanderly</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href="/#enquiry"
            className="navbar-plan-trip inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123c3a]"
          >
            Plan My Trip
          </a>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] lg:hidden"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMenuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`${isMenuOpen ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'} border-t border-[var(--border)] transition-[grid-template-rows] duration-300 lg:hidden`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-5 pb-5 pt-3 sm:px-8">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#enquiry"
              className="navbar-plan-trip mt-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123c3a]"
              onClick={closeMenu}
            >
              Plan My Trip
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
