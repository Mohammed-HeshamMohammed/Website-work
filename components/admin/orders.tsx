"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Download, Upload } from "lucide-react"

const orders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    date: "2024-02-08",
    paymentMethod: "Credit Card",
    paymentStatus: "Approved",
    orderStatus: "Processing",
    amount: "$150.00",
    hasUploadedFile: true,
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    date: "2024-02-07",
    paymentMethod: "PayPal",
    paymentStatus: "Pending",
    orderStatus: "Pending",
    amount: "$299.00",
    hasUploadedFile: false,
  },
]

export function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.date.includes(searchQuery),
  )

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-[#03045e] mb-8">Order Management</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#03045e]">Order ID</TableHead>
              <TableHead className="text-[#03045e]">Customer</TableHead>
              <TableHead className="text-[#03045e]">Date</TableHead>
              <TableHead className="text-[#03045e]">Amount</TableHead>
              <TableHead className="text-[#03045e]">Payment Status</TableHead>
              <TableHead className="text-[#03045e]">Order Status</TableHead>
              <TableHead className="text-[#03045e]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-[#03045e]">{order.id}</TableCell>
                <TableCell className="text-[#0077b6]">{order.customerName}</TableCell>
                <TableCell className="text-[#03045e]">{order.date}</TableCell>
                <TableCell className="text-[#03045e]">{order.amount}</TableCell>
                <TableCell>
                  <Badge variant={order.paymentStatus === "Approved" ? "default" : "secondary"}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.orderStatus === "Completed"
                        ? "default"
                        : order.orderStatus === "Processing"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {order.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {order.hasUploadedFile && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

