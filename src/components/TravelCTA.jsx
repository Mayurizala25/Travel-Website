import { ArrowRight, Compass } from 'lucide-react'

function TravelCTA() {
  return (
    <section id="plan-trip" className="bg-[var(--background)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[var(--primary)] px-6 py-14 text-center text-white shadow-lg sm:px-12 sm:py-20">
          <Compass className="mx-auto mb-6 size-10 text-[var(--secondary)]" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="text-4xl text-white sm:text-5xl">Ready for Your Next Adventure?</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#tours"
              className="travel-cta-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffffff]"
            >
              Explore Trips
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="/#enquiry"
              className="travel-cta-secondary inline-flex items-center justify-center rounded-xl border bg-transparent px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffffff]"
            >
              Plan My Trip
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TravelCTA
