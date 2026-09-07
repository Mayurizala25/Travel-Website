import { motion } from 'framer-motion'
import { Headset, MapPinned, ShieldCheck, Wallet } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { fadeUp, staggerParent, viewport } from '../lib/motion'

const features = [
  {
    title: 'Safe Travel',
    description: 'Thoughtful planning and trusted local partners so your journey stays worry-free.',
    icon: ShieldCheck,
  },
  {
    title: 'Best Value',
    description: 'Well-designed experiences with honest pricing and meaningful value at every step.',
    icon: Wallet,
  },
  {
    title: 'Local Experts',
    description: 'Personal insight from people who know each destination deeply and travel it often.',
    icon: MapPinned,
  },
  {
    title: 'Travel Support',
    description: 'Friendly, responsive guidance before, during and after your adventure.',
    icon: Headset,
  },
]

function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-cream px-5 py-14 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Why Choose Rudra"
          title="Travel with confidence"
          subtitle="Every detail is considered so you can focus on making memories that last."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 card-grid sm:mt-14 min-[500px]:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className="group rounded-3xl border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-lift sm:p-7"
            >
              <span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-gold sm:mb-6 sm:size-14 sm:rounded-2xl">
                <Icon className="size-5 sm:size-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="font-serif text-base font-semibold text-navy sm:text-xl">{title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-muted sm:mt-3 sm:text-sm sm:leading-6">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
