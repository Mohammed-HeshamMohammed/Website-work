// order-confirmation-success.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  CheckCircle2, 
  Mail, 
  Home, 
  Package, 
  Truck, 
  ArrowRight, 
  Clock, 
  Calendar,
  FileText
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function OrderConfirmationSuccess({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    // In a real app, this would fetch from API using the order ID
    // Mock data for demonstration
    const mockOrderNumber = `ORD-${params.id}-${Date.now().toString().slice(-6)}`;
    setOrderNumber(mockOrderNumber);
    
    // Calculate estimated delivery (24 hours from now)
    const delivery = new Date();
    delivery.setHours(delivery.getHours() + 24);
    setEstimatedDelivery(delivery.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
    
    setEmail("john@example.com");
  }, [params.id]);

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Success Message Box */}
      <Card className="max-w-3xl mx-auto border-2 border-green-200 bg-green-50 p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          {/* Large checkmark in circle */}
          <div className="mb-6 relative">
            <div className="h-32 w-32 rounded-full bg-white border-4 border-green-500 flex items-center justify-center">
              <CheckCircle2 className="h-20 w-20 text-green-500" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Your order has been placed successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order. We're processing it right away.
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-md mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-bold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expected Delivery:</span>
              <span className="font-bold">{estimatedDelivery}</span>
            </div>
          </div>
          
          <Separator className="mb-6" />
          
          {/* Confirmation Email Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md w-full mb-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-blue-800 mb-1">
                  You will receive a confirmation email shortly
                </p>
                <p className="text-sm text-blue-700">
                  Sent to: {email}
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Please check your inbox (or spam folder) for confirmation details.
                </p>
              </div>
            </div>
          </div>
          
          {/* Order Tracking Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-md w-full mb-8">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-gray-800 mb-1">
                  Your order's status will be shared with you
                </p>
                <p className="text-sm text-gray-600">
                  Once processed through your email
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  You can keep an eye on your inbox for updates
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button 
              variant="outline" 
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => router.push("/orders")}
            >
              <FileText className="h-4 w-4" />
              View All Orders
            </Button>
            
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              onClick={() => router.push("/")}
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Order Process Steps */}
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-semibold text-center mb-6">What happens next?</h2>
        
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium mb-2">Confirmation Email</h3>
            <p className="text-sm text-gray-600">Check your inbox for order details and confirmation</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="font-medium mb-2">Processing</h3>
            <p className="text-sm text-gray-600">We'll prepare your order within 24 hours</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-2">Delivery</h3>
            <p className="text-sm text-gray-600">Your data will be delivered to your email</p>
          </div>
        </div>
      </div>
      
      {/* Support & Help */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <p className="text-gray-600 mb-2">
          Need help with your order? Contact our support team
        </p>
        <Link 
          href="/support" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Get Support
        </Link>
      </div>
    </div>
  );
}