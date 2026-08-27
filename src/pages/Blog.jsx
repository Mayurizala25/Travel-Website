import { useEffect, useState } from 'react'
import { AlertCircle, CalendarDays } from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard'
import SectionHeading from '../components/SectionHeading'
import { supabase } from '../lib/supabaseClient'

const toCardPost = (post) => ({ ...post, image: post.cover_image_url, imageAlt: post.image_alt_text, date: post.publish_date })

function Blog() {
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [status, setStatus] = useState('loading')

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

  return <><Navbar /><main className="bg-cream"><section className="px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:px-10" aria-labelledby="blog-heading"><div className="mx-auto max-w-7xl"><SectionHeading as="h1" align="center" titleId="blog-heading" eyebrow="Travel Well" title="India Travel Guides" subtitle="Practical, up-to-date guides for planning a more thoughtful journey across India." className="max-w-3xl" /><div className="mt-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter blogs by category">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${activeCategory === category ? 'border-gold bg-gold text-navy' : 'border-navy/30 text-navy hover:border-navy hover:bg-navy/5'}`}>{category}</button>)}</div>{status === 'loading' && <p className="py-20 text-center text-sm text-muted">Loading published stories...</p>}{status === 'error' && <p className="mx-auto mt-12 flex max-w-md items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"><AlertCircle className="size-4" />Published stories are temporarily unavailable.</p>}{status === 'ready' && visiblePosts.length === 0 && <p className="py-20 text-center text-sm text-muted">No published stories yet.</p>}{status === 'ready' && visiblePosts.length > 0 && <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visiblePosts.map((post) => <BlogCard key={post.id} post={post} href={`#${post.slug}`} />)}</div>}</div></section>{status === 'ready' && visiblePosts.length > 0 && <section className="border-t border-line bg-white px-5 py-20 sm:px-8 lg:px-10"><div className="mx-auto max-w-4xl space-y-14">{visiblePosts.map((post) => <article key={post.id} id={post.slug} className="scroll-mt-24 border-b border-line pb-12"><div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold"><span>{post.category}</span><span className="inline-flex items-center gap-1.5 text-muted"><CalendarDays className="size-3.5" />{post.publish_date}</span></div><h2 className="mt-3 text-3xl text-navy">{post.title}</h2><p className="mt-4 whitespace-pre-line text-base leading-8 text-ink">{post.content}</p></article>)}</div></section>}</main><Footer /></>
}

export default Blog
