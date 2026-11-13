export interface WaterQualityLog {
  date: string
  hardnessGpg: string
  ironPpm: string
  ph: string
  testedBy: string
}

export interface UserWellSystem {
  address: string
  town: string
  wellDepthFeet: string
  pumpType: "Submersible" | "Jet Pump" | "Constant Pressure VFD"
  pumpHp: string
  pumpInstallYear: string
  tankModel: string
  tankBrand: string
  tankCapacityGallons: string
  pressureSetting: "30/50 PSI" | "40/60 PSI" | "Custom"
  tankPrechargePsi: string
  filterHousing: string
  filterCartridgeModel: string
  filterMicron: string
  uvBulbModel: string
  softenerInstalled: boolean
  softenerModel: string
  softenerSaltType: string
  waterHardnessGpg: string
  waterHeaterType: string
  shutOffValveLocation: string
  shutOffValvePhoto: string
  lastServiceDate: string
  nextFilterDueDate: string
  nextSaltDueDate: string
  nextUvDueDate: string
  nextPumpCheckupDate: string
  waterQualityLogs: WaterQualityLog[]
}

export const defaultWellSystem: UserWellSystem = {
  address: "144 Valley Forge Rd",
  town: "Weston, CT",
  wellDepthFeet: "240",
  pumpType: "Submersible",
  pumpHp: "3/4 HP",
  pumpInstallYear: "2021",
  tankBrand: "Well-X-Trol",
  tankModel: "WX-202 Pro",
  tankCapacityGallons: "20",
  pressureSetting: "40/60 PSI",
  tankPrechargePsi: "38 PSI",
  filterHousing: "Pentair Big Blue 20-inch",
  filterCartridgeModel: "Dual-Gradient Polypropylene (4.5\" x 20\")",
  filterMicron: "5-Micron",
  uvBulbModel: "Viqua Sterilight S463RL (254nm)",
  softenerInstalled: true,
  softenerModel: "Clack WS1 Metered On-Demand",
  softenerSaltType: "Solar Salt Crystals",
  waterHardnessGpg: "12 GPG",
  waterHeaterType: "50-Gallon Indirect Boiler Tank",
  shutOffValveLocation: "Basement north wall next to boiler, yellow brass quarter-turn lever valve",
  shutOffValvePhoto: "/images/gallery-6-tanks.jpg",
  lastServiceDate: "2026-06-15",
  nextFilterDueDate: "2026-12-15",
  nextSaltDueDate: "2026-11-30",
  nextUvDueDate: "2027-05-15",
  nextPumpCheckupDate: "2027-06-15",
  waterQualityLogs: [
    {
      date: "2026-06-15",
      hardnessGpg: "12 GPG",
      ironPpm: "0.2 ppm",
      ph: "6.8",
      testedBy: "Bill Pokorny (CT Lic 208261)"
    },
    {
      date: "2025-11-10",
      hardnessGpg: "14 GPG",
      ironPpm: "0.8 ppm",
      ph: "6.7",
      testedBy: "Bill Pokorny (CT Lic 208261)"
    }
  ]
}
