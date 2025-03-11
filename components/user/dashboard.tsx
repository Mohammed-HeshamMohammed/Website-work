"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, Star, MapPin, Package, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserProfile, Order } from "@/lib/types/user"

interface UserDashboardProps {
  user: UserProfile
  orders: Order[]
}

export function UserDashboard({ user, orders }: UserDashboardProps) {
  const [satisfaction, setSatisfaction] = useState(user.satisfaction || 0)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [previewData, setPreviewData] = useState<any[] | null>(null)

  // Calculate user statistics
  const totalOrders = orders.length
  const completedOrders = orders.filter((o) => o.status === "completed").length
  const totalRecords = orders.reduce((acc, order) => acc + order.records, 0)
  const totalSpent = orders.reduce((acc, order) => acc + order.amount, 0)

  // Get most ordered counties
  const countyFrequency = orders.reduce(
    (acc, order) => {
      order.counties.forEach((county) => {
        acc[county] = (acc[county] || 0) + 1
      })
      return acc
    },
    {} as Record<string, number>,
  )

  const topCounties = Object.entries(countyFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const handleSatisfactionChange = async (newValue: number) => {
    setSatisfaction(newValue)
    // Here you would typically make an API call to update the user's satisfaction
  }

  const handleFilePreview = async (order: Order) => {
    setSelectedOrder(order)
    // Here you would typically fetch and parse the CSV/Excel file
    // For now, we'll simulate some data
    setPreviewData([
      { address: "123 Main St", owner: "John Doe", phone: "555-0123" },
      { address: "456 Oak Ave", owner: "Jane Smith", phone: "555-0456" },
      // ... more rows
    ])
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 md:grid-cols-4"
        >
          {/* Stats Cards */}
          <Card className="p-6 bg-white border border-[#caf0f8] hover:border-[#90e0ef] transition-colors">
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-[#00B4D8]" />
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-[#03045e]">{totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-[#caf0f8] hover:border-[#90e0ef] transition-colors">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-[#00B4D8]" />
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-[#03045e]">
                  {Math.round((completedOrders / totalOrders) * 100)}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-[#caf0f8] hover:border-[#90e0ef] transition-colors">
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 text-[#00B4D8]" />
              <div>
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-[#03045e]">{totalRecords.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-[#caf0f8] hover:border-[#90e0ef] transition-colors">
            <div className="flex items-center gap-4">
              <Star className="w-8 h-8 text-[#00B4D8]" />
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-[#03045e]">${totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid gap-6 mt-6 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Recent Orders */}
            <Card className="p-6 bg-white border border-[#caf0f8]">
              <h2 className="text-xl font-bold text-[#03045e] mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-800 hover:border-[#00B4D8]/40 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-[#03045e]">{order.id}</p>
                      <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#03045e]">${order.amount}</p>
                      <p className="text-sm text-gray-600">{order.records} records</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#00B4D8]"
                        onClick={() => handleFilePreview(order)}
                      >
                        Preview
                      </Button>
                      {order.fileUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#00B4D8]"
                          onClick={() => window.open(order.fileUrl)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* File Preview */}
            {selectedOrder && previewData && (
              <Card className="p-6 bg-white border border-[#caf0f8]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#03045e]">File Preview: {selectedOrder.fileName}</h2>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                    Close
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        {Object.keys(previewData[0]).map((header) => (
                          <th key={header} className="text-left p-2 border-b border-gray-800">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((cell: any, j) => (
                            <td key={j} className="p-2 border-b border-gray-800">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Satisfaction Rating */}
            <Card className="p-6 bg-white border border-[#caf0f8]">
              <h2 className="text-xl font-bold text-[#03045e] mb-4">My Satisfaction</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#03045e]">{satisfaction}%</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleSatisfactionChange(star * 20)}
                        className={`text-2xl ${star * 20 <= satisfaction ? "text-[#00B4D8]" : "text-gray-600"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <Progress value={satisfaction} className="h-2" />
              </div>
            </Card>

            {/* Most Ordered Counties */}
            <Card className="p-6 bg-white border border-[#caf0f8]">
              <h2 className="text-xl font-bold text-[#03045e] mb-4">Most Ordered Counties</h2>
              <div className="space-y-4">
                {topCounties.map(([county, count]) => (
                  <div key={county} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#00B4D8]" />
                      <span className="text-[#03045e]">{county}</span>
                    </div>
                    <span className="text-[#00B4D8]">{count} orders</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

