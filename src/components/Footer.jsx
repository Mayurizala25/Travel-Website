import { Compass, Earth, Mail, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Tours', href: '/tours' },
  { label: 'Travel Guides', href: '/#travel-guides' },
  { label: 'About Us', href: '/#why-choose-us' },
]

const popularDestinations = [
  { label: 'Kashmir', href: '/tours?destination=Kashmir' },
  { label: 'Manali', href: '/tours?destination=Manali' },
  { label: 'Ladakh', href: '/tours?destination=Ladakh' },
  { label: 'Kerala', href: '/tours?destination=Kerala' },
]

const socialLinks = [
  { label: 'Community', icon: MessageCircle },
  { label: 'Explore online', icon: Earth },
  { label: 'Share Wanderly', icon: Share2 },
]

function Footer() {
  return (
    <footer id="contact" className="bg-[var(--footer)] px-5 pb-6 pt-16 text-white sm:px-8 sm:pt-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="max-w-xs">
            <a href="/#home" className="inline-flex items-center gap-2.5" aria-label="Wanderly home">
              <Compass className="size-7 text-[var(--secondary)]" strokeWidth={1.8} aria-hidden="true" />
              <span className="font-serif text-xl font-semibold tracking-tight">Wanderly</span>
            </a>
            <p className="mt-5 text-sm leading-6 text-[var(--footer-muted)]">
              Thoughtfully planned journeys for curious travelers who want to see more and feel more.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, icon: SocialIcon }) => (
                <span
                  key={label}
                  aria-label={label}
                  title={`${label} links coming soon`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-[var(--footer-muted)]"
                >
                  <SocialIcon className="size-4" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-white">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a className="text-sm text-[var(--footer-muted)] transition-colors hover:text-[var(--secondary)]" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-white">Popular Destinations</h2>
            <ul className="mt-5 space-y-3">
              {popularDestinations.map((link) => (
                <li key={link.label}>
                  <a className="text-sm text-[var(--footer-muted)] transition-colors hover:text-[var(--secondary)]" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-white">Get in Touch</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm leading-6 text-[var(--footer-muted)]">
                <MapPin className="mt-1 size-4 shrink-0 text-[var(--secondary)]" aria-hidden="true" />
                <span>18 Adventure Lane, New Delhi, India</span>
              </li>
              <li>
                <a className="flex items-center gap-3 text-sm text-[var(--footer-muted)] transition-colors hover:text-[var(--secondary)]" href="tel:+911140012345">
                  <Phone className="size-4 shrink-0 text-[var(--secondary)]" aria-hidden="true" />
                  +91 11 4001 2345
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 text-sm text-[var(--footer-muted)] transition-colors hover:text-[var(--secondary)]" href="mailto:hello@wanderly.in">
                  <Mail className="size-4 shrink-0 text-[var(--secondary)]" aria-hidden="true" />
                  hello@wanderly.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">© 2026 Wanderly. All rights reserved.</p>
          <p className="text-xs text-white/50">Made for meaningful journeys.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
