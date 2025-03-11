export interface UserProfile {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  image?: string
  satisfaction?: number
  totalOrders?: number
  lastOrderDate?: string
  favoriteCounties?: string[]
}

export interface Order {
  id: string
  userId: string
  date: string
  status: "pending" | "processing" | "completed"
  amount: number
  fileUrl?: string
  fileName?: string
  counties: string[]
  records: number
}

export interface UserData {
  profile: UserProfile
  orders: Order[]
}

