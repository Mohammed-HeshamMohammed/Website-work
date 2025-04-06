"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"

// Reordered team array so that the founder is first.
const team = [
  {
    name: "Mohammed Hesham",
    role: "Chief Technology Officer & Chief Operating Officer",
    image: "/placeholder.svg",
    bio: "Expert in real estate technology with over 10 years experience leading innovation.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Mohammed Salah",
    role: "Founder & Chief Information Officer",
    image: "/placeholder.svg",
    bio: "Visionary founder with a passion for transforming the real estate industry through data.",
    linkedin: "#",
    twitter: "#",
    email: "#",
    featured: true,
  },
  {
    name: "Ahmed Adel",
    role: "Lead Software Engineer",
    image: "/placeholder.svg",
    bio: "Full-stack developer specializing in scalable architecture and user experience.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
]

export function AboutTeam() {
  return (
    <section className="py-24 bg-gray-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#03045e]/5 rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03045e]/5 rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#03045e] mb-6">Meet Our Leadership</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The passionate minds driving innovation in real estate data and technology
          </p>
        </motion.div>

        {/* Team cards container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`${member.featured ? "md:col-span-1 md:row-span-1 md:scale-105" : ""}`}
            >
              <Card className={`overflow-hidden h-full group ${member.featured ? "border-[#03045e]/30 shadow-xl" : "shadow-lg"} hover:shadow-2xl transition-all duration-300`}>
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {member.bio}
                    </p>
                    <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <a
                        href={member.linkedin}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                        title={`${member.name} on LinkedIn`}
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={member.twitter}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                        title={`${member.name} on Twitter`}
                        aria-label={`${member.name} Twitter`}
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={member.email}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                        title={`Email ${member.name}`}
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-[#03045e]">{member.name}</h3>
                    {member.featured && (
                      <div className="px-3 py-1 bg-[#03045e]/10 rounded-full text-xs font-semibold text-[#03045e]">
                        Founder
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <a href="#" className="inline-flex items-center text-[#03045e] font-medium group">
                    Learn more 
                    <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}