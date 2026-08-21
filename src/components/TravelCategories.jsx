import { Compass, Heart, Landmark, Mountain, Sunrise, Users } from 'lucide-react'
import CategoryCard from './CategoryCard'

const categories = [
  {
    name: 'Adventure',
    description: 'Exciting experiences for thrill seekers.',
    icon: Compass,
  },
  {
    name: 'Trekking',
    description: 'Explore beautiful trails and mountains.',
    icon: Mountain,
  },
  {
    name: 'Family',
    description: 'Comfortable trips made for everyone.',
    icon: Users,
  },
  {
    name: 'Honeymoon',
    description: 'Romantic escapes and unforgettable moments.',
    icon: Heart,
  },
  {
    name: 'Weekend',
    description: 'Quick getaways for a refreshing break.',
    icon: Sunrise,
  },
  {
    name: 'Cultural',
    description: 'Discover history, traditions and local life.',
    icon: Landmark,
  },
]

function TravelCategories() {
  return (
    <section id="travel-categories" className="bg-[var(--background)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl space-y-3 text-center sm:mb-12 sm:mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">Find your style</p>
          <h2 className="text-[var(--foreground)]">Travel Your Way</h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            Choose an experience that matches the way you love to travel.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TravelCategories
