import DestinationCard from './DestinationCard'

const destinations = [
  {
    name: 'Kashmir',
    description: 'Glacial lakes, quiet valleys and timeless mountain beauty.',
    tripCount: 18,
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Manali',
    description: 'Pine forests, high passes and lively Himalayan escapes.',
    tripCount: 24,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Ladakh',
    description: 'Open skies, ancient monasteries and roads less travelled.',
    tripCount: 15,
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Rajasthan',
    description: 'Royal forts, desert sunsets and rich living heritage.',
    tripCount: 21,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Goa',
    description: 'Sun-washed shores, coastal flavours and easygoing days.',
    tripCount: 27,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Kerala',
    description: 'Lush backwaters, spice-scented hills and slow travel.',
    tripCount: 19,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
  },
]

function PopularDestinations() {
  return (
    <section id="destinations" className="bg-[var(--surface)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">Find your horizon</p>
          <h2 className="text-[var(--foreground)]">Popular Destinations</h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            Explore breathtaking places and discover your next unforgettable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.name} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularDestinations
