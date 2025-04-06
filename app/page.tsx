'use client'

import { Hero } from "@/components/sections/home/hero"
import { InfoGraphic } from "@/components/sections/home/info-graphic"
import { TestimonialSlider } from "@/components/sections/home/testimonial-slider"
import { FAQ } from "@/components/sections/home/faq"
import { GlobalProcess } from "@/components/sections/home/global-process"
import { AboutProcess } from "@/components/sections/home/process"
import dynamic from "next/dynamic"

const PricingCards = dynamic(
  () => import("@/components/sections/plans/pricing-cards").then((mod) => mod.PricingCards),
  { ssr: false }
)

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <InfoGraphic />
        <TestimonialSlider />
        <AboutProcess />
        <GlobalProcess />
        <PricingCards />
        <FAQ />
      </main>
    </div>
  )
}
