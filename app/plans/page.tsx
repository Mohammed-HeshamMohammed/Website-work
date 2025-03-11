"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"

// Dynamically import PricingCards and disable SSR.
const PricingCards = dynamic(
  () => import("@/components/pricing-cards").then((mod) => mod.PricingCards),
  { ssr: false }
)

export default function PlansPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="py-20">
        <div className="container">
          <h1 className="text-4xl font-bold text-center text-[#03045e] mb-12">
            Choose Your Plan
          </h1>
          <PricingCards />
        </div>
      </main>
      <Footer />
    </div>
  )
}
