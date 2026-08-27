import { ArrowUpRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'

const inr = new Intl.NumberFormat('en-IN')

function DestinationCard({ destination }) {
  const { name, description, image, duration, price } = destination

  return (
    <article className="group relative isolate h-[26rem] overflow-hidden rounded-3xl bg-navy shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
      <img
        src={image}
        alt={`${name} landscape`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/80 to-navy/15 transition-opacity duration-500 group-hover:via-navy/70"
        aria-hidden="true"
      />

      {duration && (
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
          <Clock3 className="size-3.5 text-gold" aria-hidden="true" />
          {duration}
        </span>
      )}

      <div className="flex h-full flex-col justify-end p-6 text-white">
        <h3 className="font-serif text-2xl font-semibold text-white drop-shadow transition-transform duration-500 group-hover:-translate-y-1">{name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/80 transition-colors duration-500 group-hover:text-white/95">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          {price ? (
            <p className="text-sm text-white/70">
              From <span className="font-serif text-lg font-bold text-gold">₹{inr.format(price)}</span>
            </p>
          ) : (
            <span className="text-sm text-white/70">Tailored journey</span>
          )}
          <Link
            to={`/tours?destination=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Details
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default DestinationCard
