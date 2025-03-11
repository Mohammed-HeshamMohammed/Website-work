import { Nav } from "@/components/nav"
import { ContactContent } from "@/components/contact-content"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </div>
  )
}

