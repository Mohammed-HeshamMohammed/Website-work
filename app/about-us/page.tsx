"use client"

import { AboutHero } from "@/components/sections/about/about-hero"
import { AboutStats } from "@/components/sections/about/about-stats"
import { AboutStory } from "@/components/sections/about/about-story"
import { ProcessFlow } from "@/components/sections/about/process-flow"
import { AboutValues } from "@/components/sections/about/about-values"
import { AboutTeam } from "@/components/sections/about/about-team"
import { AboutProcess } from "@/components/sections/about/process"
import { ParallaxProvider } from "react-scroll-parallax"
import { CustomerSegments } from "@/components/sections/about/customer-segments"

export default function AboutPage() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen">
        <main>
          <AboutHero />
          <AboutStats />
          <AboutStory />
          <ProcessFlow />
          <CustomerSegments />
          <AboutProcess />
          <AboutValues />
          <AboutTeam />
        </main>
      </div>
    </ParallaxProvider>
  )
}
