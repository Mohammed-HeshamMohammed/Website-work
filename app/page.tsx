import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { InfoGraphic } from "@/components/info-graphic"
import { TestimonialSlider } from "@/components/testimonial-slider"
import { ServiceOverview } from "@/components/service-overview"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { CustomerSegments } from "@/components/customer-segments"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <InfoGraphic />
        <TestimonialSlider />
        <ServiceOverview />
        <CustomerSegments />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

