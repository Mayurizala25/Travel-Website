import { motion } from 'framer-motion'
import { ArrowRight, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeUp, viewport } from '../lib/motion'

// Real group-travel photos for the "Travel With Us" section.
const groupPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    alt: 'A large group of friends sitting arm in arm at a viewpoint, looking out over a mountain bay',
  },
  {
    src: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=900&q=80',
    alt: 'Four friends with backpacks laughing together on a trekking trail below jagged mountain peaks',
  },
  {
    src: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&w=900&q=80',
    alt: 'A group of friends walking arm in arm on a bright travel day, one carrying a camera',
  },
  {
    src: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=900&q=80',
    alt: 'A parent and child sharing a moment on a beach at sunset during a family holiday',
  },
]

function CTABanner() {
  return (
    <section id="plan-trip" className="bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-navy-deep p-6 shadow-lift sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14"
      >
        <div>
          <span className="inline-flex size-14 items-center justify-center rounded-2xl border-2 border-gold/50 text-gold">
            <Compass className="size-6" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-white">Travel With Us</h2>
          <p className="mt-4 max-w-md text-base leading-7 text-white/80">
            Bring your people, choose your pace and let us shape a group experience worth remembering —
            from Himalayan road trips to relaxed family holidays.
          </p>
          <Link
            to="/#enquiry"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Plan a group experience
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {groupPhotos.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-xl object-cover shadow-lg ring-1 ring-white/10"
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default CTABanner
