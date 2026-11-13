export interface CompanyInfo {
  name: string
  shortName: string
  owner: string
  tagline: string
  experienceYears: number
  phone: string
  phoneRaw: string
  email: string
  licenseNumber: string
  location: string
  availability: string
  townsServed: string[]
  timeline: {
    period: string
    title: string
    description: string
  }[]
  pillars: {
    title: string
    description: string
  }[]
  workflowSteps: {
    step: string
    title: string
    description: string
  }[]
}

export const companyData: CompanyInfo = {
  name: "Bill Pokorny Pump and Filter",
  shortName: "Bill Pokorny Pump & Filter",
  owner: "Bill Pokorny",
  tagline: "Well pump, tank & water filtration specialist",
  experienceYears: 45,
  phone: "(203) 671-1506",
  phoneRaw: "+12036711506",
  email: "billpokorny0@gmail.com",
  licenseNumber: "CT Lic 208261",
  location: "Weston, CT",
  availability: "24/7 Emergency Response · Bill answers directly",
  townsServed: [
    "Weston (Home Base)",
    "Fairfield",
    "Westport",
    "Easton",
    "Wilton",
    "Redding",
    "Ridgefield",
    "Trumbull",
    "Norwalk",
    "Monroe"
  ],
  timeline: [
    {
      period: "Roots",
      title: "Born & Raised in Weston",
      description: "Bill grew up in the same Fairfield County towns he serves today, learning the local aquifer and geology firsthand."
    },
    {
      period: "45 Years Ago",
      title: "Starts in the Trade",
      description: "Began hands-on craftsmanship on well pumps, pressure tanks, and specialized residential water systems."
    },
    {
      period: "Licensed",
      title: "Connecticut Licensed & Insured",
      description: "Fully licensed as CT Lic 208261 and insured for residential and commercial plumbing and well operations."
    },
    {
      period: "Today",
      title: "24/7 for the Community",
      description: "From routine water softening to 2 a.m. emergency no-water calls, Bill still answers the phone himself."
    }
  ],
  pillars: [
    {
      title: "Show up fast",
      description: "Prompt arrival for scheduled visits, and immediate 24/7 dispatch for emergencies."
    },
    {
      title: "Explain everything",
      description: "Clear options and upfront costs in plain language before any work begins."
    },
    {
      title: "Do it right",
      description: "Highest quality American-made parts, exact pressure calibrations, and careful workmanship."
    },
    {
      title: "Leave it clean",
      description: "Tidy basement work sites, thorough system walkthroughs, and guaranteed satisfaction."
    }
  ],
  workflowSteps: [
    {
      step: "01",
      title: "You Call",
      description: "Call or send the mobile request. Describe the issue and we schedule promptly or come immediately for emergencies."
    },
    {
      step: "02",
      title: "We Diagnose",
      description: "Bill tests the electrical wiring, switch, and tank pressure to identify the true root cause, not just symptoms."
    },
    {
      step: "03",
      title: "You Choose",
      description: "You receive honest repair vs. replacement options with transparent pricing. No pressure or surprises."
    },
    {
      step: "04",
      title: "We Fix & Clean",
      description: "Complete repair with premium parts, full testing, a clean workspace, and an operational walkthrough."
    }
  ]
}

