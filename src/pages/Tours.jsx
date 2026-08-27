import { useState } from 'react'
import { MapPinned, Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import TourCard from '../components/TourCard'
import TourDetailsModal from '../components/TourDetailsModal'
import { tours } from '../data/tours'

const defaultFilters = {
  search: '',
  destination: 'All destinations',
  category: 'All categories',
  budget: 'Any budget',
  duration: 'Any duration',
}

const budgetOptions = [
  { label: 'Any budget', value: 'any' },
  { label: 'Under ₹15,000', value: 'under-15000' },
  { label: '₹15,000 - ₹25,000', value: '15000-25000' },
  { label: 'Above ₹25,000', value: 'above-25000' },
]

const durationOptions = [
  { label: 'Any duration', value: 'any' },
  { label: 'Up to 3 days', value: 'up-to-3' },
  { label: '4 - 5 days', value: '4-5' },
  { label: '6 - 7 days', value: '6-7' },
  { label: '8+ days', value: '8-plus' },
]

const getDurationDays = (duration) => Number.parseInt(duration, 10)

function Tours() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    search: searchParams.get('search') || '',
    destination: searchParams.get('destination') || defaultFilters.destination,
    category: searchParams.get('category') || defaultFilters.category,
  }))

  const destinations = [...new Set(tours.map((tour) => tour.destination))]
  const categories = [...new Set(tours.map((tour) => tour.category))]

  const filteredTours = tours.filter((tour) => {
    const searchTerm = filters.search.trim().toLowerCase()
    const matchesSearch = !searchTerm
      || tour.name.toLowerCase().includes(searchTerm)
      || tour.destination.toLowerCase().includes(searchTerm)
    const matchesDestination = filters.destination === defaultFilters.destination
      || tour.destination === filters.destination
    const matchesCategory = filters.category === defaultFilters.category
      || tour.category === filters.category
    const matchesBudget = filters.budget === 'Any budget'
      || (filters.budget === 'under-15000' && tour.price < 15000)
      || (filters.budget === '15000-25000' && tour.price >= 15000 && tour.price <= 25000)
      || (filters.budget === 'above-25000' && tour.price > 25000)
    const durationDays = getDurationDays(tour.duration)
    const matchesDuration = filters.duration === 'Any duration'
      || (filters.duration === 'up-to-3' && durationDays <= 3)
      || (filters.duration === '4-5' && durationDays >= 4 && durationDays <= 5)
      || (filters.duration === '6-7' && durationDays >= 6 && durationDays <= 7)
      || (filters.duration === '8-plus' && durationDays >= 8)

    return matchesSearch && matchesDestination && matchesCategory && matchesBudget && matchesDuration
  })

  const updateFilter = (key, value) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }))
  }

  const clearFilters = () => setFilters(defaultFilters)
  const hasActiveFilters = Object.values(filters).some((value, index) => value !== Object.values(defaultFilters)[index])
  const selectedTour = tours.find((tour) => tour.id === Number(searchParams.get('tourId')))
  const destinationHeading = filters.destination === defaultFilters.destination ? 'Explore Your Next Adventure' : `${filters.destination} journeys`
  const closeDetails = () => {
    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.delete('tourId')
    setSearchParams(nextSearchParams)
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[var(--background)] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16" aria-labelledby="tours-grid-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 overflow-hidden rounded-3xl bg-[var(--primary-hover)] px-6 py-8 text-white shadow-[var(--shadow-lift)] sm:mb-10 sm:px-10 sm:py-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                    <MapPinned className="size-4" aria-hidden="true" />
                    Curated journeys across India
                  </div>
                  <h2 id="tours-grid-heading" className="text-3xl text-white sm:text-4xl">{destinationHeading}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">Find a journey that fits the way you want to travel, with clear pricing and thoughtfully planned itineraries.</p>
                </div>
                <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white" aria-live="polite">
                  {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} found
                </p>
              </div>
            </div>

              <div className="mb-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)] sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">Refine your search</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">Use the filters to find the right pace and place.</p>
                  </div>
                  {hasActiveFilters && <span className="hidden text-xs font-semibold text-[var(--primary)] sm:inline">Filters applied</span>}
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))_auto] lg:items-end">
                  <label className="block md:col-span-2 lg:col-span-1">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Search tours</span>
                    <span className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 focus-within:border-[var(--primary)]">
                      <Search className="size-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
                      <input
                        type="search"
                        value={filters.search}
                        onChange={(event) => updateFilter('search', event.target.value)}
                        placeholder="Search by name or destination"
                        className="min-w-0 flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                      />
                    </span>
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Destination</span>
                    <select
                      value={filters.destination}
                      onChange={(event) => updateFilter('destination', event.target.value)}
                      className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                    >
                      <option>All destinations</option>
                      {destinations.map((destination) => <option key={destination}>{destination}</option>)}
                    </select>
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Category</span>
                    <select
                      value={filters.category}
                      onChange={(event) => updateFilter('category', event.target.value)}
                      className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                    >
                      <option>All categories</option>
                      {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Budget</span>
                    <select
                      value={filters.budget}
                      onChange={(event) => updateFilter('budget', event.target.value)}
                      className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                    >
                      {budgetOptions.map((option) => <option key={option.value} value={option.value === 'any' ? 'Any budget' : option.value}>{option.label}</option>)}
                    </select>
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Duration</span>
                    <select
                      value={filters.duration}
                      onChange={(event) => updateFilter('duration', event.target.value)}
                      className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                    >
                      {durationOptions.map((option) => <option key={option.value} value={option.value === 'any' ? 'Any duration' : option.value}>{option.label}</option>)}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 text-sm font-semibold text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {hasActiveFilters ? <X className="size-4" aria-hidden="true" /> : <SlidersHorizontal className="size-4" aria-hidden="true" />}
                    Clear Filters
                  </button>
                </div>
              </div>

            {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background)] px-6 py-16 text-center">
                <h3 className="text-2xl text-[var(--foreground)]">No tours found</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">Try adjusting your search or clearing one of the filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      {selectedTour && <TourDetailsModal tour={selectedTour} onClose={closeDetails} />}
    </>
  )
}

export default Tours
