export interface SymptomGuide {
  id: string
  title: string
  icon: string
  urgency: "emergency" | "high" | "moderate" | "maintenance"
  category: string
  likelyCause: string
  quickCheck: string
  recommendation: string
  serviceId: string
  prefillRequest: string
}

export const symptomGuides: SymptomGuide[] = [
  {
    id: "sym-no-water",
    title: "No Water at All",
    icon: "AlertOctagon",
    urgency: "emergency",
    category: "Emergency",
    likelyCause: "Tripped well breaker, failed pressure switch contacts, lightning/power surge, or failed submersible pump motor.",
    quickCheck: "Inspect your electrical panel. Is the 240V double-pole breaker labeled 'Well' or 'Pump' tripped? If tripped, flip it once. If it trips immediately again, leave it OFF to prevent fire hazard.",
    recommendation: "Call Bill immediately at (203) 671-1506. 24/7 emergency dispatch available.",
    serviceId: "emergency-service",
    prefillRequest: "Emergency: Total loss of water at all fixtures. Breaker status checked."
  },
  {
    id: "sym-clicking-rapid",
    title: "Rapid Clicking Sounds in Basement",
    icon: "Volume2",
    urgency: "high",
    category: "Well Tanks",
    likelyCause: "Short-cycling. The pressure tank has lost its internal air cushion or the rubber diaphragm has failed (waterlogged tank).",
    quickCheck: "Tap the upper half of your pressure tank with your knuckles. It should sound hollow and ring. If it sounds dull, solid, and full of water from top to bottom, the tank is waterlogged.",
    recommendation: "Requires pressure tank air pre-charge recalibration or tank replacement before the pump motor burns out from constant cycling.",
    serviceId: "well-tanks",
    prefillRequest: "Well pump is short-cycling and clicking on/off every few seconds. Suspect waterlogged tank."
  },
  {
    id: "sym-sputtering-taps",
    title: "Sputtering or Spitting Faucets",
    icon: "Wind",
    urgency: "high",
    category: "Well Pumps",
    likelyCause: "Air entering the well line, low water table drawing air into pump intake, or a failing check valve allowing water to bleed back.",
    quickCheck: "Does air spit when you first open a faucet in the morning, followed by milky or murky water?",
    recommendation: "Check drop pipe integrity, well water recovery rate, and check valve sealing.",
    serviceId: "well-pumps",
    prefillRequest: "Faucets are sputtering air and water pressure is inconsistent."
  },
  {
    id: "sym-low-pressure",
    title: "Low or Surging Water Pressure",
    icon: "TrendingDown",
    urgency: "moderate",
    category: "Well Pumps / Tanks",
    likelyCause: "Clogged sediment filter cartridge, clogged pressure switch nipple, misadjusted switch, or worn pump impellers.",
    quickCheck: "Check your whole-house cartridge filter if installed. Is the filter dark brown or black? Try bypassing it temporarily to see if pressure recovers.",
    recommendation: "Schedule a thorough well pressure checkup and switch calibration.",
    serviceId: "well-pumps",
    prefillRequest: "Water pressure has noticeably dropped or surges between high and low."
  },
  {
    id: "sym-orange-stains",
    title: "Orange or Rust Stains in Fixtures",
    icon: "CircleAlert",
    urgency: "moderate",
    category: "Water Treatment",
    likelyCause: "Dissolved ferrous iron or manganese commonly found in Connecticut bedrock aquifers.",
    quickCheck: "Water runs clear from the tap, but creates orange/red/brown rings in toilet bowls, bathtubs, or dishwasher interiors after standing.",
    recommendation: "Professional on-site water test followed by an iron/manganese filtration or water softening system.",
    serviceId: "water-filtration",
    prefillRequest: "Orange rust staining on sinks, toilets, and laundry. Request water hardness & iron test."
  },
  {
    id: "sym-white-scale",
    title: "White Crust / Chalky Limescale",
    icon: "Sparkles",
    urgency: "maintenance",
    category: "Water Treatment",
    likelyCause: "High mineral hardness (calcium and magnesium ions) precipitating on hot surfaces and fixtures.",
    quickCheck: "Look at your showerhead nozzles, chrome faucets, and glassware after dishwasher cycles. Are they coated in stubborn white spots?",
    recommendation: "Install a high-efficiency water softener calibrated to your well's GPG (grains per gallon) hardness rating.",
    serviceId: "water-filtration",
    prefillRequest: "Hard water scale on chrome fixtures and glassware. Need water softening consultation."
  },
  {
    id: "sym-sulfur-odor",
    title: "Rotten Egg / Sulfur Smell",
    icon: "CloudRain",
    urgency: "moderate",
    category: "Water Treatment",
    likelyCause: "Hydrogen sulfide gas produced by sulfur-reducing bacteria in the well, or reaction with magnesium sacrificial anode rods in water heaters.",
    quickCheck: "Run only cold water for 1 minute and smell it. Then run hot water. Does the smell come from both, or only hot water?",
    recommendation: "Shock chlorination, aeration filtration, or catalytic carbon filtration.",
    serviceId: "water-filtration",
    prefillRequest: "Rotten egg sulfur odor in well water. Need water testing and filtration."
  },
  {
    id: "sym-leaking-tank",
    title: "Water Puddle or Leaking Tank Tee",
    icon: "Droplet",
    urgency: "high",
    category: "Well Tanks",
    likelyCause: "Corroded tank tee fitting, blown pressure relief valve, or rusted tank base.",
    quickCheck: "Look at the brass fittings directly beneath your blue or gray pressure tank. Is water actively dripping onto the concrete?",
    recommendation: "Turn off power to the pump if water is touching electrical wires, and call for brass tee or tank replacement.",
    serviceId: "well-tanks",
    prefillRequest: "Water leak detected at base of pressure tank / brass manifold."
  }
]

