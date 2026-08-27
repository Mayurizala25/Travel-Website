import { ArrowRight, CalendarDays, Tag } from 'lucide-react'

// Shared blog card — used on the /blog listing and the home "From the Blog"
// section so both stay visually identical. Pass `onReadMore` to open the blog
// in a modal (the /blog page), or `href` for a plain link (the home page).
function BlogCard({ post, href, onReadMore }) {
  // Request a card-sized image rather than the full-width hero version.
  const cardImage = post.image.replace(/w=\d+/, 'w=800')

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={cardImage}
          alt={post.imageAlt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy shadow-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Tag className="size-3.5" aria-hidden="true" />
            {post.category}
          </span>
        </div>

        <h3 className="mt-3 font-serif text-xl font-semibold text-navy">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{post.excerpt}</p>

        {onReadMore ? (
          <button
            type="button"
            onClick={() => onReadMore(post)}
            className="group/more mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-semibold text-navy transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="border-b border-transparent transition-colors group-hover/more:border-current">
              Read More
            </span>
            <ArrowRight
              className="size-4 text-gold transition-transform duration-200 group-hover/more:translate-x-1"
              aria-hidden="true"
            />
          </button>
        ) : (
          <a
            href={href}
            className="group/more mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-navy transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="border-b border-transparent transition-colors group-hover/more:border-current">
              Read More
            </span>
            <ArrowRight
              className="size-4 text-gold transition-transform duration-200 group-hover/more:translate-x-1"
              aria-hidden="true"
            />
          </a>
        )}
      </div>
    </article>
  )
}

export default BlogCard
