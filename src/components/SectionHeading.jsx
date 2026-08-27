import { motion } from 'framer-motion'
import { staggerParent, fadeUp, viewport } from '../lib/motion'

// Consistent section header: gold uppercase eyebrow → navy serif heading
// → gray subtext. Reveals with a staggered fade-up on scroll.
function SectionHeading({ eyebrow, title, subtitle, align = 'left', className = '', titleId, as = 'h2', children }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'
  const Heading = as === 'h1' ? motion.h1 : motion.h2

  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`flex max-w-2xl flex-col ${alignment} ${className}`}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-gold"
        >
          {eyebrow}
        </motion.p>
      )}
      <Heading id={titleId} variants={fadeUp} className="mt-3 text-navy">
        {title}
      </Heading>
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-4 text-base leading-7 text-muted">
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  )
}

export default SectionHeading
