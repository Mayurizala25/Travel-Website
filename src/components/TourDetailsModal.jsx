import { useEffect, useState } from 'react'
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Maximize2, MapPin, Star, X, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const inrFormatter = new Intl.NumberFormat('en-IN')

function TourDetailsModal({ tour, onClose }) {
  const navigate = useNavigate()
  const gallery = tour.gallery || [{ image: tour.image, title: tour.destination }]
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (!lightboxImage) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxImage(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage])

  const planTrip = () => {
    const params = new URLSearchParams({
      tourId: String(tour.id),
      destination: tour.destination,
    })

    onClose()
    navigate(`/?${params.toString()}#enquiry`)
  }

  const selectedImage = gallery[selectedImageIndex]
  const showPreviousImage = () => setSelectedImageIndex((currentIndex) => (currentIndex - 1 + gallery.length) % gallery.length)
  const showNextImage = () => setSelectedImageIndex((currentIndex) => (currentIndex + 1) % gallery.length)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--foreground)]/70 p-0 backdrop-blur-sm sm:p-5 lg:p-8" role="dialog" aria-modal="true" aria-labelledby="tour-details-title">
      <div className="mx-auto min-h-full max-w-6xl overflow-hidden bg-[var(--surface)] shadow-2xl sm:rounded-2xl">
        <div className="relative h-[45vh] min-h-80 max-h-[28rem] bg-[var(--foreground)] sm:h-[26rem] lg:h-[28rem]">
          <img src={selectedImage.image} alt={`${tour.name} - ${selectedImage.title}`} className="size-full object-cover transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <button type="button" onClick={showPreviousImage} className="absolute left-4 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-xl bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Previous gallery image">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={showNextImage} className="absolute right-4 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-xl bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Next gallery image">
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 text-xs font-semibold text-white sm:bottom-6 sm:right-6">
            <span className="rounded-lg bg-black/40 px-3 py-2 backdrop-blur-sm">{selectedImageIndex + 1} / {gallery.length}</span>
            <button type="button" onClick={() => setLightboxImage(selectedImage)} className="inline-flex size-9 items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Open image fullscreen">
              <Maximize2 className="size-4" aria-hidden="true" />
            </button>
          </div>
          <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-xl bg-white/90 text-[var(--foreground)] shadow-lg transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Close tour details">
            <X className="size-5" aria-hidden="true" />
          </button>
          <div className="absolute inset-x-5 bottom-6 text-white sm:inset-x-10 sm:bottom-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">{tour.category} journey</p>
            <h2 id="tour-details-title" className="max-w-3xl text-3xl sm:text-5xl">{tour.name}</h2>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-[var(--border)] bg-[var(--surface)] p-3 sm:gap-3 sm:p-4" aria-label="Tour photo gallery">
          {gallery.map((galleryImage, index) => (
            <button type="button" key={galleryImage.title} onClick={() => setSelectedImageIndex(index)} className={`group relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-28 ${index === selectedImageIndex ? 'border-[var(--secondary)]' : 'border-transparent opacity-70 hover:opacity-100'}`} aria-label={`View ${galleryImage.title} photo`} aria-pressed={index === selectedImageIndex}>
              <img src={galleryImage.image} alt={galleryImage.title} loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute inset-x-1 bottom-1 truncate text-left text-[10px] font-semibold text-white drop-shadow-md">{galleryImage.title}</span>
            </button>
          ))}
        </div>

        <div className="grid border-b border-[var(--border)] bg-[var(--primary)] text-white sm:grid-cols-4">
          <div className="flex items-center gap-3 border-b border-white/15 px-5 py-4 sm:border-b-0 sm:border-r sm:px-6"><MapPin className="size-4 text-[var(--secondary)]" aria-hidden="true" /><div><span className="block text-[0.68rem] uppercase tracking-[0.16em] text-white/60">Destination</span><span className="text-sm font-semibold">{tour.destination}</span></div></div>
          <div className="flex items-center gap-3 border-b border-white/15 px-5 py-4 sm:border-b-0 sm:border-r sm:px-6"><Clock3 className="size-4 text-[var(--secondary)]" aria-hidden="true" /><div><span className="block text-[0.68rem] uppercase tracking-[0.16em] text-white/60">Duration</span><span className="text-sm font-semibold">{tour.duration}</span></div></div>
          <div className="flex items-center gap-3 border-b border-white/15 px-5 py-4 sm:border-b-0 sm:border-r sm:px-6"><Star className="size-4 fill-[var(--secondary)] text-[var(--secondary)]" aria-hidden="true" /><div><span className="block text-[0.68rem] uppercase tracking-[0.16em] text-white/60">Guest rating</span><span className="text-sm font-semibold">{tour.rating} / 5</span></div></div>
          <div className="flex items-center gap-3 px-5 py-4 sm:px-6"><div><span className="block text-[0.68rem] uppercase tracking-[0.16em] text-white/60">From</span><span className="text-lg font-semibold text-[var(--secondary)]">₹{inrFormatter.format(tour.price)}</span></div></div>
        </div>

        <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:p-10">
          <div className="space-y-12">
            <section>
              <h3 className="text-2xl text-[var(--foreground)]">Overview</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{tour.description}</p>
            </section>

            <section>
              <h3 className="text-2xl text-[var(--foreground)]">Tour highlights</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-6 text-[var(--muted)]"><Check className="mt-1 size-4 shrink-0 text-[var(--secondary)]" aria-hidden="true" />{highlight}</li>)}
              </ul>
            </section>

            <div className="grid gap-8 sm:grid-cols-2">
              <section>
                <h3 className="text-xl text-[var(--foreground)]">What&apos;s included</h3>
                <ul className="mt-4 space-y-3">{tour.included.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--muted)]"><Check className="mt-1 size-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />{item}</li>)}</ul>
              </section>
              <section>
                <h3 className="text-xl text-[var(--foreground)]">What&apos;s excluded</h3>
                <ul className="mt-4 space-y-3">{tour.excluded.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--muted)]"><XCircle className="mt-1 size-4 shrink-0 text-red-700" aria-hidden="true" />{item}</li>)}</ul>
              </section>
            </div>

            <section>
              <h3 className="text-2xl text-[var(--foreground)]">Day-by-day itinerary</h3>
              <ol className="mt-5 space-y-4 border-l border-[var(--border)] pl-5">{tour.itinerary.map((day) => <li key={day} className="relative text-sm leading-6 text-[var(--muted)] before:absolute before:-left-[1.6rem] before:top-2 before:size-2 before:rounded-full before:bg-[var(--secondary)]">{day}</li>)}</ol>
            </section>

            <div className="grid gap-8 sm:grid-cols-2">
              <section>
                <h3 className="text-xl text-[var(--foreground)]">Best time to visit</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{tour.bestTime}</p>
              </section>
              <section>
                <h3 className="text-xl text-[var(--foreground)]">Important information</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{tour.importantInfo}</p>
              </section>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-[var(--muted)]">Starting from</span>
              <CalendarDays className="size-5 text-[var(--secondary)]" aria-hidden="true" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">₹{inrFormatter.format(tour.price)}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">per person, based on the selected itinerary</p>
            <button type="button" onClick={planTrip} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">Plan This Trip</button>
            <button type="button" onClick={onClose} className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]">Close details</button>
          </aside>
        </div>
      </div>
      {lightboxImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={`${lightboxImage.title} fullscreen image`}>
          <button type="button" onClick={() => setLightboxImage(null)} className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Close fullscreen image">
            <X className="size-5" aria-hidden="true" />
          </button>
          <figure className="flex max-h-full max-w-6xl flex-col items-center gap-4">
            <img src={lightboxImage.image} alt={lightboxImage.title} className="max-h-[82vh] max-w-full object-contain" />
            <figcaption className="text-sm font-semibold text-white">{lightboxImage.title}</figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}

export default TourDetailsModal
