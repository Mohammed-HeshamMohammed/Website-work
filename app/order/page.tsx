import { OrderForm } from "@/components/order-form"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function OrderPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-[#03045e] mb-8">Complete Your Order</h1>
          <OrderForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

