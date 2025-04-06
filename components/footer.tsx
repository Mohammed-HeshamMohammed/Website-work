import { Mail, Phone, Linkedin, Instagram, Twitter, ChevronRight, ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#03045E] to-[#0077B6] text-white relative">
      {/* Advanced Layered Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
        {/* First layer - waves */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 rotate-180">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity="0.1" fill="#03045E"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity="0.2" fill="#03045E"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity="0.3" fill="#03045E"></path>
        </svg>
        
        {/* Second layer - geometric pattern */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-[#03045E] opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-1/5 h-full bg-white opacity-20"></div>
            <div className="absolute top-0 left-1/5 w-1/5 h-full bg-white opacity-10"></div>
            <div className="absolute top-0 left-2/5 w-1/5 h-full bg-white opacity-20"></div>
            <div className="absolute top-0 left-3/5 w-1/5 h-full bg-white opacity-10"></div>
            <div className="absolute top-0 left-4/5 w-1/5 h-full bg-white opacity-20"></div>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center mr-3">
                <span className="font-bold text-[#03045E]">LS</span>
              </div>
              <h2 className="text-2xl font-bold">Leads Synapse</h2>
            </div>
            <p className="text-sm text-blue-100 mb-6 leading-relaxed">
              Connecting businesses with their ideal customers through intelligent lead generation solutions that drive growth and maximize ROI.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
              <Link href="https://linkedin.com" className="bg-white/10 backdrop-blur-sm p-2.5 rounded-lg hover:bg-[#00B4D8] transition-all duration-300 hover:scale-110">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="https://instagram.com" className="bg-white/10 backdrop-blur-sm p-2.5 rounded-lg hover:bg-[#00B4D8] transition-all duration-300 hover:scale-110">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com" className="bg-white/10 backdrop-blur-sm p-2.5 rounded-lg hover:bg-[#00B4D8] transition-all duration-300 hover:scale-110">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:ml-8">
            <h3 className="text-[#90E0EF] font-semibold text-lg mb-5 flex items-center">
              <span className="w-8 h-0.5 bg-[#90E0EF] mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Plans', 'FAQ', 'About Us', 'Case Studies', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="flex items-center group">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0077B6] group-hover:bg-[#90E0EF] transition-colors mr-2"></div>
                    <span className="text-sm text-blue-100 group-hover:text-white transition-colors">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-[#90E0EF] font-semibold text-lg mb-5 flex items-center">
              <span className="w-8 h-0.5 bg-[#90E0EF] mr-2"></span>
              Contact
            </h3>
            <div className="space-y-4">
              <a href="mailto:info@leadssynapse.com" className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-[#00B4D8] transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm text-blue-100 group-hover:text-white">info@leadssynapse.com</span>
              </a>
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm text-blue-100">+1 (888) 123-4567</span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm text-blue-100">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h3 className="text-[#90E0EF] font-semibold text-lg mb-5 flex items-center">
              <span className="w-8 h-0.5 bg-[#90E0EF] mr-2"></span>
              Stay Updated
            </h3>
            <p className="text-sm text-blue-100 mb-4">Subscribe to our newsletter for the latest trends and insights.</p>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#90E0EF] focus:border-transparent focus:outline-none transition-all pr-10"
                />
                <button 
                  type="submit" 
                  title="Submit email" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00B4D8] hover:bg-[#90E0EF] transition-colors rounded-full p-1.5"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-blue-200/70">We respect your privacy. No spam, ever.</p>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center text-sm text-blue-100">
          <p>© 2025 Leads Synapse Inc. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}