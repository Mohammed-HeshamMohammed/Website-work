import { ArrowRight, Search, Database, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { styles } from "@/components/sections/about/css/Process.styles"; // Make sure to import your styles

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
  ];

  return (
    <div className="bg-gray-50 py-20 flex flex-col items-center justify-center relative">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center text-center mb-10 text-xl md:text-3xl">
        <motion.div
          className={styles.titleWrapper}
          whileInView={{
            scale: [0.9, 1.05, 1],
            transition: { duration: 0.8, ease: "easeOut" },
          }}
          viewport={{ once: true }}
        >
          <span className={`${styles.titleAccent} text-lg md:text-3xl`}>How It </span>
          <h2
            id="process-section-title"
            className={`${styles.title} text-2xl md:text-6xl font-bold`}
          >
            Works ?
          </h2>
        </motion.div>
      </div>


      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container">
        {steps.map((step, index) => {
          const { icon: Icon, title, description } = step; // Destructure here
          return (
            <div
              key={index}
              className="relative flex flex-col items-center text-center border-none shadow-none"
            >
              <div className="h-16 w-16 rounded-full bg-[#00B4D8]/10 flex items-center justify-center mb-6">
                <Icon className="h-8 w-8 text-[#00B4D8]" /> {/* Render icon component here */}
              </div>
              <h3 className="text-xl font-semibold text-[#03045e] mb-3">{title}</h3>
              <p className="text-gray-600">{description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/4 -right-4 h-6 w-6 text-gray-400" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
