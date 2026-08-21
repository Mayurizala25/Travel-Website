import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const defaultBackgroundImage =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85'

function Hero({ backgroundImage = defaultBackgroundImage, onSearch }) {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const searchTerm = destination.trim()
    onSearch?.(searchTerm)
    navigate(searchTerm ? `/tours?search=${encodeURIComponent(searchTerm)}` : '/tours')
  }

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[620px] w-full items-center overflow-hidden bg-[var(--foreground)] sm:min-h-[680px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10 bg-[var(--foreground)]/65" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--foreground)]/80 via-[var(--foreground)]/45 to-[var(--foreground)]/20" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[var(--secondary)] sm:text-sm">
            TRAVEL <span aria-hidden="true">•</span> EXPLORE <span aria-hidden="true">•</span> EXPERIENCE
          </p>
          <h1
            id="hero-heading"
            className="max-w-2xl text-5xl leading-[1.04] text-white sm:text-6xl lg:text-8xl"
          >
            Your Next Adventure Starts Here
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Discover inspiring destinations, unforgettable experiences and thoughtfully planned trips.
          </p>

          <form
            className="mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={handleSubmit}
            role="search"
          >
            <label className="sr-only" htmlFor="destination-search">
              Search destinations
            </label>
            <div className="flex min-h-14 flex-1 items-center gap-3 rounded-full border border-white/20 bg-white px-5 shadow-lg shadow-black/10 transition-shadow focus-within:shadow-xl">
              <Search className="size-5 shrink-0 text-[var(--muted)]" aria-hidden="true" />
              <input
                id="destination-search"
                type="search"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Where do you want to go?"
                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-7 text-sm font-semibold text-white transition-colors hover:bg-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Search className="size-4" aria-hidden="true" />
              Search
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default Hero
