import { ArrowRight, Search, Database, Phone } from "lucide-react"

export function InfoGraphic() {
  const steps = [
    {
      icon: Search,
      title: "Search Properties",
      description: "Finding potential properties that match your investment criteria",
    },
    {
      icon: Database,
      title: "Skip Trace Data",
      description: "Getting accurate contact information for property owners",
    },
    {
      icon: Phone,
      title: "Connect",
      description: "Reaching out to property owners directly",
    },
  ]

  return (
    <div className="bg-gray-50 py-20">
      <div className="container">
        <h2 className="text-4xl font-bold text-center text-[#03045e] mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center border-none shadow-none">
              <div className="h-16 w-16 rounded-full bg-[#00B4D8]/10 flex items-center justify-center mb-6">
                <step.icon className="h-8 w-8 text-[#00B4D8]" />
              </div>
              <h3 className="text-xl font-semibold text-[#03045e] mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/4 -right-4 h-6 w-6 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}