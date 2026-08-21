import { ArrowUpRight } from 'lucide-react'

const guides = [
  {
    title: 'Best Time to Visit Kashmir',
    description: 'Plan the perfect season for snow-dusted valleys, gardens and lake views.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Things to Do in Manali',
    description: 'Find mountain adventures, peaceful escapes and local favourites in Manali.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Ladakh Travel Guide',
    description: 'A practical introduction to high-altitude roads, monasteries and open skies.',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Best Places in Rajasthan',
    description: 'Discover royal cities, desert landscapes and stories woven into every fort.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'What to Pack for a Himalayan Trip',
    description: 'Build a thoughtful packing list for changing weather and mountain days.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=85',
  },
]

function TravelGuides() {
  return (
    <section id="travel-guides" className="bg-[var(--background)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">Travel well</p>
          <h2 className="text-[var(--foreground)]">Travel Guides</h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            Practical inspiration and local insight for planning your next journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <article
              key={guide.title}
              className={`${index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''} group relative isolate min-h-72 overflow-hidden rounded-2xl bg-[var(--foreground)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <img
                src={guide.image}
                alt={`${guide.title} travel guide`}
                className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
              <div className="flex min-h-72 flex-col justify-end p-5 sm:p-6">
                <h3 className="max-w-xl text-2xl text-white sm:text-3xl">{guide.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">{guide.description}</p>
                <a
                  href="/tours"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Read Guide
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TravelGuides
