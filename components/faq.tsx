"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
]

export function FAQ() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-[#03045e] mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-[#03045e] hover:text-[#00B4D8]">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

