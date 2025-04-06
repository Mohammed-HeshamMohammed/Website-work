import { Nav } from "@/components/nav"
import { PrivacyContent } from "@/components/privacy-content"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <PrivacyContent />
      </main>
      <Footer />
    </div>
  )
}

