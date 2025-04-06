import { OrderForm } from "@/components/sections/order/order-form"


export default function OrderPage() {
  return (
    <div className="min-h-screen">

      <main className="py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-[#03045e] mb-8">Complete Your Order</h1>
          <OrderForm />
        </div>
      </main>
    </div>
  )
}

