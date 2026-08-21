import { ArrowRight } from 'lucide-react'
import { tours } from '../data/tours'
import TourCard from './TourCard'

function FeaturedTours() {
  const featuredTours = tours.slice(0, 6)

  return (
    <section id="tours" className="bg-[var(--background)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">Curated journeys</p>
            <h2 className="text-[var(--foreground)]">Featured Trips</h2>
            <p className="text-base leading-7 text-[var(--muted)]">
              Discover some of our most popular travel experiences.
            </p>
          </div>
          <a
            href="/tours"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
          >
            View All Trips
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedTours
