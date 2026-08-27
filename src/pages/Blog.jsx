import { useEffect, useState } from 'react'
import { AlertCircle, CalendarDays, Tag, X } from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard'
import SectionHeading from '../components/SectionHeading'
import { supabase } from '../lib/supabaseClient'

const toCardPost = (post) => ({ ...post, image: post.cover_image_url, imageAlt: post.image_alt_text, date: post.publish_date })

// Lightweight reader shown when a visitor taps "Read More" on a card.
// Replaces the old full-width article page — content stays on the listing.
function BlogReaderModal({ post, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-navy/70 p-0 backdrop-blur-sm sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-reader-title"
      onClick={onClose}
    >
      <article
        className="mx-auto min-h-full max-w-3xl overflow-hidden border border-line bg-white shadow-lift sm:min-h-0 sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/9] bg-navy">
          <img src={post.cover_image_url} alt={post.image_alt_text} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy shadow-sm">
            {post.category}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close blog"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="size-3.5" aria-hidden="true" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {post.publish_date}
            </span>
          </div>

          <h2 id="blog-reader-title" className="mt-4 font-serif text-3xl text-navy sm:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">{post.excerpt}</p>

          {post.content?.trim() && (
            <div className="mt-6 border-t border-line pt-6">
              <p className="whitespace-pre-line text-base leading-8 text-ink">{post.content}</p>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-navy"
          >
            Close
          </button>
        </div>
      </article>
    </div>
  )
}

function Blog() {
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [status, setStatus] = useState('loading')
  const [activePost, setActivePost] = useState(null)

  useEffect(() => {
    let active = true
    supabase.from('blogs').select('*').eq('status', 'published').order('publish_date', { ascending: false })
      .then(({ data, error }) => { if (active) { setPosts(error ? [] : (data || []).map(toCardPost)); setStatus(error ? 'error' : 'ready') } })
    return () => { active = false }
  }, [])

  useEffect(() => {
    const firstPost = posts[0]
    document.title = 'India Travel Guides | Rudra Tour & Travelling'
    const description = firstPost?.excerpt || 'Practical, up-to-date travel guides from Rudra Tour & Travelling.'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.content = description
    const setOg = (property, content) => { let tag = document.querySelector(`meta[property="${property}"]`); if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag) }; tag.content = content }
    setOg('og:title', document.title); setOg('og:description', description); if (firstPost?.cover_image_url) setOg('og:image', firstPost.cover_image_url)
  }, [posts])

  const categories = ['All', ...new Set(posts.map((post) => post.category))]
  const visiblePosts = activeCategory === 'All' ? posts : posts.filter((post) => post.category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="bg-cream">
        <section className="px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:px-10" aria-labelledby="blog-heading">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              as="h1"
              align="center"
              titleId="blog-heading"
              eyebrow="Travel Well"
              title="India Travel Guides"
              subtitle="Practical, up-to-date guides for planning a more thoughtful journey across India."
              className="max-w-3xl"
            />

            <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter blogs by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    activeCategory === category
                      ? 'border-gold bg-gold text-navy'
                      : 'border-navy/30 text-navy hover:border-navy hover:bg-navy/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {status === 'loading' && <p className="py-20 text-center text-sm text-muted">Loading published stories...</p>}
            {status === 'error' && (
              <p className="mx-auto mt-12 flex max-w-md items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                <AlertCircle className="size-4" />
                Published stories are temporarily unavailable.
              </p>
            )}
            {status === 'ready' && visiblePosts.length === 0 && (
              <p className="py-20 text-center text-sm text-muted">No published stories yet.</p>
            )}
            {status === 'ready' && visiblePosts.length > 0 && (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <BlogCard key={post.id} post={post} onReadMore={setActivePost} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      {activePost && <BlogReaderModal post={activePost} onClose={() => setActivePost(null)} />}
    </>
  )
}

export default Blog
