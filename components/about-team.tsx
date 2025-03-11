"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

// Reordered team array so that the founder is first.
const team = [
  {
    name: "Mohammed Hesham",
    role: "Chief Technology Officer & Chief Operating Officer",
    image: "/placeholder.svg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Mohammed Salah",
    role: "Founder & Chief Information Officer",
    image: "/placeholder.svg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Ahmed Adel",
    role: "Lead Software Engineer",
    image: "/placeholder.svg",
    linkedin: "#",
    twitter: "#",
  },
]

export function AboutTeam() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#03045e] mb-6">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the passionate individuals driving innovation in real estate data
          </p>
        </motion.div>

        {/* Flex container for team cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {team.map((member, index) => {
            // Customize Mohammed Salah's card: larger dimensions and higher z-index.
            const cardClasses =
              member.name === "Mohammed Salah"
                ? "w-[150] h-[180] shadow-2xl"
                : "w-[120] h-[160] shadow-lg"
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`${cardClasses} rounded-xl`} // Rounded outer container
              >
                <Card className="overflow-hidden group shadow-lg rounded-xl">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 flex space-x-4">
                        <a
                          href={member.linkedin}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                        >
                          <Linkedin className="w-5 h-5 text-white" />
                        </a>
                        <a
                          href={member.twitter}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                        >
                          <Twitter className="w-5 h-5 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#03045e] mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
