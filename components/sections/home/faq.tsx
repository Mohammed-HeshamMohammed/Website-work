"use client"

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I skiptrace fewer than 10,000 records or just one record?",
    answer:
      "Yes! Lead Synapse allows you to skiptrace any number of records, whether it's a single record or a bulk request. There are no minimum order requirements.",
  },
  {
    question: "How accurate is Lead Synapse's skiptracing data?",
    answer:
      "Lead Synapse delivers an 80-85% match rate, meaning you have an 80-85% chance of reaching every homeowner when you contact the provided phone numbers.",
  },
  {
    question: "What sets Lead Synapse apart from other data providers?",
    answer:
      "No subscriptions – Pay only for what you need, without ongoing commitments. Advanced duplicate removal – We are one of the only real estate data providers, alongside ListSource, that eliminates duplicate mailing addresses. Superior pricing, data quality, and convenience compared to other providers.",
  },
  {
    question: "How often is your data updated?",
    answer: "Our property and phone number data is refreshed every 30 days to ensure accuracy and reliability!",
  },
];

export function FAQ() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container max-w-3xl">
        <h2 className="font-sans text-4xl font-bold text-center text-[#03045e] mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="mb-8 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#03045e] to-[#00B4D8] text-white text-sm font-medium">
            Most Common Questions
          </span>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-100 rounded-lg mb-4 shadow-sm overflow-hidden"
            >
              <AccordionTrigger 
                className="font-sans text-[#03045e] hover:text-[#00B4D8] font-medium px-6 py-4 bg-white"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-gray-600 bg-white px-6">
                <div className="py-3 border-t border-gray-100">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 mb-4 font-sans">Still have questions?</p>
          <button className="px-6 py-2 bg-[#00B4D8] text-white rounded-md hover:bg-[#03045e] transition-colors duration-300 font-sans font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQ;