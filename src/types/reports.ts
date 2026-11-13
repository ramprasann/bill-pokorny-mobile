export interface ServiceReport {
  id: string
  jobId: string
  jobType: "Install" | "Replace" | "Repair" | "Maintenance"
  title: string
  date: string
  technician: string
  address: string
  town: string
  equipmentInstalled: {
    item: string
    brand: string
    model: string
    serial?: string
    specs: string
  }[]
  workPerformed: string[]
  beforePhotos: string[]
  afterPhotos: string[]
  readings: {
    cutInPsi?: string
    cutOutPsi?: string
    tankPrechargePsi?: string
    hardnessGpg?: string
    ironPpm?: string
    ph?: string
  }
  notes?: string
  warrantyInfo: string
  nextRecommendedServiceDate: string
}

export const initialReports: ServiceReport[] = [
  {
    id: "REP-2026-088",
    jobId: "JOB-9102",
    jobType: "Replace",
    title: "Well Pressure Tank & Switch Replacement",
    date: "June 15, 2026",
    technician: "Bill Pokorny (CT Lic 208261)",
    address: "144 Valley Forge Rd",
    town: "Weston, CT",
    equipmentInstalled: [
      {
        item: "Well Pressure Tank",
        brand: "Well-X-Trol",
        model: "WX-202 Pro",
        serial: "WX-994821",
        specs: "20 Gallon Diaphragm Tank · Factory Pre-charge calibrated to 38 PSI"
      },
      {
        item: "Pressure Switch",
        brand: "Square D Pumptrol",
        model: "9013FSG2",
        specs: "40/60 PSI Heavy-duty Switch with Low-pressure Cut-off"
      }
    ],
    workPerformed: [
      "Drained and removed waterlogged 15-year old pressure tank",
      "Installed new solid lead-free brass tank tee with relief valve and liquid-filled gauge",
      "Calibrated air pre-charge to 38 PSI (exactly 2 PSI below 40 PSI cut-in)",
      "Tested electrical current draw on pump motor during cycling"
    ],
    beforePhotos: ["/images/gallery-3-tanks.jpg"],
    afterPhotos: ["/images/gallery-2-tanks.jpg"],
    readings: {
      cutInPsi: "40 PSI",
      cutOutPsi: "60 PSI",
      tankPrechargePsi: "38 PSI",
      hardnessGpg: "12 GPG",
      ph: "6.8"
    },
    notes: "Basement lines are clean copper. Customer shown how to check gauge periodically.",
    warrantyInfo: "5-Year Manufacturer Warranty on Well-X-Trol Tank; 1-Year Labor Guarantee by Bill Pokorny.",
    nextRecommendedServiceDate: "June 2027 (Annual System Checkup)"
  },
  {
    id: "REP-2025-042",
    jobId: "JOB-7731",
    jobType: "Install",
    title: "Whole-House 20-inch Big Blue Filtration & Softener",
    date: "November 10, 2025",
    technician: "Bill Pokorny (CT Lic 208261)",
    address: "144 Valley Forge Rd",
    town: "Weston, CT",
    equipmentInstalled: [
      {
        item: "Sediment Filter Housing",
        brand: "Pentair Pentek",
        model: "Big Blue 20-inch",
        specs: "4.5\" x 20\" Filter Housing with Pressure Relief Valve"
      },
      {
        item: "Water Softener System",
        brand: "Clack Metered",
        model: "WS1-32K",
        specs: "High-Efficiency On-Demand Regeneration System"
      }
    ],
    workPerformed: [
      "Installed whole-house 5-micron dual gradient sediment cartridge",
      "Plumbed bypass manifold using lead-free solder copper fittings",
      "Programmed digital metering head to 12 GPG water hardness profile",
      "Loaded 80 lbs pure solar salt into brine tank and ran test regeneration"
    ],
    beforePhotos: ["/images/gallery-6-tanks.jpg"],
    afterPhotos: ["/images/gallery-12-filtration.jpg"],
    readings: {
      hardnessGpg: "12 GPG (Raw) -> 1 GPG (Treated)",
      ironPpm: "0.2 ppm",
      ph: "7.0"
    },
    notes: "Eliminated white scale on glass fixtures and rust rings.",
    warrantyInfo: "10-Year Tank Warranty; 5-Year Valve Warranty.",
    nextRecommendedServiceDate: "November 2026 (Annual Filter & Resin Inspection)"
  }
]

