import React, { useState } from "react"
import { 
  CalendarPlus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  Mic, 
  MicOff, 
  Upload, 
  X, 
  Calendar, 
  MapPin, 
  FileText, 
  Wrench, 
  RefreshCw, 
  PlusCircle, 
  Sparkles,
  ChevronRight,
  MessageSquare,
  Phone,
  Trash2,
  ShieldCheck
} from "lucide-react"
import { BookingType, BookingStatus, ServiceRequest, initialRequests } from "@/types/booking"
import { UserProfile } from "@/types/auth"
import { UserWellSystem } from "@/types/system"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BookScreenProps {
  user: UserProfile
  wellSystem: UserWellSystem
  requests: ServiceRequest[]
  onRequestCreated: (newReq: ServiceRequest) => void
  onRequestUpdated: (updatedReq: ServiceRequest) => void
  onOpenAuth: () => void
  initialType?: BookingType
  defaultSubTab?: "book" | "requests"
}

const REQUEST_TYPES: { type: BookingType; icon: any; title: string; desc: string; popularItems: string[] }[] = [
  {
    type: "New Install",
    icon: PlusCircle,
    title: "New Install",
    desc: "Complete new equipment installation",
    popularItems: ["Submersible Well Pump", "Pressure Tank (Well-X-Trol)", "Water Softener System", "Whole-House Big Blue Filter", "UV Disinfection System", "Constant Pressure VFD", "Water Heater"]
  },
  {
    type: "Replace",
    icon: RefreshCw,
    title: "Replace",
    desc: "Upgrade aged, failed, or waterlogged units",
    popularItems: ["Well Pump (Preselect from My Well)", "Pressure Tank", "Filter Cartridges (5-Micron)", "Softener Resin / Control Head", "UV Lamp (S463RL)", "Pressure Switch (40/60)"]
  },
  {
    type: "Repair",
    icon: Wrench,
    title: "Repair",
    desc: "Diagnose and fix operating issues",
    popularItems: ["Low Water Pressure", "Pump Short-Cycling (Rapid Clicking)", "Noisy / Rattling Pump", "Pipe or Tank Tee Leak", "Faulty Pressure Switch", "Circuit Breaker Tripping"]
  },
  {
    type: "Maintenance / Water Test",
    icon: Sparkles,
    title: "Maintenance / Water Test",
    desc: "Preventative checks and lab-grade testing",
    popularItems: ["Annual Well & Pump Inspection", "Hardness & Iron Water Quality Test", "UV Lamp Quartz Sleeve Cleaning", "Pressure Tank Pre-charge Calibration", "Well Sanitization / Shocking"]
  }
]

