import { useEffect, useState } from 'react'
import { LogOut, Pencil, Save, Trash2, X } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const today = () => new Date().toISOString().slice(0, 10)

const emptyBlog = {
  title: '',
  cover_image_url: '',
  category: '',
  excerpt: '',
  content: '',
  publish_date: today(),
  status: 'draft',
}

// SEO-friendly slug generated automatically from the title.
const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const inputClass =
  'mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/10'
const textAreaClass =
  'mt-2 w-full rounded-xl border border-line bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/10'
const labelClass = 'block text-sm font-semibold text-navy'

function AdminBlog() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [authError, setAuthError] = useState('')

  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyBlog)
  const [editingId, setEditingId] = useState(null)
  const [coverError, setCoverError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPosts = async () => {
    const { data, error: queryError } = await supabase
      .from('blogs')
      .select('id, title, slug, category, cover_image_url, excerpt, content, publish_date, status')
      .order('publish_date', { ascending: false })
    if (queryError) setError(queryError.message)
    else setPosts(data || [])
  }

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setAuthLoading(false)
      if (data.session) loadPosts()
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      if (nextSession) loadPosts()
      else setPosts([])
    })
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const updateField = (field, value) => {
    if (field === 'cover_image_url') setCoverError(false)
    setForm((current) => ({ ...current, [field]: value }))
    setMessage('')
    setError('')
  }

  const resetForm = () => {
    setForm({ ...emptyBlog, publish_date: today() })
    setEditingId(null)
    setCoverError(false)
  }

  const editPost = (post) => {
    setForm({
      title: post.title,
      cover_image_url: post.cover_image_url,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      publish_date: post.publish_date,
      status: post.status,
    })
    setEditingId(post.id)
    setCoverError(false)
    setMessage('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const signIn = async (event) => {
    event.preventDefault()
    setAuthError('')
    const { error: signInError } = await supabase.auth.signInWithPassword(credentials)
    if (signInError) setAuthError(signInError.message)
  }

  const savePost = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    setSaving(true)

    const title = form.title.trim()
    const payload = {
      title,
      slug: slugify(title),
      category: form.category.trim(),
      cover_image_url: form.cover_image_url.trim(),
      image_alt_text: title, // alt text derived automatically from the title
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      publish_date: form.publish_date,
      status: form.status,
      published_at: form.status === 'published' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }

    const request = editingId
      ? supabase.from('blogs').update(payload).eq('id', editingId)
      : supabase.from('blogs').insert(payload)
    const { error: saveError } = await request

    setSaving(false)
    if (saveError) {
      setError(
        saveError.code === '23505'
          ? 'A blog with a very similar title already exists — use a slightly different title.'
          : saveError.message,
      )
      return
    }
    setMessage(editingId ? 'Blog updated.' : 'Blog saved.')
    resetForm()
    loadPosts()
  }

  const deletePost = async (id) => {
    if (!window.confirm('Delete this blog permanently?')) return
    const { error: deleteError } = await supabase.from('blogs').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    if (editingId === id) resetForm()
    loadPosts()
  }

  const toggleStatus = async (post) => {
    const status = post.status === 'published' ? 'draft' : 'published'
    const { error: updateError } = await supabase
      .from('blogs')
      .update({
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', post.id)
    if (updateError) setError(updateError.message)
    else loadPosts()
  }

  if (authLoading) {
    return <div className="grid min-h-screen place-items-center bg-cream text-sm text-navy">Loading admin…</div>
  }

  if (!session) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream px-5">
        <form onSubmit={signIn} className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Rudra admin</p>
          <h1 className="mt-3 font-serif text-3xl text-navy">Blog Manager</h1>
          <p className="mt-3 text-sm text-muted">Sign in with an admin account to manage stories.</p>
          <label className="mt-6 block text-sm font-semibold text-navy">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={credentials.email}
              onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
              className={inputClass}
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy">
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
              className={inputClass}
            />
          </label>
          {authError && <p className="mt-4 text-sm text-red-600">{authError}</p>}
          <button className="mt-6 w-full rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-soft">
            Sign in
          </button>
        </form>
      </main>
    )
  }

  const coverUrl = form.cover_image_url.trim()
  const slugPreview = slugify(form.title) || 'blog-title'
  const knownCategories = [...new Set(posts.map((post) => post.category).filter(Boolean))]

  return (
    <main className="min-h-screen bg-cream px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Rudra admin</p>
            <h1 className="mt-2 font-serif text-4xl text-navy">Blog Manager</h1>
          </div>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-navy transition-colors hover:text-gold-deep"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </button>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <form onSubmit={savePost} className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-serif text-2xl text-navy">{editingId ? 'Edit blog' : 'New blog'}</h2>
            <p className="mt-1 text-sm text-muted">Published blogs appear on the public Blog page, newest first. Drafts stay hidden.</p>

            <div className="mt-6 space-y-5">
              <label className={labelClass}>
                Blog Title
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(event) => updateField('title', event.target.value)}
                  placeholder="Kashmir Travel Guide"
                  className={inputClass}
                />
                <span className="mt-1.5 block text-xs text-muted">Web address: /blog#{slugPreview}</span>
              </label>

              <label className={labelClass}>
                Cover Image URL
                <input
                  required
                  type="url"
                  value={form.cover_image_url}
                  onChange={(event) => updateField('cover_image_url', event.target.value)}
                  placeholder="https://images.unsplash.com/photo-…"
                  className={inputClass}
                />
              </label>

              {coverUrl && (
                coverError ? (
                  <p className="text-xs text-red-600">Could not load this image URL — check the link.</p>
                ) : (
                  <img
                    src={coverUrl}
                    alt="Cover preview"
                    onError={() => setCoverError(true)}
                    className="aspect-[16/9] w-full rounded-xl border border-line object-cover"
                  />
                )
              )}

              <label className={labelClass}>
                Category
                <input
                  required
                  type="text"
                  list="blog-categories"
                  value={form.category}
                  onChange={(event) => updateField('category', event.target.value)}
                  placeholder="Mountains"
                  className={inputClass}
                />
                <datalist id="blog-categories">
                  {knownCategories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </label>

              <label className={labelClass}>
                Short Description
                <textarea
                  required
                  rows="3"
                  value={form.excerpt}
                  onChange={(event) => updateField('excerpt', event.target.value)}
                  placeholder="One or two sentences shown on the blog card and used as the page description."
                  className={textAreaClass}
                />
              </label>

              <label className={labelClass}>
                Blog Content
                <textarea
                  required
                  rows="12"
                  value={form.content}
                  onChange={(event) => updateField('content', event.target.value)}
                  placeholder="Write the full story here. Blank lines create paragraphs."
                  className={textAreaClass}
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Publish Date
                  <input
                    required
                    type="date"
                    value={form.publish_date}
                    onChange={(event) => updateField('publish_date', event.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Status
                  <select
                    value={form.status}
                    onChange={(event) => updateField('status', event.target.value)}
                    className={inputClass}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>
              </div>
            </div>

            {error && <p className="mt-5 text-sm font-medium text-red-600">{error}</p>}
            {message && <p className="mt-5 text-sm font-semibold text-green-700">{message}</p>}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="size-4" aria-hidden="true" />
                {saving ? 'Saving…' : editingId ? 'Update blog' : 'Save blog'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy"
                >
                  <X className="size-4" aria-hidden="true" />
                  Cancel
                </button>
              )}
            </div>
          </form>

          <aside className="space-y-4">
            <h2 className="font-serif text-2xl text-navy">All blogs</h2>
            {posts.length === 0 && <p className="text-sm text-muted">No blogs yet. Create your first one.</p>}
            {posts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-line bg-white p-4 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider ${
                        post.status === 'published' ? 'bg-gold/20 text-gold-deep' : 'bg-navy/10 text-navy'
                      }`}
                    >
                      {post.status}
                    </span>
                    <h3 className="mt-1.5 font-serif text-lg text-navy">{post.title}</h3>
                    <p className="mt-0.5 text-xs text-muted">
                      {post.category} · {post.publish_date}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editPost(post)}
                    className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
                  >
                    <Pencil className="size-3" aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleStatus(post)}
                    className="rounded-full border border-gold px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-gold/10"
                  >
                    {post.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    onClick={() => deletePost(post.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="size-3" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </aside>
        </div>
      </div>
    </main>
  )
}

export default AdminBlog
