"use client"


import dynamic from "next/dynamic"

// Dynamically import PricingCards and disable SSR.
const PricingCards = dynamic(
  () => import("@/components/sections/plans/pricing-cards").then((mod) => mod.PricingCards),
  { ssr: false }
)

export default function PlansPage() {
  return (
    <div className="min-h-screen">
      <main className="py-20">
        <div className="container">
          <h1 className="text-4xl font-bold text-center text-[#03045e] mb-12">
            Choose Your Plan
          </h1>
          <PricingCards />
        </div>
      </main>
    </div>
  )
}
