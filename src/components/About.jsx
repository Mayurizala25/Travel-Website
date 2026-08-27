import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { fadeUp, staggerParent, viewport } from '../lib/motion'

const missionPoints = [
  'Every itinerary is planned around how you like to travel — the pace, the stays, the moments that matter.',
  'Clear pricing with inclusions and exclusions spelled out before you commit.',
  'A real person on call before, during and after your journey.',
]

const aboutImages = [
  {
    src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85',
    alt: 'Traveller looking over a Himalayan valley',
    className: 'row-span-2 h-full',
  },
  {
    src: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85',
    alt: 'Palace architecture in Rajasthan',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85',
    alt: 'Houseboat on the Kerala backwaters',
    className: '',
  },
]

function About() {
  return (
    <section id="about" className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative grid grid-cols-2 grid-rows-2 gap-4"
        >
          {aboutImages.map((image) => (
            <motion.img
              key={image.src}
              variants={fadeUp}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className={`w-full rounded-3xl object-cover shadow-card ${image.className || 'h-48 sm:h-56'}`}
            />
          ))}
          <div
            className="absolute -bottom-5 left-3 rounded-2xl bg-navy px-4 py-3 text-white shadow-lift sm:left-6"
            aria-hidden="true"
          >
            <span className="block font-serif text-lg font-bold text-gold">10+ years</span>
            <span className="text-xs text-white/70">planning Indian journeys</span>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="About Rudra"
            title="India, planned with intention"
            subtitle="Rudra Tour & Travelling helps curious travellers see more of India through thoughtfully presented tours, practical guidance and personal trip planning. From your first enquiry onward, our team stays close to the details that make travel feel clear and comfortable."
          />

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-8 space-y-4"
          >
            {missionPoints.map((point) => (
              <motion.li key={point} variants={fadeUp} className="flex gap-3 text-sm leading-6 text-muted">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

export default About
