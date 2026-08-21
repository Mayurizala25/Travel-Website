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

function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-[var(--surface)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">Travel with confidence</p>
          <h2 className="text-[var(--foreground)]">Why Choose Us</h2>
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
