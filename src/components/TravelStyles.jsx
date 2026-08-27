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
    <section id="travel-styles" className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
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
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {styles.map(({ name, description, icon: Icon }) => (
            <motion.article
              key={name}
              variants={fadeUp}
              className="group rounded-3xl border-2 border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-lift"
            >
              <span className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-navy">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              <Link
                to={`/tours?category=${encodeURIComponent(name)}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                Explore
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TravelStyles
