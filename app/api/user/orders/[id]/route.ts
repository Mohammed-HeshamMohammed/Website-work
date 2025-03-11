import { NextResponse } from "next/server"
import { getUserData } from "@/lib/user-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userData = await getUserData()
    const order = userData.orders.find((o) => o.id === params.id)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // If preview parameter is present, return preview data
    const url = new URL(request.url)
    if (url.searchParams.get("preview")) {
      // In a real app, you would read and parse the actual file
      // For now, return sample data
      const previewData = [
        { address: "123 Main St", owner: "John Doe", phone: "555-0123" },
        { address: "456 Oak Ave", owner: "Jane Smith", phone: "555-0456" },
        // ... more rows
      ]

      return NextResponse.json({ data: previewData })
    }

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

