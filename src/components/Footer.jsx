import { Compass, Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Tours', to: '/tours' },
  { label: 'Services', to: '/#services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Why Us', to: '/#why-us' },
  { label: 'FAQ', to: '/#faq' },
]

const popularDestinations = ['Kashmir', 'Manali', 'Ladakh', 'Rajasthan', 'Goa', 'Kerala']

const socials = [
  { label: 'Phone', icon: Phone, href: 'tel:+918530165142' },
  { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/918530165142' },
  { label: 'Email', icon: Mail, href: 'mailto:tour@virtualrudra.com' },
  { label: 'Contact', icon: Globe, to: '/#enquiry' },
]

function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLinkClick = (e, to) => {
    if (to.startsWith('/#')) {
      const targetId = to.substring(2)
      if (location.pathname === '/') {
        e.preventDefault()
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        navigate(to, { replace: true })
      }
    } else if (to === '/') {
      if (location.pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        navigate('/', { replace: true })
      }
    }
  }

  const handleDestinationClick = (e, name) => {
    const targetUrl = `/tours?destination=${encodeURIComponent(name)}`
    if (location.pathname === '/tours') {
      e.preventDefault()
      window.location.assign(targetUrl)
    }
  }

  return (
    <footer id="contact" className="bg-navy-deep px-5 pb-8 pt-16 text-white sm:px-8 sm:pt-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div className="max-w-xs">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white px-3 py-1.5 shadow-card">
              <img
                src="/logo.png"
                alt="Rudra Tour & Travelling"
                loading="lazy"
                decoding="async"
                className="h-16 w-auto object-contain sm:h-20"
              />
              <Compass className="size-6 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm leading-6 text-white/60">
              Thoughtfully planned journeys for curious travellers who want to see more and feel more.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((item) => {
                const Icon = item.icon
                if (item.to) {
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={(e) => handleLinkClick(e, item.to)}
                      aria-label={item.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </Link>
                  )
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-white">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                    to={link.to}
                    onClick={(e) => handleLinkClick(e, link.to)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-white">Popular Destinations</h2>
            <ul className="mt-5 space-y-3">
              {popularDestinations.map((name) => (
                <li key={name}>
                  <Link
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                    to={`/tours?destination=${encodeURIComponent(name)}`}
                    onClick={(e) => handleDestinationClick(e, name)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-white">Get in Touch</h2>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                7, Harmony Hub, Rajkot, Gujarat
              </li>
              <li>
                <a className="flex items-center gap-3 transition-colors hover:text-gold" href="tel:+918530165142">
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  +91 85301 65142
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 transition-colors hover:text-gold" href="https://wa.me/918530165142">
                  <MessageCircle className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                  href="mailto:tour@virtualrudra.com"
                >
                  <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  tour@virtualrudra.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/40">© {new Date().getFullYear()} Rudra Tour &amp; Travelling. All rights reserved.</p>
          <p className="text-white/40">Made for meaningful journeys.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
