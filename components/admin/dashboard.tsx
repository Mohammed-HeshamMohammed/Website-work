"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { FileText, Search, Package, Users, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { OrderDetails } from "./order-details"

// Sample data generator function
const generateData = (days: number) => {
  const data = []
  const today = new Date()
  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      orders: Math.floor(Math.random() * 30) + 10,
      revenue: Math.floor(Math.random() * 3000) + 1500,
    })
  }
  return data
}

const plans = [
  {
    name: "Basic Plan",
    pricePerRecord: 0.15,
    totalOrders: 245,
    activeOrders: 220,
    revenue: "$36,750",
    growth: "+12%",
    description: "Perfect for small to medium lists",
    features: ["Up to 10,000 records", "80-85% match rate", "Phone numbers & emails", "24/7 support"],
  },
  {
    name: "Premium Plan",
    pricePerRecord: 0.12,
    totalOrders: 312,
    activeOrders: 298,
    revenue: "$56,700",
    growth: "+18%",
    description: "Ideal for large volume skip tracing",
    features: ["Unlimited records", "Priority processing", "Advanced filtering", "Dedicated account manager"],
  },
]

const topCustomers = [
  {
    name: "John Anderson",
    image: "/placeholder.svg",
    totalSpent: 12450.0,
    ordersCount: 15,
    lastOrderStatus: "completed",
  },
  {
    name: "Sarah Williams",
    image: "/placeholder.svg",
    totalSpent: 8920.0,
    ordersCount: 12,
    lastOrderStatus: "processing",
  },
  {
    name: "Michael Chen",
    image: "/placeholder.svg",
    totalSpent: 7840.0,
    ordersCount: 10,
    lastOrderStatus: "completed",
  },
]

const topCounties = [
  { name: "Los Angeles County, CA", orders: 245, revenue: "$32,450" },
  { name: "Cook County, IL", orders: 189, revenue: "$24,570" },
  { name: "Harris County, TX", orders: 156, revenue: "$20,280" },
  { name: "Miami-Dade County, FL", orders: 134, revenue: "$17,420" },
]

const planDistribution = {
  premium: 45,
  basic: 35,
  trial: 20,
}

const satisfactionData = {
  percentage: 92,
  totalReviews: 1250,
  averageRating: 4.6,
}

