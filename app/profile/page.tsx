import { ProfileForm } from "@/components/sections/profile/profile-form"


export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <main className="py-12">
        <div className="container max-w-2xl">
          <h1 className="text-3xl font-bold text-[#03045e] mb-8">Profile Settings</h1>
          <ProfileForm />
        </div>
      </main>
    </div>
  )
}

