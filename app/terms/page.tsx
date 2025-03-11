import { Nav } from "@/components/nav"
import { TermsContent } from "@/components/terms-content"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <TermsContent />
      </main>
      <Footer />
    </div>
  )
}

