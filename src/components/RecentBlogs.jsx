import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BlogCard from './BlogCard'
import SectionHeading from './SectionHeading'
import { fadeUp, staggerParent, viewport } from '../lib/motion'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function RecentBlogs() {
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    supabase.from('blogs').select('*').eq('status', 'published').order('publish_date', { ascending: false }).limit(3)
      .then(({ data, error }) => {
        if (error) {
          console.error('[RecentBlogs] Supabase fetch failed:', error.message, error)
          return
        }
        setRecentPosts(data || [])
      })
  }, [])

  return (
    <section id="recent-blogs" className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="From the Blog"
            title="Recent Stories"
            subtitle="Practical India travel guides — where to go, when to visit and how to make the trip smoother."
          />
          <Link
            to="/blog"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            View All Articles
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {recentPosts.map((post) => (
            <motion.div key={post.id} variants={fadeUp} className="h-full">
              <BlogCard post={{ ...post, image: post.cover_image_url, imageAlt: post.image_alt_text, date: post.publish_date }} href="/blog" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default RecentBlogs
