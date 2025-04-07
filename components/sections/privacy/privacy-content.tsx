"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"

// Define a type for content blocks
type ContentBlock = {
  subtitle?: string;
  text: string;
  items: string[];
};

// Define a type for sections
type Section = {
  title: string;
  content: ContentBlock[];
};

// Define a type for collapsible section state
type CollapsibleState = {
  [key: string]: boolean;
};

const sections: Section[] = [
  {
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "We collect information that you provide directly to us, including:",
        items: [
          "Name and contact information",
          "Email address and phone number",
          "Billing and payment information",
          "Company information (if applicable)",
          "Information about properties you're interested in",
        ],
      },
      {
        subtitle: "Usage Information",
        text: "We automatically collect certain information about your use of our services, including:",
        items: [
          "Log data and device information",
          "IP address and browser type",
          "Pages you view and features you access",
          "Time spent on pages and interaction information",
        ],
      },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      {
        text: "We use the information we collect to:",
        items: [
          "Provide and maintain our services",
          "Process your transactions and orders",
          "Send you technical notices and support messages",
          "Communicate with you about products, services, and events",
          "Monitor and analyze trends and usage",
          "Detect, prevent, and address technical issues",
        ],
      },
    ],
  },
  {
    title: "Information Sharing",
    content: [
      {
        text: "We may share your information with:",
        items: [
          "Service providers and business partners",
          "Professional advisors and agents",
          "Regulatory authorities, government agencies, and law enforcement",
        ],
      },
    ],
  },
  {
    title: "Data Security",
    content: [
      {
        text: "We implement appropriate security measures including:",
        items: [
          "Encryption of sensitive information",
          "Regular security assessments",
          "Access controls and authentication",
          "Secure data storage and transmission",
        ],
      },
    ],
  },
  {
    title: "Your Rights",
    content: [
      {
        text: "You have the right to:",
        items: [
          "Access your personal information",
          "Correct inaccurate data",
          "Request deletion of your data",
          "Object to processing of your data",
          "Withdraw consent at any time",
        ],
      },
    ],
  },
  {
    title: "Cookies and Tracking",
    content: [
      {
        text: "We use cookies and similar technologies to:",
        items: [
          "Remember your preferences",
          "Understand how you use our services",
          "Improve user experience",
          "Provide personalized content",
        ],
      },
    ],
  },
  {
    title: "Updates to Privacy Policy",
    content: [
      {
        text: "We may update this Privacy Policy from time to time. We will notify you of any changes by:",
        items: [
          "Posting the new Privacy Policy on this page",
          "Updating the 'Last updated' date at the top of this policy",
          "Sending you an email notification",
        ],
      },
    ],
  },
  {
    title: "Contact Us",
    content: [
      {
        text: "If you have any questions about this Privacy Policy, please contact us:",
        items: [
          "Email: info@leadssynapse.com",
          "Phone: (555) 123-4567",
          "Address: 123 Privacy Street, Data City, ST 12345",
        ],
      },
    ],
  },
];

export function PrivacyContent() {
  // For mobile: track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<CollapsibleState>(() => {
    // By default, make the first section expanded on mobile
    const initialState: CollapsibleState = {};
    sections.forEach((section, index) => {
      initialState[section.title] = index === 0;
    });
    return initialState;
  });

  // Function to toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Check if we're on mobile using window.innerWidth
  const [isMobile, setIsMobile] = useState(false);
  
  // Add useEffect for mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="py-8 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-4xl px-4 md:px-6">
        <div className="mb-8 md:mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-4 md:mb-6 px-2 h-8 md:h-10">
              <ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="text-sm md:text-base">Back to Home</span>
            </Button>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold text-[#03045e] mb-2 md:mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-gray-600"
          >
            Last updated: February 24, 2024
          </motion.p>
        </div>

        <div className="space-y-3 md:space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-3 md:p-6 bg-white border border-[#caf0f8] hover:border-[#90e0ef] transition-colors">
                {/* Mobile collapsible header */}
                <div 
                  className="flex justify-between items-center cursor-pointer md:cursor-default"
                  onClick={() => isMobile && toggleSection(section.title)}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-[#03045e] mb-1 md:mb-4">{section.title}</h2>
                  {/* Only show toggle on mobile */}
                  <div className="md:hidden">
                    {expandedSections[section.title] ? (
                      <ChevronUp className="h-5 w-5 text-[#0077b6]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#0077b6]" />
                    )}
                  </div>
                </div>

                {/* Content that collapses on mobile */}
                <div className={isMobile && !expandedSections[section.title] ? "hidden" : ""}>
                  {section.content.map((contentBlock, blockIndex) => (
                    <div key={blockIndex} className="mb-3 md:mb-4 last:mb-0">
                      {"subtitle" in contentBlock && contentBlock.subtitle && (
                        <h3 className="text-base md:text-lg font-semibold text-[#0077b6] mb-1 md:mb-2">{contentBlock.subtitle}</h3>
                      )}
                      {contentBlock.text && <p className="text-sm md:text-base text-gray-600 mb-1 md:mb-2">{contentBlock.text}</p>}
                      {contentBlock.items && (
                        <ul className="list-disc list-inside space-y-0.5 md:space-y-1">
                          {contentBlock.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm md:text-base text-gray-600 ml-2 md:ml-4">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 md:mt-12 text-center"
        >
          <p className="text-sm md:text-base text-gray-600 mb-4">
            For more information about our terms of service, please visit our{" "}
            <Link href="/terms" className="text-[#00B4D8] hover:underline">
              Terms of Service
            </Link>{" "}
            page.
          </p>
        </motion.div>
      </div>
    </div>
  )
}