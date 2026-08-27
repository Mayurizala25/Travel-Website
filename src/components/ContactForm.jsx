import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { fadeUp, staggerParent, viewport } from '../lib/motion'
import { supabase } from '../lib/supabaseClient'

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  travelers: '',
  travelDate: '',
  budget: '',
  message: '',
}

const budgetOptions = [
  { value: 'under-15000', label: 'Under ₹15,000 per person' },
  { value: '15000-25000', label: '₹15,000 – ₹25,000 per person' },
  { value: '25000-40000', label: '₹25,000 – ₹40,000 per person' },
  { value: 'above-40000', label: 'Above ₹40,000 per person' },
]

const contactChips = [
  { icon: Phone, label: '+91 85301 65142', href: 'tel:+918530165142' },
  { icon: MessageCircle, label: 'Chat on WhatsApp', href: 'https://wa.me/918530165142' },
  { icon: Mail, label: 'tour@virtualrudra.com', href: 'mailto:tour@virtualrudra.com' },
  { icon: MapPin, label: '7, Harmony Hub, Rajkot', href: null },
]

function getToday() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function ContactForm({ initialDestination = '', initialMessage = '' }) {
  const [form, setForm] = useState({ ...emptyForm, destination: initialDestination, message: initialMessage })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const update = (field, value) => {
    if (status === 'success' || status === 'error') setStatus('idle')
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const next = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneDigits = form.phone.replace(/\D/g, '')
    const travelers = Number(form.travelers)

    if (form.fullName.trim().length < 2) next.fullName = 'Enter your full name.'
    if (!emailPattern.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (phoneDigits.length < 9 || phoneDigits.length > 15) next.phone = 'Enter a valid phone number.'
    if (!form.destination.trim()) next.destination = 'Where would you like to go?'
    if (!Number.isInteger(travelers) || travelers < 1 || travelers > 50)
      next.travelers = 'Enter a whole number between 1 and 50.'
    if (!form.travelDate || form.travelDate < getToday()) next.travelDate = 'Choose today or a future date.'
    if (!form.budget) next.budget = 'Select an approximate budget.'
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setErrorMessage('')
    setStatus('submitting')

    try {
      const { error } = await supabase.from('trip_enquiries').insert({
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        destination: form.destination.trim(),
        travelers: Number(form.travelers),
        travel_date: form.travelDate,
        budget: form.budget,
        message: form.message.trim(),
      })
      if (error) throw error
    } catch (error) {
      console.error('Trip enquiry submission failed:', error)
      setErrorMessage(error?.message || 'We could not send your enquiry right now. Please try again.')
      setStatus('error')
      return
    }

    setForm(emptyForm)
    setStatus('success')
  }

  const resetForm = () => {
    setForm(emptyForm)
    setErrors({})
    setErrorMessage('')
    setStatus('idle')
  }

  const fieldClass =
    'mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-navy focus:ring-2 focus:ring-navy/10'
  const labelClass = 'block text-sm font-semibold text-navy'
  const errorClass = 'mt-1 block text-sm font-medium text-red-600'

  return (
    <section id="enquiry" className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Start Planning"
            title="Plan a journey that feels like yours"
            subtitle="Share a few details and our travel team will help shape your next trip — usually within one working day."
          />

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-8 space-y-3"
          >
            {contactChips.map(({ icon: Icon, label, href }) => {
              const inner = (
                <>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {label}
                </>
              )
              return (
                <motion.li key={label} variants={fadeUp}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-gold-deep"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-sm font-medium text-ink">{inner}</span>
                  )}
                </motion.li>
              )
            })}
          </motion.ul>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8"
        >
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role="status"
                className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <span>
                  Thanks for your enquiry — our travel team will be in touch soon.{' '}
                  <button type="button" onClick={resetForm} className="font-semibold underline underline-offset-2">
                    Send another
                  </button>
                </span>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
            <label className={labelClass}>
              Full Name
              <input
                className={fieldClass}
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.fullName)}
              />
              {errors.fullName && <span className={errorClass}>{errors.fullName}</span>}
            </label>

            <label className={labelClass}>
              Email
              <input
                className={fieldClass}
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <span className={errorClass}>{errors.email}</span>}
            </label>

            <label className={labelClass}>
              Phone
              <input
                className={fieldClass}
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+91 98765 43210"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <span className={errorClass}>{errors.phone}</span>}
            </label>

            <label className={labelClass}>
              Destination
              <input
                className={fieldClass}
                type="text"
                value={form.destination}
                onChange={(e) => update('destination', e.target.value)}
                placeholder="Where would you like to go?"
                aria-invalid={Boolean(errors.destination)}
              />
              {errors.destination && <span className={errorClass}>{errors.destination}</span>}
            </label>

            <label className={labelClass}>
              Travelers
              <input
                className={fieldClass}
                type="number"
                min="1"
                value={form.travelers}
                onChange={(e) => update('travelers', e.target.value)}
                placeholder="e.g. 2"
                aria-invalid={Boolean(errors.travelers)}
              />
              {errors.travelers && <span className={errorClass}>{errors.travelers}</span>}
            </label>

            <label className={labelClass}>
              Travel Date
              <input
                className={`${fieldClass} [color-scheme:light]`}
                type="date"
                min={getToday()}
                value={form.travelDate}
                onChange={(e) => update('travelDate', e.target.value)}
                aria-invalid={Boolean(errors.travelDate)}
              />
              {errors.travelDate && <span className={errorClass}>{errors.travelDate}</span>}
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              Budget
              <select
                className={fieldClass}
                value={form.budget}
                onChange={(e) => update('budget', e.target.value)}
                aria-invalid={Boolean(errors.budget)}
              >
                <option value="">Select your budget</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.budget && <span className={errorClass}>{errors.budget}</span>}
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              Message
              <textarea
                className="mt-2 min-h-32 w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-navy focus:ring-2 focus:ring-navy/10"
                rows="4"
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Tell us about your travel plans"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send className="size-4" aria-hidden="true" />
                {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-semibold text-muted underline underline-offset-4 transition-colors hover:text-navy"
              >
                Reset
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm
