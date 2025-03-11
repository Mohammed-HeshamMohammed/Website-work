import { Nav } from "@/components/nav"
import { UserDashboard } from "@/components/user/dashboard"
import { Footer } from "@/components/footer"
import { getUserData } from "@/lib/user-data"

export default async function DashboardPage() {
  const userData = await getUserData()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <UserDashboard user={userData.profile} orders={userData.orders} />
      </main>
      <Footer />
    </div>
  )
}

