import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Aarav Mehta',
    location: 'Mumbai, Maharashtra',
    review: 'Every detail of our Kashmir trip felt effortless. The views were unforgettable and the planning was exceptional.',
    initials: 'AM',
  },
  {
    name: 'Priya Sharma',
    location: 'Bengaluru, Karnataka',
    review: 'Our Kerala escape was beautifully paced, with thoughtful recommendations that made the whole journey feel personal.',
    initials: 'PS',
  },
  {
    name: 'Rohan Kapoor',
    location: 'New Delhi, Delhi',
    review: 'The Ladakh itinerary balanced adventure and comfort perfectly. We came home with stories we will keep forever.',
    initials: 'RK',
  },
  {
    name: 'Ananya Iyer',
    location: 'Chennai, Tamil Nadu',
    review: 'From the first conversation to the final day, the support was warm, quick and genuinely helpful.',
    initials: 'AI',
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="bg-[var(--surface)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">Real journeys</p>
          <h2 className="text-[var(--foreground)]">Travelers Love Their Journeys</h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            Thoughtful planning, beautiful places and memories worth sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-[var(--secondary)] text-[var(--secondary)]"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-6 text-base leading-7 text-[var(--foreground)]">
                “{testimonial.review}”
              </blockquote>
              <div className="mt-7 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                <div
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white"
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{testimonial.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{testimonial.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
