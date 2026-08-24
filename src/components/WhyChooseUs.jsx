import { Headset, MapPinned, ShieldCheck, Sparkles } from 'lucide-react'

const benefits = [
  {
    name: 'Safe Travel',
    description: 'Thoughtful planning and trusted partners for a worry-free journey.',
    icon: ShieldCheck,
  },
  {
    name: 'Best Value',
    description: 'Well-designed experiences with meaningful value at every step.',
    icon: Sparkles,
  },
  {
    name: 'Local Experts',
    description: 'Personal insight from people who know each destination deeply.',
    icon: MapPinned,
  },
  {
    name: 'Travel Support',
    description: 'Friendly guidance before, during and after your adventure.',
    icon: Headset,
  },
]

const aboutStats = [
  { value: '10+', label: 'India journeys' },
  { value: '4.8/5', label: 'traveler rating' },
  { value: '24/7', label: 'on-trip support' },
]

function WhyChooseUs() {
  return (
    <section id="about" className="bg-[var(--surface)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">About Wanderly</p>
            <h2 className="max-w-2xl text-[var(--foreground)]">India, planned with intention.</h2>
            <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
              Wanderly creates thoughtful journeys for travelers who want more than a checklist. We pair local knowledge with carefully paced itineraries, so every destination feels personal, comfortable and worth remembering.
            </p>
            <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
              From a first conversation to the journey home, our team stays close to the details that make travel feel effortless.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-y border-[var(--border)] py-6 sm:gap-6">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl text-[var(--primary)] sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)] sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 mt-16 max-w-2xl space-y-3 sm:mb-12 sm:mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">The Wanderly difference</p>
          <h3 className="text-3xl text-[var(--foreground)] sm:text-4xl">Travel with confidence</h3>
          <p className="text-base leading-7 text-[var(--muted)]">
            Every detail is considered so you can focus on making memories that last.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const BenefitIcon = benefit.icon

            return (
              <article
                key={benefit.name}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:shadow-lg"
              >
                <div className="mb-7 inline-flex size-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                  <BenefitIcon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="text-xl text-[var(--foreground)]">{benefit.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{benefit.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
