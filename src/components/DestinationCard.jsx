import { ArrowUpRight, MapPin } from 'lucide-react'

function DestinationCard({ destination }) {
  return (
    <article className="group relative isolate min-h-80 overflow-hidden rounded-2xl bg-[var(--foreground)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-96">
      <img
        src={destination.image}
        alt={`${destination.name} landscape`}
        className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/5" aria-hidden="true" />

      <div className="flex min-h-80 flex-col justify-end p-5 text-white sm:min-h-96 sm:p-6">
        <div className="max-w-xs space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/80">
            <MapPin className="size-3.5 text-[var(--secondary)]" aria-hidden="true" />
            <span>{destination.tripCount} available trips</span>
          </div>
          <h3 className="text-2xl text-white sm:text-3xl">{destination.name}</h3>
          <p className="text-sm leading-6 text-white/75">{destination.description}</p>
        </div>

        <a
          href={`/tours?destination=${encodeURIComponent(destination.name)}`}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Explore
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default DestinationCard
