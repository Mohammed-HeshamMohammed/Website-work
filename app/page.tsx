'use client'

import { Hero } from "@/components/sections/home/hero"
import { InfoGraphic } from "@/components/sections/home/info-graphic"
import { TestimonialSlider } from "@/components/sections/home/testimonial-slider"
import { FAQ } from "@/components/sections/home/faq"
import { FeatureSlider }  from "@/components/sections/home/Feature-Silder"

import { ServiceOverview } from "@/components/sections/about/service-overview"
import { AboutCTA } from "@/components/sections/home/about-cta"
import dynamic from "next/dynamic"
import {} from "@/components/sections/home/about-cta"
const PricingCards = dynamic(
  () => import("@/components/sections/plans/pricing-cards").then((mod) => mod.PricingCards),
  { ssr: false }
)

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <TestimonialSlider />
        <InfoGraphic />
        <ServiceOverview />
        <FeatureSlider />
        <PricingCards />
        <FAQ />
        <AboutCTA />
      </main>
    </div>
  )
}
