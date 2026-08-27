import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Clock3, Heart, MapPin, Star } from 'lucide-react'

const inrFormatter = new Intl.NumberFormat('en-IN')

function TourCard({ tour }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const openDetails = () => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('tourId', tour.id)
    navigate(`/tours?${searchParams.toString()}`)
  }

  return (
    <article id={`tour-${tour.id}`} className="group scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tour.image}
          alt={`${tour.name} in ${tour.destination}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <button
          type="button"
          onClick={() => setIsFavorite((favorite) => !favorite)}
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-[var(--foreground)] shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={isFavorite ? `Remove ${tour.name} from favorites` : `Add ${tour.name} to favorites`}
          aria-pressed={isFavorite}
        >
          <Heart
            className={`size-5 ${isFavorite ? 'fill-[var(--secondary)] text-[var(--secondary)]' : ''}`}
            aria-hidden="true"
          />
        </button>
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--foreground)] backdrop-blur-sm">
          {tour.category}
        </span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
              <MapPin className="size-4 text-[var(--primary)]" aria-hidden="true" />
              {tour.destination}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[var(--foreground)]">
              <Star className="size-4 fill-[var(--secondary)] text-[var(--secondary)]" aria-hidden="true" />
              {tour.rating}
            </span>
          </div>
          <h3 className="text-xl text-[var(--foreground)] sm:text-2xl">{tour.name}</h3>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)]">
            <Clock3 className="size-4 text-[var(--primary)]" aria-hidden="true" />
            {tour.duration}
          </span>
          <p className="text-right text-sm text-[var(--muted)]">
            From <span className="block text-lg font-semibold text-[var(--foreground)]">₹{inrFormatter.format(tour.price)}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={openDetails}
          className="inline-flex w-full items-center justify-center rounded-full border border-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          View Details
        </button>
      </div>
    </article>
  )
}

export default TourCard
