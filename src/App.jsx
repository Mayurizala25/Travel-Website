import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { tours } from './data/tours'
import Footer from './components/Footer'
import FeaturedTours from './components/FeaturedTours'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import PopularDestinations from './components/PopularDestinations'
import TravelCategories from './components/TravelCategories'
import TravelGuides from './components/TravelGuides'
import TripEnquiryForm from './components/TripEnquiryForm'
import Testimonials from './components/Testimonials'
import TravelCTA from './components/TravelCTA'
import WhyChooseUs from './components/WhyChooseUs'
import Tours from './pages/Tours'

function Home() {
  const [searchParams] = useSearchParams()
  const selectedTour = tours.find((tour) => tour.id === Number(searchParams.get('tourId')))
  const selectedDestination = selectedTour?.destination || searchParams.get('destination') || ''
  const selectedMessage = selectedTour ? `I am interested in the ${selectedTour.name} tour.` : ''

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedTours />
      <PopularDestinations />
      <TravelCategories />
      <WhyChooseUs />
      <TravelGuides />
      <Testimonials />
      <TravelCTA />
      <TripEnquiryForm initialDestination={selectedDestination} initialMessage={selectedMessage} />
      <Footer />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    document.title = location.pathname === '/tours' ? 'Explore Tours | Explore India' : 'Explore India | Trips & Tours'
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
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
