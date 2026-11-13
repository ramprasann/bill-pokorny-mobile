export interface ServiceItem {
  id: string
  code: string
  title: string
  shortDesc: string
  fullDesc: string
  iconName: string
  badge: string
  specs: { label: string; value: string }[]
  features: string[]
  signs: string[]
  emergency?: boolean
}

export const servicesData: ServiceItem[] = [
  {
    id: "well-pumps",
    code: "SVC-01",
    title: "Well Pumps",
    shortDesc: "Submersible & jet pump diagnosis, repair, and precision sizing.",
    fullDesc: "When the pump stops, your home's water stops. Bill diagnoses submersible and deep jet pumps quickly, repairing what can be salvaged and installing top-tier replacements matched to your well depth, recovery rate, and household gallon-per-minute demand.",
    iconName: "Zap",
    badge: "Submersible · Jet · Booster",
    specs: [
      { label: "Pressure Switch", value: "30/50 or 40/60 PSI" },
      { label: "Pump Types", value: "Submersible & Deep Jet" },
      { label: "Lifespan", value: "10 – 15 Years Average" },
      { label: "Control Systems", value: "Standard & Constant Pressure" }
    ],
    features: [
      "Submersible & jet pump troubleshooting",
      "Precision sizing to well depth & flow rate",
      "Pressure switch & control box replacements",
      "Constant-pressure variable frequency drive (VFD) booster pumps",
      "Wiring, capacitor, and relay diagnosis",
      "Annual electrical and mechanical well checkups"
    ],
    signs: [
      "Sputtering or coughing faucets throughout the house",
      "Water pressure that surges and drops noticeably",
      "Pump runs continuously without shutting off",
      "A sudden, unexplained spike in your electric utility bill",
      "Complete loss of water pressure"
    ]
  },
  {
    id: "well-tanks",
    code: "SVC-02",
    title: "Well Pressure Tanks",
    shortDesc: "Pressure tanks calibrated for steady flow and long pump life.",
    fullDesc: "Your well pressure tank maintains steady household water pressure and prevents your well pump from burning out through short-cycling. We test pre-charge air cushions, repair waterlogged tanks, and install heavy-duty diaphragm and bladder replacements.",
    iconName: "Gauge",
    badge: "Pre-charge: 2 PSI below cut-in",
    specs: [
      { label: "Pre-charge Rule", value: "2 PSI below cut-in" },
      { label: "Tank Types", value: "Diaphragm & Bladder" },
      { label: "Manifolds", value: "Solid Brass Tank Tees" },
      { label: "Protection", value: "Pressure Relief Valves" }
    ],
    features: [
      "Heavy-duty diaphragm & bladder pressure tank installation",
      "Air pre-charge testing and Schrader valve calibration",
      "Waterlogged tank diagnosis and replacement",
      "Thermal expansion tanks for water heaters",
      "Lead-free brass tank tees, pressure gauges, and drain valves",
      "Multi-tank tandem configurations for high-demand estates"
    ],
    signs: [
      "Pump clicks on and off rapidly every few seconds (short-cycling)",
      "Tank sounds solid and heavy when tapped (waterlogged)",
      "Visible rust, corrosion, or pinhole leaks at the base",
      "Water pressure drops instantly the moment a tap opens"
    ]
  },
  {
    id: "water-filtration",
    code: "SVC-03",
    title: "Water Filtration & Softening",
    shortDesc: "Custom water softeners, iron filters, and UV purification.",
    fullDesc: "Hard water, iron staining, acid etching, or sulfur odor? We conduct on-site water testing, explain the parameters in plain English, and install systems calibrated to fix the exact mineral or microbiological profile of your well water.",
    iconName: "Droplets",
    badge: "Tested in Grains / Gallon",
    specs: [
      { label: "Hardness Testing", value: "Grains per Gallon (GPG)" },
      { label: "Treatment", value: "Whole-House & Point-of-Use" },
      { label: "Filtration", value: "5-Micron Sediment & Carbon" },
      { label: "Sanitization", value: "Ultraviolet (UV) 254nm" }
    ],
    features: [
      "High-efficiency water softeners & brine systems",
      "Iron and manganese oxidation filtration (no chemical injection)",
      "Sediment & particulate filtration cartridges",
      "Ultraviolet (UV) microbiological disinfection systems",
      "Under-sink reverse osmosis (RO) drinking systems",
      "Softener re-bedding, resin cleaning, and valve servicing"
    ],
    signs: [
      "White chalky limescale on faucets, shower doors, and dishes",
      "Orange, reddish, or dark brown stains in sinks and toilets",
      "Rotten egg or sulfur odor from hot and cold taps",
      "Murky, cloudy water or visible grit at aerators",
      "Dry skin, dull hair, or soap that won't lather"
    ]
  },
  {
    id: "heaters-fixtures",
    code: "SVC-04",
    title: "Water Heaters & Fixtures",
    shortDesc: "Indirect water heaters, faucets, and high-efficiency fixtures.",
    fullDesc: "From high-efficiency indirect water heaters integrated with boilers to designer kitchen faucets and outdoor showers, we install the plumbing fixtures that deliver your well water reliably, cleanly, and with lasting durability.",
    iconName: "Flame",
    badge: "Indirect · Tank · Fixtures",
    specs: [
      { label: "Heater Styles", value: "Indirect Boilers & Electric" },
      { label: "Piping", value: "Lead-free Copper & PEX" },
      { label: "Applications", value: "Residential & Commercial" },
      { label: "Valves", value: "Quarter-turn Ball Valves" }
    ],
    features: [
      "High-recovery indirect water heater installation",
      "Electric and tank-style water heater replacements",
      "Kitchen and bathroom faucet upgrades & leak repairs",
      "Outdoor showers and freeze-proof hose bibbs",
      "Whole-house emergency shut-off valves and supply lines",
      "Pressure reducing valves and expansion controls"
    ],
    signs: [
      "Running out of hot water prematurely during normal showers",
      "Rusty or discolored hot water with clear cold water",
      "Rumbling, popping, or boiling sounds inside the water heater",
      "Persistent dripping faucets and corroded shutoff valves"
    ]
  },
  {
    id: "emergency-service",
    code: "SVC-05",
    title: "24/7 Emergency Well Service",
    shortDesc: "Immediate response for total water outages, leaks, and freeze-ups.",
    fullDesc: "A complete loss of water is an emergency for any household or farm. We offer round-the-clock emergency dispatch across Fairfield County. Day or night, weekends or holidays, Bill answers your call and mobilizes promptly to get your water flowing.",
    iconName: "AlertTriangle",
    badge: "24/7 · (203) 671-1506",
    emergency: true,
    specs: [
      { label: "Availability", value: "24 Hours / 7 Days / 365 Days" },
      { label: "Direct Contact", value: "Bill Answers Directly" },
      { label: "Service Area", value: "Fairfield County, CT" },
      { label: "Response", value: "Immediate Mobilization" }
    ],
    features: [
      "Complete 'No Water' emergency diagnosis and repair",
      "Burnt-out submersible pump or switch replacement",
      "Catastrophic pressure tank bursts or flooded basements",
      "Winter frozen well pipes and thawed line restorations",
      "Weekend, evening, and holiday immediate service",
      "Temporary emergency water bypass when specialized parts are ordered"
    ],
    signs: [
      "Zero water flowing from any faucet or fixture",
      "Water spraying or flooding around the pressure tank or switch",
      "Electrical breaker for the well pump immediately trips upon reset",
      "Smell of electrical burning near the pump control box"
    ]
  }
]

