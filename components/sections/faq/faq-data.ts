export interface Section {
  id: string;
  title: string;
  questions: {
    q: string;
    a: string | string[];
  }[];
}

export const sections: Section[] = [
  {
    id: "general",
    title: "General",
    questions: [
      {
        q: "What is Leads Synapse?",
        a: [
          "We are a platform for real estate lead data that helps investors find opportunities.",
          "We support investment strategies like fix-and-flips, wholesaling, and creative financing.",
          "We offer data packages tailored to different project needs and budgets.",
          "We focus on providing reliable data to help inform your investment decisions.",
        ],
      },
      {
        q: "What is skip tracing?",
        a: [
          "Skip tracing helps locate current contact information for property owners.",
          "We provide phone numbers, emails, and other contact details to assist with outreach.",
          "We work to verify this information to increase the chances of successful connections.",
        ],
      },
      {
        q: "What services does Leads Synapse offer?",
        a: [
          "We provide customizable lead lists based on your investment criteria.",
          "We offer filtering options for narrowing down properties by price, ownership, equity, and more.",
          "Our data comes from multiple regularly updated databases.",
          "We offer skip tracing services to help you get current contact info for property owners.",
        ],
      },
      {
        q: "What sets Leads Synapse apart?",
        a: [
          "We give access to a large homeowner records database to aid your property search.",
          "We use data analysis tools to identify potential market opportunities.",
          "We provide customizable filters to match leads to your criteria.",
          "Our support team is here to help with any questions about using the platform.",
        ],
      },
    ],
  },
  {
    id: "using-leads-synapse",
    title: "Using Leads Synapse",
    questions: [
      {
        q: "How do I get started?",
        a: [
          "Create a custom list using our platform interface.",
          "Select filters like property type, price range, and equity.",
          "Review how many records are available before finalizing your selection.",
          "Download your list and start your outreach.",
        ],
      },
      {
        q: "What data filters are available?",
        a: [
          "Filter by property price to stay within your budget.",
          "View ownership details to know who owns a property.",
          "Check equity levels to spot specific financial situations.",
          "Use indicators like tax issues or pre-foreclosure to find motivated sellers.",
        ],
      },
      {
        q: "How do I create a custom list?",
        a: [
          "Use our list builder tool to apply your filters.",
          "See matching records update in real-time.",
          "Adjust filters to refine your target properties.",
          "Generate and download the final list when ready.",
        ],
      },
      {
        q: "What are the benefits of using Leads Synapse?",
        a: [
          "We provide filtered lead data to highlight opportunities.",
          "We include contact info to help you reach owners faster.",
          "We offer tools to organize and manage your leads.",
          "We give data insights that support your investment decisions.",
        ],
      },
    ],
  },
  {
    id: "newest-features",
    title: "Newest Features",
    questions: [
      {
        q: "What is Leads AI?",
        a: [
          "It’s our list-building tool powered by data analysis and property patterns.",
          "We highlight properties with higher equity or signs of motivated sellers.",
          "We offer insights backed by data to support smarter investment decisions.",
        ],
      },
      {
        q: "How does data acquisition work?",
        a: [
          "Submit your criteria through our request form.",
          "Select the geographic areas you want to explore.",
          "We process your request and collect matching property records.",
          "Your custom list is delivered once it's compiled.",
        ],
      },
      {
        q: "How can I access the new features?",
        a: [
          "Log in to your account on our platform.",
          "Go to the “Newest Features” section in your dashboard.",
          "Explore and use the available tools based on your needs.",
        ],
      },
      {
        q: "What improvements have been made?",
        a: [
          "We’ve updated our data systems to be more current and accurate.",
          "We’ve improved our interface to make navigation easier.",
          "We’ve added new filters to refine property searches further.",
        ],
      },
    ],
  },
  {
    id: "terminology",
    title: "Terminology",
    questions: [
      {
        q: "Skip Tracing",
        a: "The process of finding current contact information for property owners.",
      },
      {
        q: "Record",
        a: "A single entry containing property and homeowner information.",
      },
      {
        q: "Hit Rate",
        a: "The percentage of records that return contact information during skip tracing.",
      },
      {
        q: "Match Rate",
        a: "The likelihood of reaching the intended homeowner with the provided contact details.",
      },
      {
        q: "Equity Levels",
        a: "The portion of a property's value owned outright by the homeowner.",
      },
      {
        q: "Distressed Properties",
        a: "Properties where owners may be experiencing financial or other challenges.",
      },
    ],
  },
];

export default sections;
