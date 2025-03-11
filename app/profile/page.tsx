import { ProfileForm } from "@/components/profile/profile-form"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="py-12">
        <div className="container max-w-2xl">
          <h1 className="text-3xl font-bold text-[#03045e] mb-8">Profile Settings</h1>
          <ProfileForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

