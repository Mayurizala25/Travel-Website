import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Headset, Map, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import { fadeUp, staggerParent, viewport } from '../lib/motion'

const services = [
  {
    title: 'Curated Tours',
    description: 'Destination-focused tours with clear itineraries, inclusions, exclusions and pricing.',
    icon: Map,
    to: '/tours',
    action: 'Explore tours',
  },
  {
    title: 'Custom Trip Planning',
    description: 'Share your destination, dates, group size and budget and we shape a journey around it.',
    icon: Route,
    to: '/#enquiry',
    action: 'Plan a trip',
  },
  {
    title: 'Travel Journal',
    description: 'Practical destination guidance to help you make better decisions before you travel.',
    icon: BookOpen,
    to: '/blog',
    action: 'Read guides',
  },
  {
    title: 'Direct Trip Support',
    description: 'Reach the Rudra team by phone, WhatsApp or email whenever you need a hand.',
    icon: Headset,
    to: '/#enquiry',
    action: 'Contact us',
  },
]

function ServiceLink({ to, children, className }) {
  if (to.startsWith('/#')) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

function Services() {
  return (
    <section id="services" className="bg-white px-5 py-14 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How We Help"
          title="Our Services"
          subtitle="Straightforward travel support for discovering, planning and enjoying your next journey."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 card-grid sm:mt-14 min-[500px]:grid-cols-2 lg:grid-cols-4"
        >
          {services.map(({ title, description, icon: Icon, to, action }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className="group flex flex-col rounded-3xl border border-line bg-cream p-4 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lift sm:p-7"
            >
              <span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-navy sm:mb-6 sm:size-14 sm:rounded-2xl">
                <Icon className="size-5 sm:size-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="font-serif text-base font-semibold text-navy sm:text-xl">{title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-muted sm:mt-3 sm:text-sm sm:leading-6">{description}</p>
              <ServiceLink
                to={to}
                className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-navy transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:gap-1.5 sm:pt-6 sm:text-sm"
              >
                {action}
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 sm:size-4" aria-hidden="true" />
              </ServiceLink>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
