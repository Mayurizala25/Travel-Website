import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import DestinationCard from './DestinationCard'
import SectionHeading from './SectionHeading'
import { fadeIn, viewport } from '../lib/motion'
import { tours } from '../data/tours'

const destinations = [
  {
    name: 'Kashmir',
    description: 'Glacial lakes, quiet valleys and timeless mountain beauty.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Manali',
    description: 'Pine forests, high passes and lively Himalayan escapes.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Ladakh',
    description: 'Open skies, ancient monasteries and roads less travelled.',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Rajasthan',
    description: 'Royal forts, desert sunsets and rich living heritage.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Goa',
    description: 'Sun-washed shores, coastal flavours and easygoing days.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Kerala',
    description: 'Lush backwaters, spice-scented hills and slow travel.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
  },
].map((destination) => {
  const tour = tours.find((item) => item.destination === destination.name)
  return { ...destination, duration: tour?.duration, price: tour?.price }
})

function PopularDestinations() {
  const [swiper, setSwiper] = useState(null)

  return (
    <section id="destinations" className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Explore Top Destinations"
            title="Popular Destinations"
            subtitle="Handpicked places our travellers return to — each with tours ready to book or shape around you."
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-navy shadow-card transition-colors hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label="Previous destinations"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-navy shadow-card transition-colors hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label="Next destinations"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={viewport}>
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            onSwiper={setSwiper}
            loop
            grabCursor
            spaceBetween={20}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1.15 },
              640: { slidesPerView: 2.15 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {destinations.map((destination) => (
              <SwiperSlide key={destination.name} className="h-auto">
                <DestinationCard destination={destination} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default PopularDestinations
