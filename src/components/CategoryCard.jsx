import { ArrowRight } from 'lucide-react'

function CategoryCard({ category }) {
  const CategoryIcon = category.icon

  return (
    <article className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:shadow-lg sm:p-6">
      <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
        <CategoryIcon className="size-6" strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h3 className="text-xl text-[var(--foreground)]">{category.name}</h3>
      <p className="mt-3 min-h-12 text-sm leading-6 text-[var(--muted)]">{category.description}</p>
      <a
        href={`/tours?category=${encodeURIComponent(category.name)}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
      >
        Explore
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </article>
  )
}

export default CategoryCard
