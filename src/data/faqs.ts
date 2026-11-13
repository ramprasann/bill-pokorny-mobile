export interface FAQItem {
  id: string
  question: string
  answer: string
  category: "pumps" | "tanks" | "water" | "emergency" | "general"
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "pumps",
    question: "How do I know if my well pump is failing?",
    answer: "Common signs include low or surging water pressure, air spitting violently from taps, a pump that runs constantly without reaching cut-off pressure, strange grinding noises from the well head, or complete loss of water. If you notice any of these, call Bill before a small electrical or mechanical switch issue leads to a burned-out pump motor deep in the ground."
  },
  {
    id: "faq-2",
    category: "pumps",
    question: "How long does a well pump typically last?",
    answer: "Most submersible well pumps last between 10 to 15 years. Longevity depends directly on water quality, aquifer sediment, household cycling frequency, and critically, whether the pressure tank is functioning properly. A failing or waterlogged pressure tank drastically shortens pump life by forcing it to cycle hundreds of times per day."
  },
  {
    id: "faq-3",
    category: "tanks",
    question: "Why does my pump turn on and off every few seconds?",
    answer: "That rapid cycling is called 'short-cycling.' It almost always means the well pressure tank has lost its internal air pre-charge cushion or the internal bladder has ruptured, filling the entire tank with non-compressible water (waterlogging). Because water cannot compress, the pressure spikes and plummets instantly with every open faucet. It wears out the pump motor quickly, so it should be checked right away."
  },
  {
    id: "faq-4",
    category: "water",
    question: "Do I need a water softener?",
    answer: "If you observe white chalky mineral scale on faucets and glass shower doors, spotty dishes, or dry skin and stiff laundry, you likely have hard water from local limestone or mineral bedrock. We test your water's hardness in grains per gallon (GPG) first, and only recommend a softener if it will make a tangible difference to your plumbing and daily comfort."
  },
  {
    id: "faq-5",
    category: "emergency",
    question: "Do you offer genuine 24/7 emergency service?",
    answer: "Yes. No water is an emergency, so we treat it like one. Bill is available 24 hours a day, 7 days a week, including weekends and holidays. When you call (203) 671-1506, Bill answers the phone directly and mobilizes to restore your water as quickly as possible."
  },
  {
    id: "faq-6",
    category: "general",
    question: "What specific towns and areas do you serve?",
    answer: "Bill Pokorny is based right in Weston, CT, and serves all of Fairfield County—including Weston, Fairfield, Westport, Easton, Wilton, Redding, Ridgefield, Trumbull, Monroe, and nearby communities. Call Bill anytime to confirm your address."
  }
]

