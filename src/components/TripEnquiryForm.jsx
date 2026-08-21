import { useState } from 'react'
import { Send } from 'lucide-react'
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

function TripEnquiryForm({ initialDestination = '', initialMessage = '' }) {
  const [formData, setFormData] = useState({
    ...emptyForm,
    destination: initialDestination,
    message: initialMessage,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState('')

  const updateField = (field, value) => {
    setIsSubmitted(false)
    setSubmissionError('')
    setErrors((currentErrors) => ({ ...currentErrors, [field]: '' }))
    setFormData((currentData) => ({ ...currentData, [field]: value }))
  }

  const getToday = () => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${today.getFullYear()}-${month}-${day}`
  }

  const validateForm = () => {
    const nextErrors = {}
    const trimmedName = formData.fullName.trim()
    const trimmedDestination = formData.destination.trim()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneDigits = formData.phone.replace(/\D/g, '')
    const travelers = Number(formData.travelers)
    const selectedDate = new Date(`${formData.travelDate}T00:00:00`)

    if (trimmedName.length < 2) nextErrors.fullName = 'Enter your full name.'
    if (!emailPattern.test(formData.email.trim())) nextErrors.email = 'Enter a valid email address.'
    if (phoneDigits.length < 9 || phoneDigits.length > 15) nextErrors.phone = 'Enter a valid phone number with 9 to 15 digits.'
    if (!trimmedDestination) nextErrors.destination = 'Enter a destination.'
    if (!Number.isInteger(travelers) || travelers < 1 || travelers > 50) nextErrors.travelers = 'Enter a whole number between 1 and 50.'
    if (!formData.travelDate || Number.isNaN(selectedDate.getTime()) || formData.travelDate < getToday()) {
      nextErrors.travelDate = 'Choose today or a future travel date.'
    }
    if (!formData.budget) nextErrors.budget = 'Select an approximate budget.'

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setIsSubmitted(false)
      return
    }

    setErrors({})
    setSubmissionError('')
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('trip_enquiries').insert({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        destination: formData.destination.trim(),
        travelers: Number(formData.travelers),
        travel_date: formData.travelDate,
        budget: formData.budget,
        message: formData.message.trim(),
      })

      if (error) throw error
    } catch (error) {
      console.error('Trip enquiry submission failed:', error)
      setIsSubmitting(false)
      setSubmissionError('We could not send your enquiry right now. Please try again.')
      return
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData(emptyForm)
    window.alert('Your enquiry was added successfully.')
  }

  const resetForm = () => {
    setFormData(emptyForm)
    setErrors({})
    setSubmissionError('')
    setIsSubmitted(false)
    setIsSubmitting(false)
  }

  const fieldClassName = 'mt-2 h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10'
  const labelClassName = 'text-sm font-semibold text-[var(--foreground)]'
  const errorClassName = 'mt-1 text-sm font-medium text-red-700'

  return (
    <section id="enquiry" className="bg-[var(--background)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">Start planning</p>
          <h2 className="text-[var(--foreground)]">Plan a Journey That Feels Like Yours</h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            Share a few details and our travel team will help shape your next trip.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
          {isSubmitted && (
            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-3 text-sm font-medium text-[var(--primary)] sm:flex-row sm:items-center sm:justify-between" role="status">
              <span>Thanks for your enquiry. Our travel team will be in touch soon.</span>
              <div className="flex flex-wrap gap-3">
                <button type="button" className="font-semibold underline underline-offset-4" onClick={resetForm}>
                  Start another enquiry
                </button>
                <button type="button" className="font-semibold underline underline-offset-4" onClick={() => setIsSubmitted(false)}>
                  Close
                </button>
              </div>
            </div>
          )}

          {submissionError && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
              {submissionError}
            </div>
          )}

          <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
            <label className={labelClassName}>
              Full Name
              <input
                className={fieldClassName}
                type="text"
                value={formData.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'full-name-error' : undefined}
                required
              />
              {errors.fullName && <span id="full-name-error" className={errorClassName} role="alert">{errors.fullName}</span>}
            </label>

            <label className={labelClassName}>
              Email
              <input
                className={fieldClassName}
                type="email"
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && <span id="email-error" className={errorClassName} role="alert">{errors.email}</span>}
            </label>

            <label className={labelClassName}>
              Phone
              <input
                className={fieldClassName}
                type="tel"
                value={formData.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                required
              />
              {errors.phone && <span id="phone-error" className={errorClassName} role="alert">{errors.phone}</span>}
            </label>

            <label className={labelClassName}>
              Destination
              <input
                className={fieldClassName}
                type="text"
                value={formData.destination}
                onChange={(event) => updateField('destination', event.target.value)}
                placeholder="Where would you like to go?"
                aria-invalid={Boolean(errors.destination)}
                aria-describedby={errors.destination ? 'destination-error' : undefined}
                required
              />
              {errors.destination && <span id="destination-error" className={errorClassName} role="alert">{errors.destination}</span>}
            </label>

            <label className={labelClassName}>
              Number of Travelers
              <input
                className={fieldClassName}
                type="number"
                min="1"
                value={formData.travelers}
                onChange={(event) => updateField('travelers', event.target.value)}
                placeholder="e.g. 2"
                aria-invalid={Boolean(errors.travelers)}
                aria-describedby={errors.travelers ? 'travelers-error' : undefined}
                required
              />
              {errors.travelers && <span id="travelers-error" className={errorClassName} role="alert">{errors.travelers}</span>}
            </label>

            <label className={labelClassName}>
              Preferred Travel Date
              <input
                className={fieldClassName}
                type="date"
                min={getToday()}
                value={formData.travelDate}
                onChange={(event) => updateField('travelDate', event.target.value)}
                aria-invalid={Boolean(errors.travelDate)}
                aria-describedby={errors.travelDate ? 'travel-date-error' : undefined}
                required
              />
              {errors.travelDate && <span id="travel-date-error" className={errorClassName} role="alert">{errors.travelDate}</span>}
            </label>

            <label className={labelClassName}>
              Budget
              <select
                className={fieldClassName}
                value={formData.budget}
                onChange={(event) => updateField('budget', event.target.value)}
                aria-invalid={Boolean(errors.budget)}
                aria-describedby={errors.budget ? 'budget-error' : undefined}
                required
              >
                <option value="">Select your budget</option>
                <option value="under-15000">Under ₹15,000 per person</option>
                <option value="15000-25000">₹15,000 - ₹25,000 per person</option>
                <option value="25000-40000">₹25,000 - ₹40,000 per person</option>
                <option value="above-40000">Above ₹40,000 per person</option>
              </select>
              {errors.budget && <span id="budget-error" className={errorClassName} role="alert">{errors.budget}</span>}
            </label>

            <label className={`${labelClassName} sm:col-span-2`}>
              Message
              <textarea
                className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                value={formData.message}
                onChange={(event) => updateField('message', event.target.value)}
                placeholder="Tell us about your travel plans"
                rows="4"
              />
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:w-auto"
              >
                <Send className="size-4" aria-hidden="true" />
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="ml-4 mt-3 text-sm font-semibold text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--primary)] sm:mt-0"
              >
                Reset form
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default TripEnquiryForm
