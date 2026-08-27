import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionHeading from './SectionHeading'
import { fadeIn, viewport } from '../lib/motion'

const testimonials = [
  {
    name: 'Aarav Mehta',
    location: 'Mumbai, Maharashtra',
    initials: 'AM',
    rating: 5,
    quote:
      'Every detail of our Kashmir trip felt effortless. The views were unforgettable and the planning was genuinely exceptional.',
  },
  {
    name: 'Priya Sharma',
    location: 'Bengaluru, Karnataka',
    initials: 'PS',
    rating: 5,
    quote:
      'Our Kerala escape was beautifully paced, with thoughtful recommendations that made the whole journey feel personal.',
  },
  {
    name: 'Rohan Kapoor',
    location: 'New Delhi, Delhi',
    initials: 'RK',
    rating: 5,
    quote:
      'The Ladakh itinerary balanced adventure and comfort perfectly. We came home with stories we will keep forever.',
  },
  {
    name: 'Ananya Iyer',
    location: 'Chennai, Tamil Nadu',
    initials: 'AI',
    rating: 5,
    quote: 'From the first conversation to the final day, the support was warm, quick and genuinely helpful.',
  },
  {
    name: 'Vikram Nair',
    location: 'Kochi, Kerala',
    initials: 'VN',
    rating: 5,
    quote: 'They handled a last-minute change without any fuss. That kind of reliability is rare and worth a lot.',
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Traveller Stories"
          title="Journeys worth sharing"
          subtitle="Thoughtful planning, beautiful places and memories our travellers keep coming back to."
        />

        <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={viewport} className="mt-14">
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            loop
            grabCursor
            spaceBetween={24}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.name} className="h-auto pb-2">
                <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card">
                  <Quote className="size-8 text-gold" aria-hidden="true" />
                  <div className="mt-4 flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-base leading-7 text-ink">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white"
                      aria-hidden="true"
                    >
                      {testimonial.initials}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-navy">{testimonial.name}</span>
                      <span className="text-xs text-muted">{testimonial.location}</span>
                    </span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
