import { Nav } from "@/components/nav"
import { AdminOrders } from "@/components/admin/orders"
import { Footer } from "@/components/footer"

export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="container py-10">
        <h1 className="text-3xl font-bold text-[#03045e] mb-8">Order Management</h1>
        <AdminOrders />
      </main>
      <Footer />
    </div>
  )
}

