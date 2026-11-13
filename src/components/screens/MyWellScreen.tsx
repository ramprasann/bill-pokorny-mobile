import React, { useState, useEffect } from "react"
import { 
  Droplets, 
  Layers, 
  Bell, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Wrench, 
  ExternalLink, 
  Search, 
  ChevronRight, 
  Info, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Camera,
  MapPin,
  X,
  Plus
} from "lucide-react"
import { UserWellSystem, WaterQualityLog } from "@/types/system"
import { ServiceReport, initialReports } from "@/types/reports"
import { UserProfile } from "@/types/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MyWellScreenProps {
  user: UserProfile
  wellSystem: UserWellSystem
  onUpdateWellSystem: (updated: UserWellSystem) => void
  onBookServiceForItem?: (item: string) => void
  initialSubTab?: "equipment" | "reminders" | "reports"
}

export const MyWellScreen: React.FC<MyWellScreenProps> = ({
  user,
  wellSystem,
  onUpdateWellSystem,
  onBookServiceForItem,
  initialSubTab = "equipment"
}) => {
  const [activeTab, setActiveTab] = useState<"equipment" | "reminders" | "reports">(initialSubTab)
  
  // Listen for hash changes (e.g. #reports)
  useEffect(() => {
    if (window.location.hash === "#reports") {
      setActiveTab("reports")
    }
  }, [])

  // Reminders State
  const [filterDone, setFilterDone] = useState(false)
  const [saltDone, setSaltDone] = useState(false)
  const [uvDone, setUvDone] = useState(false)

  // Reports State
  const [reports, setReports] = useState<ServiceReport[]>(initialReports)
  const [reportFilter, setReportFilter] = useState<string>("All")
  const [reportSearch, setReportSearch] = useState<string>("")
  const [selectedReport, setSelectedReport] = useState<ServiceReport | null>(null)

  // Shutoff valve photo viewer
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false)

  // Export mock PDF
  const handleExportPdf = () => {
    alert("Well Passport PDF generated! Downloading Bill Pokorny Well System Summary...")
  }

  const filteredReports = reports.filter(r => {
    const matchesFilter = reportFilter === "All" || r.jobType === reportFilter
    const matchesSearch = r.title.toLowerCase().includes(reportSearch.toLowerCase()) ||
                          r.id.toLowerCase().includes(reportSearch.toLowerCase()) ||
                          r.workPerformed.some(w => w.toLowerCase().includes(reportSearch.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-4 px-4 pt-3 pb-28 text-left select-none">
      {/* 3-Way Top Navigation Segment */}
      <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-200/80 p-1 shadow-inner border border-slate-300/50">
        <button
          onClick={() => setActiveTab("equipment")}
          className={`py-2 px-1 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-1 min-w-0 ${
            activeTab === "equipment"
              ? "bg-white text-[#0f2340] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">Equipment</span>
        </button>

        <button
          onClick={() => setActiveTab("reminders")}
          className={`py-2 px-1 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-1 min-w-0 ${
            activeTab === "reminders"
              ? "bg-white text-[#0f2340] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bell className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">Reminders</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`py-2 px-1 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-1 min-w-0 ${
            activeTab === "reports"
              ? "bg-white text-[#0f2340] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">Reports</span>
          <span className="flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#2f74b5] text-[10px] font-bold text-white flex-shrink-0">
            {reports.length}
          </span>
        </button>
      </div>

      {/* SUB-TAB 1: EQUIPMENT */}
      {activeTab === "equipment" && (
        <div className="space-y-4">
          {/* Header Card with Address and PDF Export */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0f2340] to-[#1b3459] text-white p-4 shadow-card-soft flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-aqua-400 text-[11px] font-mono-specs font-bold uppercase">
                <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Verified System Passport</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5 truncate">{wellSystem.address}</h2>
              <p className="text-xs text-slate-300 font-mono-specs truncate">{wellSystem.town} · Depth: {wellSystem.wellDepthFeet} ft</p>
            </div>
            <button
              onClick={handleExportPdf}
              className="h-9 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 tap-press flex-shrink-0"
            >
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
          </div>

          {/* Main Emergency Shut-off Location Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brandRed-600 animate-ping" />
                <h3 className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-700">
                  Main Shut-off Valve Location
                </h3>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold text-brandRed-700 border-red-200 bg-red-50">
                Critical Safety
              </Badge>
            </div>
            <p className="text-xs text-slate-800 font-semibold leading-snug">
              {wellSystem.shutOffValveLocation}
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => setIsPhotoViewerOpen(true)}
                className="text-xs text-[#2f74b5] hover:text-[#255f96] font-bold flex items-center gap-1"
              >
                <Camera className="h-3.5 w-3.5" /> View Valve Photo
              </button>
            </div>
          </div>

          {/* System Specs Grid */}
          <div className="grid grid-cols-1 gap-3">
            {/* 1. Well Pump */}
            <div className="rounded-2xl bg-white border border-slate-200 p-3.5 shadow-card-soft space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[11px] font-mono-specs font-bold uppercase text-slate-500">Well Pump</span>
                <Badge className="bg-[#2f74b5]/15 text-[#2f74b5] border-0 text-[10px] font-bold">
                  {wellSystem.pumpType}
                </Badge>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Motor Power:</span>
                  <span className="font-bold text-slate-800">{wellSystem.pumpHp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Well Depth:</span>
                  <span className="font-bold text-slate-800">{wellSystem.wellDepthFeet} ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Installed:</span>
                  <span className="font-bold text-slate-800">{wellSystem.pumpInstallYear}</span>
                </div>
              </div>
            </div>

            {/* 2. Pressure Tank */}
            <div className="rounded-2xl bg-white border border-slate-200 p-3.5 shadow-card-soft space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[11px] font-mono-specs font-bold uppercase text-slate-500">Pressure Tank</span>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                  {wellSystem.pressureSetting}
                </Badge>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Brand / Model:</span>
                  <span className="font-bold text-slate-800">{wellSystem.tankBrand} {wellSystem.tankModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Capacity:</span>
                  <span className="font-bold text-slate-800">{wellSystem.tankCapacityGallons} Gal Diaphragm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pre-charge:</span>
                  <span className="font-bold text-slate-800">{wellSystem.tankPrechargePsi}</span>
                </div>
              </div>
            </div>

            {/* 3. Water Filtration */}
            <div className="rounded-2xl bg-white border border-slate-200 p-3.5 shadow-card-soft space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[11px] font-mono-specs font-bold uppercase text-slate-500">Sediment Filter</span>
                <span className="text-[10px] font-mono-specs text-slate-500">{wellSystem.filterMicron}</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Housing:</span>
                  <span className="font-bold text-slate-800">{wellSystem.filterHousing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cartridge:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[160px]">{wellSystem.filterCartridgeModel}</span>
                </div>
              </div>
            </div>

            {/* 4. Softener & UV */}
            <div className="rounded-2xl bg-white border border-slate-200 p-3.5 shadow-card-soft space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[11px] font-mono-specs font-bold uppercase text-slate-500">Water Treatment</span>
                <span className="text-[10px] font-mono-specs text-slate-500">{wellSystem.waterHardnessGpg}</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Softener:</span>
                  <span className="font-bold text-slate-800">{wellSystem.softenerModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Salt Type:</span>
                  <span className="font-bold text-slate-800">{wellSystem.softenerSaltType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">UV Disinfection:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[160px]">{wellSystem.uvBulbModel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Water Quality Chemistry Log */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-card-soft space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-700">
                Water Chemistry History
              </h3>
              <span className="text-[10px] text-slate-500">Tested by Bill Pokorny</span>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-mono-specs text-[10px]">
                    <th className="py-1 text-left">Date</th>
                    <th className="py-1 text-left">Hardness</th>
                    <th className="py-1 text-left">Iron</th>
                    <th className="py-1 text-left">pH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-800">
                  {wellSystem.waterQualityLogs.map((log, i) => (
                    <tr key={i}>
                      <td className="py-2 text-slate-600 font-mono-specs text-[11px]">{log.date}</td>
                      <td className="py-2">{log.hardnessGpg}</td>
                      <td className="py-2">{log.ironPpm}</td>
                      <td className="py-2 font-bold">{log.ph}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: REMINDERS */}
      {activeTab === "reminders" && (
        <div className="space-y-3">
          <div className="rounded-2xl bg-[#0f2340]/5 border border-[#0f2340]/10 p-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Automatic Push &amp; SMS Maintenance Alerts
            </span>
            <span className="text-xs font-bold text-[#2f74b5]">Active</span>
          </div>

          {/* 1. Filter Cartridge Change */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-card-soft space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-amber-500 text-white text-[10px] font-bold mb-1">
                  Due in 14 Days
                </Badge>
                <h3 className="text-sm font-bold text-slate-900">Replace Sediment Filter Cartridge</h3>
                <p className="text-xs text-slate-500 font-mono-specs mt-0.5">
                  Pentair Big Blue 20" · Dual-Gradient 5-Micron
                </p>
              </div>
              <Droplets className="h-5 w-5 text-amber-500" />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                size="sm"
                variant={filterDone ? "secondary" : "default"}
                onClick={() => setFilterDone(!filterDone)}
                className={`text-xs rounded-xl flex-1 ${
                  filterDone ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-[#0f2340] text-white"
                }`}
              >
                {filterDone ? "✓ Changed on " + new Date().toLocaleDateString() : "Mark Replaced"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onBookServiceForItem && onBookServiceForItem("Filter Cartridge Replacement")}
                className="text-xs rounded-xl"
              >
                Request Bill
              </Button>
            </div>
          </div>

          {/* 2. Softener Salt Check */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-card-soft space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-aqua-600 text-white text-[10px] font-bold mb-1">
                  Due in 21 Days
                </Badge>
                <h3 className="text-sm font-bold text-slate-900">Refill Water Softener Salt</h3>
                <p className="text-xs text-slate-500 font-mono-specs mt-0.5">
                  Solar Salt Crystals · 2-3 Bags (40 lbs each)
                </p>
              </div>
              <Sparkles className="h-5 w-5 text-aqua-600" />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                size="sm"
                variant={saltDone ? "secondary" : "default"}
                onClick={() => setSaltDone(!saltDone)}
                className={`text-xs rounded-xl flex-1 ${
                  saltDone ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-[#0f2340] text-white"
                }`}
              >
                {saltDone ? "✓ Refilled" : "Mark Refilled"}
              </Button>
            </div>
          </div>

          {/* 3. UV Lamp Replacement */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-card-soft space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-slate-700 text-white text-[10px] font-bold mb-1">
                  Due June 2027
                </Badge>
                <h3 className="text-sm font-bold text-slate-900">Annual UV Lamp Replacement</h3>
                <p className="text-xs text-slate-500 font-mono-specs mt-0.5">
                  Viqua Sterilight S463RL (9,000 Operating Hours)
                </p>
              </div>
              <ShieldCheck className="h-5 w-5 text-slate-600" />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                size="sm"
                variant={uvDone ? "secondary" : "default"}
                onClick={() => setUvDone(!uvDone)}
                className={`text-xs rounded-xl flex-1 ${
                  uvDone ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-[#0f2340] text-white"
                }`}
              >
                {uvDone ? "✓ Logged" : "Mark Lamp Replaced"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onBookServiceForItem && onBookServiceForItem("UV Lamp Replacement")}
                className="text-xs rounded-xl"
              >
                Book with Bill
              </Button>
            </div>
          </div>

          {/* 4. Add to Apple / Google Calendar */}
          <button
            onClick={() => alert("ICS Calendar file created with maintenance schedule for Apple Calendar and Google Calendar!")}
            className="w-full h-11 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 tap-press shadow-sm"
          >
            <Calendar className="h-4 w-4 text-[#2f74b5]" />
            <span>Export Schedule to Calendar (.ics)</span>
          </button>
        </div>
      )}

      {/* SUB-TAB 3: REPORTS */}
      {activeTab === "reports" && (
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search past repairs, installed parts, or dates..."
              value={reportSearch}
              onChange={e => setReportSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {["All", "Replace", "Repair", "Install", "Maintenance"].map(cat => (
              <button
                key={cat}
                onClick={() => setReportFilter(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                  reportFilter === cat
                    ? "bg-[#0f2340] text-white border-[#0f2340] font-bold shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reports List */}
          <div className="space-y-3">
            {filteredReports.map(rep => (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className="rounded-2xl bg-white border border-slate-200 p-4 shadow-card-soft space-y-2.5 cursor-pointer hover:border-[#2f74b5] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono-specs font-bold uppercase text-slate-400">
                      {rep.id} · {rep.date}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{rep.title}</h3>
                  </div>
                  <Badge className="bg-[#2f74b5]/15 text-[#2f74b5] border-0 text-[10px] font-bold">
                    {rep.jobType}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {rep.workPerformed.join(" · ")}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="font-medium text-[#0f2340]">{rep.technician}</span>
                  <span className="text-[#2f74b5] font-bold flex items-center gap-0.5">
                    View Full Report <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORT DETAILS MODAL (Strictly inside mobile frame max-w-md) */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center pointer-events-auto">
          <div className="w-full max-w-md mx-auto max-h-[90vh] bg-white rounded-t-[28px] overflow-y-auto flex flex-col p-5 space-y-4 shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono-specs font-bold uppercase tracking-wider text-slate-500">
                  Official Service Record · {selectedReport.id}
                </span>
                <h2 className="text-base font-bold text-slate-900 leading-tight mt-0.5">
                  {selectedReport.title}
                </h2>
                <p className="text-xs text-slate-500">{selectedReport.date} · {selectedReport.technician}</p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Work Performed */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
                Work Performed
              </h4>
              <ul className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedReport.workPerformed.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipment Installed */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
                Installed Equipment
              </h4>
              <div className="space-y-2">
                {selectedReport.equipmentInstalled.map((eq, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{eq.item}</span>
                      <span className="text-[#2f74b5]">{eq.brand} {eq.model}</span>
                    </div>
                    {eq.serial && <p className="text-[10px] font-mono-specs text-slate-500">S/N: {eq.serial}</p>}
                    <p className="text-slate-600 text-[11px]">{eq.specs}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Calibrated Readings */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
                Pressure &amp; Chemistry Readings
              </h4>
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">Cut-In PSI</span>
                  <span className="text-xs font-bold text-slate-800">{selectedReport.readings.cutInPsi || "40 PSI"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Cut-Out PSI</span>
                  <span className="text-xs font-bold text-slate-800">{selectedReport.readings.cutOutPsi || "60 PSI"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Precharge</span>
                  <span className="text-xs font-bold text-slate-800">{selectedReport.readings.tankPrechargePsi || "38 PSI"}</span>
                </div>
              </div>
            </div>

            {/* Warranty Info */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-950">
              <span className="font-bold">Warranty Coverage: </span>
              {selectedReport.warrantyInfo}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <Button
                onClick={() => alert(`Downloading official PDF service invoice for ${selectedReport.id}...`)}
                className="w-full h-11 rounded-xl bg-[#0f2340] hover:bg-[#1b3459] text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" /> Download Official PDF Report
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    alert("Equipment details synced to your Well Passport!")
                    setSelectedReport(null)
                  }}
                  className="flex-1 h-10 rounded-xl text-xs"
                >
                  Sync to My Well
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    const item = selectedReport.equipmentInstalled[0]?.item || "Well System"
                    setSelectedReport(null)
                    if (onBookServiceForItem) onBookServiceForItem(item)
                  }}
                  className="flex-1 h-10 rounded-xl text-xs bg-[#2f74b5]/10 text-[#2f74b5] border-[#2f74b5]/30"
                >
                  Book Service for Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHUTOFF VALVE PHOTO MODAL (Strictly inside mobile frame max-w-md) */}
      {isPhotoViewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 pointer-events-auto">
          <div className="bg-white rounded-2xl max-w-md w-full mx-auto p-4 space-y-3 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">Main Shut-Off Valve</h3>
              <button onClick={() => setIsPhotoViewerOpen(false)}>
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src="/images/gallery-4-tanks.jpg"
                alt="Shut off valve"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">
              Yellow ball valve handle located directly to the left of the blue pressure tank tee. Turn 90 degrees to isolate home water.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

