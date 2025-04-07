
import { UserDashboard } from "@/components/user/dashboard"
import { getUserData } from "@/lib/user-data"

export default async function DashboardPage() {
  const userData = await getUserData()

  return (
    <div className="min-h-screen bg-white">

      <main>
        <UserDashboard user={userData.profile} orders={userData.orders} />
      </main>
    </div>
  )
}

