import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, TrendingUp, Award, Clock, Globe } from "lucide-react"

const stats = [
  { label: "Years of Experience", value: "3+" },
  { label: "Satisfied Clients", value: "1000+" },
  { label: "Records Processed", value: "10M+" },
  { label: "Data Accuracy", value: "85%" },
]

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "We prioritize our customers' success above all else",
  },
  {
    icon: Target,
    title: "Quality Data",
    description: "Providing accurate and reliable information",
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description: "Always improving our services and technology",
  },
]

export function AboutContent() {
  return (
    <div className="space-y-24 py-20">
      {/* Hero Section */}
      <section className="container">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            About Us
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#03045e] mb-6">Transforming Real Estate Data</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're on a mission to make quality real estate data accessible and affordable for everyone.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[#00B4D8]">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#03045e] mb-6">How Kind Was Founded?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            Kind Skiptracing was founded in 2020 in Charlotte, North Carolina by our passionate founders Joshua Chan and
            Stas Kostadinov with one Goal in Mind to Make Data be Quality and Affordable at the same time. We carry our
            Goal to serve to everyone that is in the real estate industry and strive to make each and every client super
            successful with the data and mentorship we provide.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="p-6">
                <value.icon className="h-8 w-8 text-[#00B4D8] mb-4" />
                <h3 className="font-semibold text-[#03045e] mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-[#03045e] text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-8">
              Our Mission is Customer success. Your Success is Our Success and we stand by these words every day by
              giving our best to provide top tier customer experience, pricing, convenience, and innovative data to the
              real estate industry.
            </p>
            <Link href="/plans">
              <Button size="lg" variant="secondary" className="bg-white text-[#03045e] hover:bg-gray-100">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#03045e] text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-[#00B4D8] p-2">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 w-px bg-gray-200 my-2" />
              </div>
              <div>
                <h3 className="font-semibold text-[#03045e]">2020</h3>
                <p className="text-gray-600">Founded in Charlotte, North Carolina</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-[#00B4D8] p-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 w-px bg-gray-200 my-2" />
              </div>
              <div>
                <h3 className="font-semibold text-[#03045e]">2021</h3>
                <p className="text-gray-600">Reached 1000+ satisfied customers</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-[#00B4D8] p-2">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 w-px bg-gray-200 my-2" />
              </div>
              <div>
                <h3 className="font-semibold text-[#03045e]">2022</h3>
                <p className="text-gray-600">Expanded nationwide coverage</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-[#00B4D8] p-2">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#03045e]">2023</h3>
                <p className="text-gray-600">Launched AI-powered features</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <Card className="max-w-3xl mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold text-[#03045e] mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of successful real estate professionals using Kind Skiptracing
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/plans">
              <Button className="bg-[#03045e] hover:bg-[#00B4D8]">View Plans</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Sales</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}

