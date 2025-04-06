import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic Plan",
    price: "$0.15",
    description: "per record",
    features: ["Up to 10,000 records", "80-85% match rate", "Phone numbers & emails", "24/7 support"],
  },
  {
    name: "Premium Plan",
    price: "$0.12",
    description: "per record",
    features: ["Unlimited records", "Priority processing", "Advanced filtering", "Dedicated account manager"],
    popular: true,
  },
]

export function Pricing() {
  return (
    <div className="py-20">
      <div className="container">
        <h2 className="text-4xl font-bold text-center text-[#03045e] mb-12">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg p-8 ${
                plan.popular ? "bg-[#03045e] text-white" : "bg-white border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#00B4D8] text-white text-sm px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm ml-1">{plan.description}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/order"
                className={`block text-center py-2 px-4 rounded transition-colors ${
                  plan.popular
                    ? "bg-white text-[#03045e] hover:bg-gray-100"
                    : "bg-[#03045e] text-white hover:bg-[#00B4D8]"
                }`}
              >
                Order Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

