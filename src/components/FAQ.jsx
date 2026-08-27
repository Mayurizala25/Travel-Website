import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { fadeUp, staggerParent, viewport } from '../lib/motion'

const faqs = [
  {
    question: 'How do I book a tour?',
    answer:
      'Open any tour and use View Details to review the itinerary, inclusions, exclusions and price. From there you can send an enquiry with your preferred dates and group size, and our team confirms the next steps.',
  },
  {
    question: 'Can I customise a trip?',
    answer:
      'Yes. Use the enquiry form to share your destination, travel dates, group size, budget and preferences. We then build a plan around what matters most to you.',
  },
  {
    question: 'What is included in a tour price?',
    answer:
      'Each tour lists its own inclusions and exclusions in the details view. Review those sections before enquiring so you know exactly what the published price covers.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellation terms vary by tour and supplier. Ask the Rudra team for the applicable terms before you confirm, and we will share them in writing.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Payment arrangements are confirmed by our team during booking, usually as a deposit followed by a balance before travel. Contact us with your selected tour for details.',
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div variants={fadeUp} className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-5 py-5 text-left font-serif text-lg font-semibold text-navy transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {faq.question}
          <ChevronDown
            className={`size-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-sm leading-6 text-muted">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="Before You Book"
          title="Frequently asked questions"
          subtitle="Clear answers to the questions travellers ask us most when planning a Rudra journey."
        />

        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={viewport}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