// Sample data for recent orders
const recentOrders = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD-2024-${String(i + 1).padStart(3, "0")}`,
  customerName: `Customer ${i + 1}`,
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  amount: `$${(Math.random() * 1000 + 100).toFixed(2)}`,
  status: ["Processing", "Pending", "Completed"][Math.floor(Math.random() * 3)],
  completionPercentage: Math.floor(Math.random() * 100),
  hasUploadedFile: Math.random() > 0.5,
}))

const overviewCards = [
  {
    title: "Total Revenue",
    value: "$205,450",
    change: "+14%",
    icon: DollarSign,
    color: "text-[#00b4d8]",
  },
  {
    title: "Active Users",
    value: "447",
    change: "+7%",
    icon: Users,
    color: "text-[#0077b6]",
  },
  {
    title: "Total Plans",
    value: "3",
    change: "0%",
    icon: Package,
    color: "text-[#03045e]",
  },
]

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("7d")
  const [chartData, setChartData] = useState(generateData(7))
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const days = dateRange === "7d" ? 7 : dateRange === "1m" ? 30 : dateRange === "3m" ? 90 : 365
    setChartData(generateData(days))
  }, [dateRange])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="p-6 space-y-6"
      >
        {/* Overview Cards */}
        <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-3">
          {overviewCards.map((card, index) => (
            <motion.div key={card.title} variants={itemVariants} custom={index}>
              <Card className="p-6 bg-white border border-[#caf0f8] hover:border-[#90e0ef] transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#0077b6]">{card.title}</p>
                    <h3 className="text-2xl font-bold text-[#03045e] mt-1">{card.value}</h3>
                  </div>
                  <div className={`rounded-full p-3 bg-opacity-10 ${card.color} bg-current`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
                <p className="text-sm text-[#00b4d8] mt-4">{card.change} from last month</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Plans Overview */}
        <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} variants={itemVariants} custom={index}>
              <Card className="p-6 bg-white border border-[#caf0f8] hover:border-[#90e0ef] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#03045e]">{plan.name}</h3>
                    <p className="text-sm text-[#0077b6]">${plan.pricePerRecord} per record</p>
                  </div>
                  <Badge variant="secondary" className="bg-[#caf0f8] text-[#03045e]">
                    {plan.growth}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#0077b6]">Total Orders</p>
                    <p className="text-2xl font-bold text-[#03045e]">{plan.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#0077b6]">Active Orders</p>
                    <p className="text-lg text-[#03045e]">{plan.activeOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#0077b6]">Revenue</p>
                    <p className="text-lg text-[#03045e]">{plan.revenue}</p>
                  </div>
                  <Progress value={(plan.activeOrders / plan.totalOrders) * 100} className="bg-[#caf0f8]" />
                  <div className="text-sm text-[#0077b6]">
                    <p className="font-medium mb-2">Features:</p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <motion.div variants={containerVariants} className="space-y-6">
            {/* Daily Orders Chart */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-white border border-[#caf0f8]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-lg font-semibold text-[#03045e]">Daily Orders Summary</h2>
                    <p className="text-sm text-[#0077b6]">Revenue from orders</p>
                  </div>
                  <Tabs value={dateRange} onValueChange={setDateRange} className="w-[400px]">
                    <TabsList className="bg-[#caf0f8]">
                      <TabsTrigger value="7d">7D</TabsTrigger>
                      <TabsTrigger value="1m">1M</TabsTrigger>
                      <TabsTrigger value="3m">3M</TabsTrigger>
                      <TabsTrigger value="1y">1Y</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#caf0f8" />
                      <XAxis
                        dataKey="date"
                        stroke="#03045e"
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis stroke="#03045e" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #90e0ef" }}
                        labelStyle={{ color: "#03045e" }}
                        formatter={(value: number) => [`$${value}`, "Revenue"]}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#0077b6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>

            {/* Plan Distribution and Satisfaction */}
            <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2">
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-white border border-[#caf0f8] h-full">
                  <h3 className="text-lg font-semibold text-[#03045e] mb-4">Plan Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-[#0077b6] mb-2">
                        <span>Premium Plan</span>
                        <span>{planDistribution.premium}%</span>
                      </div>
                      <Progress value={planDistribution.premium} className="bg-[#0077b6]/20" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-[#0077b6] mb-2">
                        <span>Basic Plan</span>
                        <span>{planDistribution.basic}%</span>
                      </div>
                      <Progress value={planDistribution.basic} className="bg-[#0077b6]/20" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-[#0077b6] mb-2">
                        <span>Trial Users</span>
                        <span>{planDistribution.trial}%</span>
                      </div>
                      <Progress value={planDistribution.trial} className="bg-[#0077b6]/20" />
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-white border border-[#caf0f8] h-full">
                  <h3 className="text-lg font-semibold text-[#03045e] mb-4">Customer Satisfaction</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <motion.svg
                        className="w-32 h-32"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <circle
                          className="text-[#0077b6]"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="58"
                          cx="64"
                          cy="64"
                        />
                        <motion.circle
                          className="text-[#00b4d8]"
                          strokeWidth="8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="58"
                          cx="64"
                          cy="64"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: satisfactionData.percentage / 100 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          transform="rotate(-90 64 64)"
                        />
                      </motion.svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-center"
                        >
                          <span className="text-2xl font-bold text-[#03045e]">{satisfactionData.percentage}%</span>
                          <span className="block text-xs text-[#0077b6]">Satisfied</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-[#0077b6]">
                    <p className="text-sm">Based on {satisfactionData.totalReviews} reviews</p>
                    <p className="text-sm">Average rating: {satisfactionData.averageRating}/5</p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-white border border-[#caf0f8]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#03045e]">Top Counties</h3>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/orders">View All</Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {topCounties.map((county, index) => (
                    <motion.div
                      key={county.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0077b6]/20 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#0077b6]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#03045e]">{county.name}</p>
                          <p className="text-sm text-[#0077b6]">{county.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right text-[#03045e]">
                        <p className="font-medium">{county.revenue}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Orders with Order Details */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-white border border-[#caf0f8]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#03045e]">Recent Orders</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0077b6]" />
                    <Input
                      className="pl-10 border-[#90e0ef] focus:ring-[#00b4d8]"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#90e0ef] scrollbar-track-transparent">
                  <AnimatePresence>
                    {recentOrders
                      .filter(
                        (order) =>
                          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((order) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="cursor-pointer"
                          onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        >
                          <div
                            className={`p-4 rounded-lg border border-[#caf0f8] hover:border-[#90e0ef] transition-colors ${
                              selectedOrder === order.id ? "border-[#00b4d8]" : ""
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium text-[#03045e]">{order.id}</h4>
                                <p className="text-sm text-[#0077b6]">{order.customerName}</p>
                              </div>
                              <Badge
                                variant={order.status === "Completed" ? "default" : "secondary"}
                                className={order.status === "Completed" ? "bg-[#00b4d8]" : "bg-[#90e0ef]"}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm text-[#0077b6]">
                              <span>{order.date}</span>
                              <span>{order.amount}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
                <Button
                  className="w-full mt-4 border-[#90e0ef] text-[#03045e] hover:bg-[#caf0f8]"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/orders">View All Orders</Link>
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Selected Order Details */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <Card className="p-6 bg-white border border-[#caf0f8]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#03045e]">Order Details</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                    className="text-[#03045e] hover:text-[#0077b6]"
                  >
                    Close
                  </Button>
                </div>
                {selectedOrder && <OrderDetails orderId={""} orderDate={""} {...recentOrders.find((order) => order.id === selectedOrder)!} />}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