export const BookScreen: React.FC<BookScreenProps> = ({
  user,
  wellSystem,
  requests,
  onRequestCreated,
  onRequestUpdated,
  onOpenAuth,
  initialType = "Repair",
  defaultSubTab = "book"
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"book" | "requests">(defaultSubTab)

  React.useEffect(() => {
    if (defaultSubTab) {
      setActiveSubTab(defaultSubTab)
    }
  }, [defaultSubTab])
  const [selectedType, setSelectedType] = useState<BookingType>(initialType)
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [customItem, setCustomItem] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [photos, setPhotos] = useState<string[]>([])
  const [isRecordingAudio, setIsRecordingAudio] = useState(false)
  const [hasAudio, setHasAudio] = useState(false)
  const [audioSeconds, setAudioSeconds] = useState(0)
  const [preferredDate, setPreferredDate] = useState<string>(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split("T")[0]
  })
  const [preferredTime, setPreferredTime] = useState<"Morning (8am - 12pm)" | "Afternoon (12pm - 4pm)" | "Anytime">("Morning (8am - 12pm)")
  const [address, setAddress] = useState<string>(user.address || wellSystem.address || "144 Valley Forge Rd")
  const [town, setTown] = useState<string>(user.town || wellSystem.town || "Weston")
  const [notes, setNotes] = useState<string>("")
  const [attachWellDetails, setAttachWellDetails] = useState<boolean>(true)
  
  // Requests Filter
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Completed" | "Cancelled">("All")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null)

  // Audio recording simulation
  const handleToggleRecord = () => {
    if (isRecordingAudio) {
      setIsRecordingAudio(false)
      setHasAudio(true)
    } else {
      setIsRecordingAudio(true)
      setAudioSeconds(0)
      let sec = 0
      const timer = setInterval(() => {
        sec += 1
        setAudioSeconds(sec)
        if (sec >= 5) {
          clearInterval(timer)
          setIsRecordingAudio(false)
          setHasAudio(true)
        }
      }, 1000)
    }
  }

  // Simulated photo upload
  const handleAddPhoto = () => {
    const mockPhotos = [
      "/images/gallery-4-tanks.jpg",
      "/images/gallery-3-pumps.jpg",
      "/images/hero-1-service-truck.jpg"
    ]
    const chosen = mockPhotos[photos.length % mockPhotos.length]
    setPhotos([...photos, chosen])
  }

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx))
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem && !customItem) {
      alert("Please select or enter an equipment item.")
      return
    }

    setIsSubmitting(true)

    const finalItem = selectedItem === "Other (Specify)" ? customItem : (selectedItem || customItem || "General Well Service")
    const newReq: ServiceRequest = {
      id: `REQ-${Math.floor(2000 + Math.random() * 8000)}`,
      type: selectedType,
      item: finalItem,
      description: description || `Request for ${finalItem}`,
      photos,
      hasAudio,
      preferredDate,
      preferredTime,
      address,
      town,
      notes,
      attachWellDetails,
      status: "Received",
      scheduledFor: `${preferredDate} · ${preferredTime}`,
      technicianNotes: "Request received. Bill will review and confirm schedule.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setTimeout(() => {
      onRequestCreated(newReq)
      setIsSubmitting(false)
      setSubmittedNotice(newReq.id)
      setActiveSubTab("requests")
      // Reset form
      setSelectedItem("")
      setCustomItem("")
      setDescription("")
      setPhotos([])
      setHasAudio(false)
      setNotes("")
    }, 600)
  }

  const filteredRequests = requests.filter(r => {
    if (statusFilter === "All") return true
    if (statusFilter === "Active") return r.status === "Received" || r.status === "Scheduled" || r.status === "On the way" || r.status === "In progress"
    if (statusFilter === "Completed") return r.status === "Completed"
    if (statusFilter === "Cancelled") return r.status === "Cancelled"
    return true
  })

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "Received":
        return <Badge className="bg-slate-700 text-white">Received</Badge>
      case "Scheduled":
        return <Badge className="bg-[#2f74b5] text-white">Scheduled</Badge>
      case "On the way":
        return <Badge className="bg-amber-600 text-white animate-pulse">On the way</Badge>
      case "In progress":
        return <Badge className="bg-blue-600 text-white">In progress</Badge>
      case "Completed":
        return <Badge className="bg-emerald-600 text-white">Completed</Badge>
      case "Cancelled":
        return <Badge className="bg-slate-400 text-white">Cancelled</Badge>
    }
  }

  const steps: BookingStatus[] = ["Received", "Scheduled", "On the way", "In progress", "Completed"]

  return (
    <div className="space-y-4 px-4 pt-3 pb-28 text-left select-none">
      {/* Top Segment Controller */}
      <div className="flex rounded-xl bg-slate-200/80 p-1 shadow-inner border border-slate-300/50">
        <button
          onClick={() => setActiveSubTab("book")}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all ${
            activeSubTab === "book"
              ? "bg-white text-[#0f2340] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Book Service
        </button>
        <button
          onClick={() => setActiveSubTab("requests")}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "requests"
              ? "bg-white text-[#0f2340] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>My Requests</span>
          <span className="flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#2f74b5] text-[10px] font-bold text-white">
            {requests.length}
          </span>
        </button>
      </div>

      {submittedNotice && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-3.5 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 space-y-1">
            <p className="font-bold">Request {submittedNotice} Submitted Successfully!</p>
            <p className="text-emerald-800 leading-relaxed">
              Bill has been notified directly with your well specs attached. You will receive an SMS and push notification once your appointment is confirmed.
            </p>
          </div>
          <button 
            onClick={() => setSubmittedNotice(null)} 
            className="text-emerald-700 hover:text-emerald-900 p-1 ml-auto"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* VIEW 1: BOOK SERVICE FORM */}
      {activeSubTab === "book" && (
        <form onSubmit={handleSubmitRequest} className="space-y-4">

          {/* 1. Request Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
              1. Select Service Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {REQUEST_TYPES.map(item => {
                const Icon = item.icon
                const isSelected = selectedType === item.type
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      setSelectedType(item.type)
                      setSelectedItem("")
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-[#0f2340] text-white border-[#0f2340] shadow-md scale-[1.01]"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`h-4 w-4 ${isSelected ? "text-aqua-300" : "text-[#2f74b5]"}`} />
                      <span className="text-xs font-bold leading-tight truncate">{item.title}</span>
                    </div>
                    <p className={`text-[10px] leading-snug line-clamp-2 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {item.desc}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Item Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
                2. Choose Equipment or Issue
              </label>
              <span className="text-[10px] text-slate-500">Tap to select</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {REQUEST_TYPES.find(t => t.type === selectedType)?.popularItems.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSelectedItem(item)
                    setCustomItem("")
                  }}
                  className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                    selectedItem === item
                      ? "bg-[#2f74b5] text-white border-[#2f74b5] font-semibold shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelectedItem("Other (Specify)")}
                className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                  selectedItem === "Other (Specify)"
                    ? "bg-[#2f74b5] text-white border-[#2f74b5] font-semibold"
                    : "bg-white text-slate-600 border-slate-200 font-medium"
                }`}
              >
                + Other
              </button>
            </div>

            {(selectedItem === "Other (Specify)" || !selectedItem) && (
              <input
                type="text"
                placeholder="Or type equipment name / specific issue..."
                value={customItem}
                onChange={e => setCustomItem(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2f74b5]"
              />
            )}
          </div>

          {/* 3. Description & Diagnostics */}
          <div className="space-y-2">
            <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
              3. Description &amp; Symptoms
            </label>
            <textarea
              rows={3}
              placeholder="Describe what is happening (e.g. pressure surging, leak near pressure switch, sediment in water, clicking noise)..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2f74b5]"
            />
          </div>

          {/* 4. Photos & 5-Second Audio */}
          <div className="space-y-2">
            <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
              4. Photos &amp; Audio Diagnosis (Optional)
            </label>
            
            <div className="grid grid-cols-2 gap-2">
              {/* Photo Upload Simulation */}
              <button
                type="button"
                onClick={handleAddPhoto}
                className="h-18 border-2 border-dashed border-slate-300 hover:border-[#2f74b5] bg-white rounded-xl flex flex-col items-center justify-center p-2 text-slate-600 hover:text-[#2f74b5] transition-colors"
              >
                <Camera className="h-5 w-5 mb-1" />
                <span className="text-[11px] font-semibold">Attach Photo / Tag</span>
                <span className="text-[9px] text-slate-400">Pump, tank label, gauge</span>
              </button>

              {/* 5-Second Audio Simulation */}
              <button
                type="button"
                onClick={handleToggleRecord}
                className={`h-18 border-2 rounded-xl flex flex-col items-center justify-center p-2 transition-all ${
                  isRecordingAudio
                    ? "border-brandRed-500 bg-red-50 text-brandRed-600 animate-pulse"
                    : hasAudio
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-dashed border-slate-300 bg-white text-slate-600 hover:text-[#2f74b5]"
                }`}
              >
                {isRecordingAudio ? (
                  <>
                    <Mic className="h-5 w-5 mb-1 animate-bounce" />
                    <span className="text-[11px] font-bold">Recording... {audioSeconds}s</span>
                    <span className="text-[9px]">Capturing pump sound</span>
                  </>
                ) : hasAudio ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 mb-1 text-emerald-600" />
                    <span className="text-[11px] font-bold text-emerald-800">5s Audio Attached</span>
                    <span className="text-[9px] text-emerald-600">Tap to re-record</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mb-1" />
                    <span className="text-[11px] font-semibold">Record Sound</span>
                    <span className="text-[9px] text-slate-400">5s pump noise clip</span>
                  </>
                )}
              </button>
            </div>

            {/* Photos Preview Tray */}
            {photos.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-1">
                {photos.map((src, i) => (
                  <div key={i} className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
                    <img src={src} alt="Attached" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(i)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Date & Time Preferences */}
          <div className="space-y-2">
            <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
              5. Preferred Date &amp; Window
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-slate-300 rounded-xl px-3 py-2">
                <span className="text-[10px] text-slate-500 font-mono-specs uppercase block">Date</span>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                />
              </div>

              <div className="bg-white border border-slate-300 rounded-xl px-3 py-2">
                <span className="text-[10px] text-slate-500 font-mono-specs uppercase block">Window</span>
                <select
                  value={preferredTime}
                  onChange={e => setPreferredTime(e.target.value as any)}
                  className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                >
                  <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
                  <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                  <option value="Anytime">Anytime during day</option>
                </select>
              </div>
            </div>
          </div>

          {/* 6. Address & Access Notes */}
          <div className="space-y-2">
            <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
              6. Service Address &amp; Access Notes
            </label>
            <div className="bg-white border border-slate-300 rounded-xl p-3 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
                />
                <select
                  value={town}
                  onChange={e => setTown(e.target.value)}
                  className="w-28 text-xs border border-slate-200 rounded-lg px-2 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
                >
                  <option value="Weston">Weston</option>
                  <option value="Westport">Westport</option>
                  <option value="Fairfield">Fairfield</option>
                  <option value="Easton">Easton</option>
                  <option value="Wilton">Wilton</option>
                  <option value="Redding">Redding</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Access notes: gate code, dogs inside, basement cellar door..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
              />
            </div>
          </div>

          {/* 7. Auto-attach My Well Specs Toggle */}
          <div className="rounded-xl bg-[#0f2340]/5 border border-[#0f2340]/15 p-3 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#2f74b5]" />
                <span className="text-xs font-bold text-[#0f2340]">Auto-attach My Well System Specs</span>
              </div>
              <p className="text-[10px] text-slate-600">
                Attaches your pump depth ({wellSystem.wellDepthFeet}ft), tank ({wellSystem.tankModel}), &amp; pressure setting ({wellSystem.pressureSetting}) so Bill brings exact parts.
              </p>
            </div>
            <input
              type="checkbox"
              checked={attachWellDetails}
              onChange={e => setAttachWellDetails(e.target.checked)}
              className="h-5 w-5 rounded text-[#2f74b5] focus:ring-[#2f74b5]"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 rounded-2xl bg-[#0f2340] hover:bg-[#1b3459] text-white font-bold text-sm shadow-card-soft transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" /> Submitting to Bill...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CalendarPlus className="h-5 w-5 text-aqua-400" />
                Submit Service Request
              </span>
            )}
          </Button>
        </form>
      )}

      {/* VIEW 2: MY REQUESTS LIST */}
      {activeSubTab === "requests" && (
        <div className="space-y-3">
          {/* Status Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(["All", "Active", "Completed", "Cancelled"] as const).map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                  statusFilter === f
                    ? "bg-[#0f2340] text-white border-[#0f2340] font-bold shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-medium"
                }`}
              >
                {f} ({
                  f === "All" 
                    ? requests.length 
                    : f === "Active" 
                    ? requests.filter(r => r.status !== "Completed" && r.status !== "Cancelled").length 
                    : requests.filter(r => r.status === f).length
                })
              </button>
            ))}
          </div>

          {filteredRequests.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center space-y-2">
              <CalendarPlus className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No requests found</p>
              <p className="text-xs text-slate-500">
                You have no requests matching the "{statusFilter}" filter.
              </p>
              <Button
                size="sm"
                onClick={() => setActiveSubTab("book")}
                className="mt-2 text-xs bg-[#2f74b5] text-white rounded-xl"
              >
                Create New Request
              </Button>
            </div>
          ) : (
            filteredRequests.map(req => {
              const currentStepIdx = steps.indexOf(req.status)
              return (
                <div 
                  key={req.id}
                  className="rounded-2xl bg-white border border-slate-200 p-4 shadow-card-soft space-y-3"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-mono-specs font-bold uppercase tracking-wider text-slate-500">
                          {req.id} · {req.type}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {req.item}
                      </h3>
                    </div>
                    {getStatusBadge(req.status)}
                  </div>

                  {/* Status Timeline Stepper */}
                  {req.status !== "Cancelled" && (
                    <div className="pt-1 pb-1">
                      <div className="flex items-center justify-between relative">
                        <div className="absolute left-2 right-2 top-2 h-0.5 bg-slate-200 -z-0" />
                        <div 
                          className="absolute left-2 top-2 h-0.5 bg-[#2f74b5] -z-0 transition-all duration-300" 
                          style={{ width: `${Math.max(0, Math.min(100, (currentStepIdx / 4) * 100))}%` }}
                        />
                        {steps.map((st, i) => {
                          const isDone = i <= currentStepIdx
                          const isCurrent = i === currentStepIdx
                          return (
                            <div key={st} className="flex flex-col items-center z-10">
                              <span 
                                className={`h-4 w-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${
                                  isCurrent
                                    ? "bg-[#2f74b5] text-white ring-4 ring-[#2f74b5]/20 scale-110"
                                    : isDone
                                    ? "bg-[#2f74b5] text-white"
                                    : "bg-slate-200 text-slate-500"
                                }`}
                              >
                                {isDone ? "✓" : i + 1}
                              </span>
                              <span className={`text-[9px] mt-1 tracking-tight font-medium ${isCurrent ? "text-[#2f74b5] font-bold" : "text-slate-400"}`}>
                                {st}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    {req.description}
                  </p>

                  {/* Technician Notes or ETA */}
                  {req.technicianNotes && (
                    <div className="rounded-xl bg-[#2f74b5]/5 border border-[#2f74b5]/15 p-2.5 flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-[#2f74b5] flex-shrink-0 mt-0.5" />
                      <div className="text-[11px] text-slate-700">
                        <span className="font-bold text-[#0f2340]">Bill's Update: </span>
                        {req.technicianNotes}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {req.scheduledFor || req.preferredDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {req.address}, {req.town}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="tel:+12036711506"
                      className="flex-1 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f2340] text-xs font-semibold flex items-center justify-center gap-1.5 tap-press"
                    >
                      <Phone className="h-3.5 w-3.5" /> Call Bill
                    </a>
                    <a
                      href={`sms:+12036711506?body=${encodeURIComponent(`Hi Bill, checking on my request ${req.id} for ${req.item}`)}`}
                      className="flex-1 h-8 rounded-xl bg-[#2f74b5] hover:bg-[#255f96] text-white text-xs font-semibold flex items-center justify-center gap-1.5 tap-press"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> Message Bill
                    </a>
                    {req.status !== "Completed" && req.status !== "Cancelled" && (
                      <button
                        onClick={() => {
                          if (confirm(`Cancel request ${req.id}?`)) {
                            onRequestUpdated({ ...req, status: "Cancelled", updatedAt: new Date().toISOString() })
                          }
                        }}
                        className="h-8 px-2.5 rounded-xl border border-red-200 text-brandRed-600 hover:bg-red-50 text-xs font-semibold tap-press"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

