import { readFile, writeFile } from "fs/promises"
import { join } from "path"
import { encrypt, decrypt } from "./encryption"
import type { UserData } from "./types/user"

const DATA_FILE = join(process.cwd(), "data", "users.json")

export async function getUserData(userId?: string): Promise<UserData> {
  try {
    const data = await readFile(DATA_FILE, "utf-8")
    const decrypted = await decrypt(data)
    const users = JSON.parse(decrypted)

    if (userId) {
      const userData = users[userId]
      if (!userData) throw new Error("User not found")
      return userData
    }

    return users
  } catch (error) {
    console.error("Error reading user data:", error)
    return {
      profile: {
        id: "default",
        email: "",
        name: "",
        role: "user",
        satisfaction: 0,
        totalOrders: 0,
      },
      orders: [],
    }
  }
}

export async function updateUserData(userId: string, data: Partial<UserData>): Promise<void> {
  try {
    const users = await getUserData()
    users[userId] = { ...users[userId], ...data }

    const encrypted = await encrypt(JSON.stringify(users))
    await writeFile(DATA_FILE, encrypted)
  } catch (error) {
    console.error("Error updating user data:", error)
    throw error
  }
}

export async function updateUserSatisfaction(userId: string, satisfaction: number): Promise<void> {
  const userData = await getUserData(userId)
  userData.profile.satisfaction = satisfaction
  await updateUserData(userId, userData)
}

