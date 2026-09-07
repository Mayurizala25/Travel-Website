import { motion } from 'framer-motion'
import { ArrowRight, Compass, Heart, Landmark, Mountain, Sunrise, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import { fadeUp, staggerParent, viewport } from '../lib/motion'

const styles = [
  { name: 'Adventure', description: 'High-energy days for travellers who chase the thrill.', icon: Compass },
  { name: 'Trekking', description: 'Trails, ridgelines and mountains met on foot.', icon: Mountain },
  { name: 'Family', description: 'Comfortable, well-paced trips that work for every age.', icon: Users },
  { name: 'Honeymoon', description: 'Romantic escapes and quiet, unforgettable moments.', icon: Heart },
  { name: 'Weekend', description: 'Short getaways that fit a long weekend perfectly.', icon: Sunrise },
  { name: 'Cultural', description: 'History, traditions and local life, up close.', icon: Landmark },
]

function TravelStyles() {
  return (
    <section id="travel-styles" className="bg-white px-5 py-14 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Find Your Style"
          title="Travel Your Way"
          subtitle="Choose an experience that matches the way you love to travel."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {styles.map(({ name, description, icon: Icon }) => (
            <motion.article
              key={name}
              variants={fadeUp}
              className="group rounded-3xl border-2 border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-lift sm:p-7"
            >
              <span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-gold group-hover:text-navy sm:mb-6 sm:size-14 sm:rounded-2xl">
                <Icon className="size-5 sm:size-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="font-serif text-base font-semibold text-navy sm:text-xl">{name}</h3>
              <p className="mt-1.5 line-clamp-3 text-xs leading-5 text-muted sm:mt-3 sm:line-clamp-none sm:text-sm sm:leading-6">{description}</p>
              <Link
                to={`/tours?category=${encodeURIComponent(name)}`}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy transition-colors group-hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:mt-6 sm:gap-1.5 sm:text-sm"
              >
                Explore
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 sm:size-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TravelStyles
