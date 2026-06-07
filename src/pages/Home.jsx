import Hero from '../components/home/Hero'
import MarqueeStrip from '../components/home/MarqueeStrip'
import Services from '../components/home/Services'
import Experience from '../components/home/Experience'
import Team from '../components/home/Team'
import Testimonials from '../components/home/Testimonials'
import BookingCTA from '../components/home/BookingCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Services />
      <Experience />
      <Team />
      <Testimonials />
      <BookingCTA />
    </>
  )
}
