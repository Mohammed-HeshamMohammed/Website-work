import { Nav } from "@/components/nav"
import { FAQContent } from "@/components/faq-content"
import { Footer } from "@/components/footer"

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="py-12">
        <div className="container">
          <h1 className="text-4xl font-bold text-[#03045e] mb-8">Frequently Asked Questions</h1>
          <FAQContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}

