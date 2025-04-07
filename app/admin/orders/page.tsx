
import { AdminOrders } from "@/components/admin/orders"


export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen">
      <main className="container py-10">
        <h1 className="text-3xl font-bold text-[#03045e] mb-8">Order Management</h1>
        <AdminOrders />
      </main>
    </div>
  )
}

