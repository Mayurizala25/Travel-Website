import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionHeading from './SectionHeading'
import TripCard from './TripCard'
import { tours } from '../data/tours'

const featuredTrips = tours.slice(0, 6)

function FeaturedTrips() {
  return (
    <section id="tours" className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Curated Journeys"
            title="Featured Trips"
            subtitle="A window into some of our most-loved travel experiences across India."
          />
          <Link
            to="/tours"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            View All Trips
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, A11y]}
          loop
          grabCursor
          spaceBetween={16}
          slidesPerView={1.1}
          autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          aria-label="Featured trips carousel"
        >
          {featuredTrips.map((trip) => (
            <SwiperSlide key={trip.id} className="h-auto pb-2">
              <TripCard trip={trip} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default FeaturedTrips
