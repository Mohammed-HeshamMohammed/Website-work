"use client"

import { Nav } from "@/components/nav"
import { AboutHero } from "@/components/about-hero"
import { AboutStats } from "@/components/about-stats"
import { AboutStory } from "@/components/about-story"
import { AboutProcess } from "@/components/about-process"
import { ProcessFlow } from "@/components/process-flow"
import { GlobalProcess } from "@/components/global-process"
import { AboutValues } from "@/components/about-values"
import { AboutTeam } from "@/components/about-team"
import { AboutCTA } from "@/components/about-cta"
import { Footer } from "@/components/footer"
import { ParallaxProvider } from "react-scroll-parallax"

export default function AboutPage() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen">
        <Nav />
        <main>
          <AboutHero />
          <AboutStats />
          <AboutStory />
          <ProcessFlow />
          <GlobalProcess />
          <AboutProcess />
          <AboutValues />
          <AboutTeam />
          <AboutCTA />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  )
}
