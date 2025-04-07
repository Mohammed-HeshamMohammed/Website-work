
import { AdminDashboard } from "@/components/admin/dashboard"


export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#ffffff]">

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, Admin</p>
        </div>
        <AdminDashboard />
      </main>

    </div>
  )
}
