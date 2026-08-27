import { motion } from 'framer-motion'
import { Compass, Headset, MapPin, Route, Sparkles } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { tours } from '../data/tours'
import { useCountUp } from '../hooks/useCountUp'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1400&q=90',
    caption: 'Dal Lake, Kashmir',
  },
  {
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1400&q=90',
    caption: 'Pangong Lake, Ladakh',
  },
  {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=90',
    caption: 'Backwaters, Kerala',
  },
  {
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=90',
    caption: 'Forts of Rajasthan',
  },
  {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=90',
    caption: 'Solang Valley, Manali',
  },
]

const stats = [
  { value: tours.length, suffix: '+', label: 'Curated Tours', icon: Route },
  { value: new Set(tours.map((t) => t.destination)).size, suffix: '+', label: 'Destinations', icon: MapPin },
  { value: new Set(tours.map((t) => t.category)).size, label: 'Travel Styles', icon: Sparkles },
  { value: '24/7', label: 'Trip Support', icon: Headset },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function StatCounter({ value, suffix, label, icon: Icon }) {
  const [ref, display] = useCountUp(value, { suffix })
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-gold/50 text-gold">
        <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-xl font-bold text-navy">{display}</span>
        <span className="text-xs text-muted">{label}</span>
      </span>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      {/* Decorative dotted pattern + airplane flight path */}
      <div
        className="dot-grid pointer-events-none absolute -left-10 top-24 h-40 w-56 text-navy/15"
        aria-hidden="true"
      />
      <div
        className="dot-grid pointer-events-none absolute bottom-16 right-6 h-40 w-56 text-gold/25 lg:right-1/2"
        aria-hidden="true"
      />
      <svg
        className="pointer-events-none absolute left-0 top-10 hidden h-40 w-1/2 text-gold/30 lg:block"
        viewBox="0 0 600 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 170 C 160 40, 320 40, 460 120 S 560 60, 585 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 8"
          style={{ strokeDashoffset: 900, animation: 'plane-dash 6s ease-out forwards' }}
        />
        <path d="M578 22l14 6-10 10-2-8-6-2 4-6z" fill="currentColor" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10 lg:py-20">
        {/* Left column */}
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0 max-w-2xl">
          <motion.p
            variants={item}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-gold"
          >
            Travel • Explore • Experience
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 text-navy lg:text-[clamp(2.75rem,4.4vw,3.75rem)] lg:leading-[1.06]"
          >
            Your Next Adventure <span className="text-gold">Starts</span> Here
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-lg leading-8 text-muted">
            Discover beautiful corners of India through thoughtfully planned journeys, local experiences
            and time genuinely well spent.
          </motion.p>

          {/* Stat counters */}
          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — slider card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full min-w-0 max-w-lg lg:max-w-xl"
        >
          <span
            className="absolute right-3 top-3 z-10 h-16 w-16 rounded-tr-[1.5rem] border-r-2 border-t-2 border-gold"
            aria-hidden="true"
          />
          <span className="absolute -bottom-4 -left-4 h-20 w-20 rounded-bl-[1.5rem] bg-gold/15" aria-hidden="true" />

          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-3 shadow-lift">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop
              autoplay={{ delay: 3200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="overflow-hidden rounded-[1.5rem]"
              a11y={{ enabled: true }}
            >
              {heroSlides.map((slide) => (
                <SwiperSlide key={slide.caption}>
                  <div className="relative">
                    <img
                      src={slide.image}
                      alt={slide.caption}
                      loading="eager"
                      className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
                      {slide.caption}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <motion.a
            href="#destinations"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute -bottom-6 right-6 inline-flex items-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-bold text-navy shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Compass className="size-4" aria-hidden="true" />
            Start Exploring
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
