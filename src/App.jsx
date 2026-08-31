import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { tours } from './data/tours'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PopularDestinations from './components/PopularDestinations'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import Services from './components/Services'
import FeaturedTrips from './components/FeaturedTrips'
import TravelStyles from './components/TravelStyles'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import ContactForm from './components/ContactForm'
import RecentBlogs from './components/RecentBlogs'
import Footer from './components/Footer'
import Tours from './pages/Tours'
import Blog from './pages/Blog'
import AdminBlog from './pages/AdminBlog'

function Home() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const selectedTour = tours.find((tour) => tour.id === Number(searchParams.get('tourId')))
  const selectedDestination = selectedTour?.destination || searchParams.get('destination') || ''
  const selectedMessage = selectedTour ? `I am interested in the ${selectedTour.name} tour.` : ''

  useEffect(() => {
    if (!location.hash) return undefined

    const targetId = location.hash.substring(1)
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.hash])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PopularDestinations />
        <About />
        <WhyChooseUs />
        <Services />
        <FeaturedTrips />
        <TravelStyles />
        <Testimonials />
        <FAQ />
        <RecentBlogs />
        <CTABanner />
        <ContactForm initialDestination={selectedDestination} initialMessage={selectedMessage} />
      </main>
      <Footer />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    document.title =
      location.pathname === '/tours'
        ? 'Explore Tours | Rudra Tour & Travelling'
        : location.pathname === '/blog'
          ? 'India Travel Guides | Rudra Tour & Travelling'
        : 'Rudra Tour & Travelling | Explore India'
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/admin/blog" element={<AdminBlog />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
