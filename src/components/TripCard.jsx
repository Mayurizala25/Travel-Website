import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock3, Heart, MapPin, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fadeUp } from '../lib/motion'

const inr = new Intl.NumberFormat('en-IN')

function TripCard({ trip }) {
  const [wishlisted, setWishlisted] = useState(false)
  const navigate = useNavigate()

  return (
    <motion.article
      variants={fadeUp}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.image}
          alt={`${trip.name} in ${trip.destination}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
          {trip.category}
        </span>
        <button
          type="button"
          onClick={() => setWishlisted((v) => !v)}
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-sm backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${trip.name} from wishlist` : `Add ${trip.name} to wishlist`}
        >
          <Heart className={`size-5 transition-colors ${wishlisted ? 'fill-gold text-gold' : ''}`} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted">
            <MapPin className="size-4 text-navy" aria-hidden="true" />
            {trip.destination}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-navy">
            <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
            {trip.rating}
          </span>
        </div>

        <h3 className="mt-3 font-serif text-xl font-semibold text-navy">{trip.name}</h3>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-muted">
            <Clock3 className="size-4 text-navy" aria-hidden="true" />
            {trip.duration}
          </span>
          <p className="text-right text-sm text-muted">
            From <span className="block font-serif text-lg font-bold text-navy">₹{inr.format(trip.price)}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/tours?tourId=${trip.id}`)}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-navy px-5 py-3 text-sm font-semibold text-navy transition-colors duration-300 hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          View Details
        </button>
      </div>
    </motion.article>
  )
}

export default TripCard
