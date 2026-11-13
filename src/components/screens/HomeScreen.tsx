import React from "react"
import { 
  CalendarPlus, 
  Siren, 
  Droplets, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  ChevronRight, 
  MessageSquare, 
  ShieldCheck, 
  Gauge, 
  Sparkles,
  ArrowRight,
  ArrowUpRight
} from "lucide-react"
import { ServiceRequest } from "@/types/booking"
import { UserWellSystem } from "@/types/system"
import { UserProfile } from "@/types/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HomeScreenProps {
  user: UserProfile
  activeRequest?: ServiceRequest
  wellSystem: UserWellSystem
  onNavigateToTab: (tab: "home" | "book" | "emergency" | "my-well") => void
  onNavigateToReports: () => void
  onOpenAuth: () => void
  onNavigateToRequests?: () => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  activeRequest,
  wellSystem,
  onNavigateToTab,
  onNavigateToReports,
  onOpenAuth,
  onNavigateToRequests
}) => {
  const getStatusColor = (status: ServiceRequest["status"]) => {
    switch (status) {
      case "On the way":
        return "bg-amber-500 text-white"
      case "In progress":
        return "bg-blue-600 text-white"
      case "Completed":
        return "bg-emerald-600 text-white"
      case "Scheduled":
        return "bg-aqua-600 text-white"
      default:
        return "bg-slate-700 text-white"
    }
  }

  const steps: ServiceRequest["status"][] = ["Received", "Scheduled", "On the way", "In progress", "Completed"]
  const currentStepIndex = activeRequest ? steps.indexOf(activeRequest.status) : -1

  return (
    <div className="space-y-4 px-4 pt-4 pb-28 text-left select-none">
      {/* Tellervo-Style Featured Bill Pokorny Box */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-br from-[#071322] via-[#0c1f36] to-[#071322] p-4 sm:p-5 text-white">
        {/* Subtle background ambient texture */}
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('/images/gallery-7-pumps.jpg')` }}
        />
        
        <div className="relative z-10 flex items-start justify-between gap-3">
          {/* Left Column: Badge, Category, Title, Description */}
          <div className="flex-1 min-w-0">
            {/* Top Badge (like ● MOST SELLING in Tellervo) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono-specs font-bold text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>24/7 EMERGENCY READY</span>
            </div>

            {/* Category (like BEAR in Tellervo) */}
            <p className="text-[10px] font-mono-specs font-bold uppercase tracking-wider text-copper-300 mt-2.5">
              WESTON, CT · 45+ YRS EXPERT
            </p>

            {/* Title (like Soft drink 1 in Tellervo) */}
            <h2 className="text-lg sm:text-xl font-bold font-sans text-white tracking-tight leading-snug mt-0.5">
              Bill Pokorny
            </h2>

            {/* Description (like product description in Tellervo) */}
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mt-1">
              Direct master well pump diagnostics, Well-X-Trol tanks &amp; filtration. No answering service delays.
            </p>
          </div>

          {/* Right Column: Rounded Square Image Thumbnail (like in Tellervo) */}
          <div className="relative h-24 w-24 sm:h-26 sm:w-26 rounded-2xl overflow-hidden border border-white/20 shadow-lg flex-shrink-0 bg-slate-800">
            <img
              src="/images/gallery-7-pumps.jpg"
              alt="Well Pump Equipment"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Row: Spec on Left, White Pill Button on Right (like €25.00 / Checkout ↗ in Tellervo) */}
        <div className="relative z-10 flex items-center justify-between gap-2 pt-3 mt-3 border-t border-white/10">
          <div>
            <span className="text-base font-bold font-mono-specs text-white block leading-tight">
              CT Lic 208261
            </span>
            <span className="text-[10px] text-slate-400 font-mono-specs">
              24/7 Direct Dispatch
            </span>
          </div>

          <a
            href="tel:+12036711506"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0f2340] hover:bg-slate-100 font-bold text-xs shadow-md tap-press transition-all"
          >
            <span>Call Bill</span>
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>

      {/* Active Job Card (Image 2) */}
      {activeRequest && activeRequest.status !== "Completed" && activeRequest.status !== "Cancelled" ? (
        <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                <span className="text-[11px] font-mono-specs font-bold uppercase tracking-wider text-amber-700">
                  Active Service Request · {activeRequest.id}
                </span>
              </div>
              <h2 className="text-base font-bold text-navy-900 font-sans leading-tight">
                {activeRequest.item}
              </h2>
            </div>
            <span className={`text-[10px] font-bold font-mono-specs px-2.5 py-1 rounded-full ${getStatusColor(activeRequest.status)}`}>
              {activeRequest.status}
            </span>
          </div>

          {/* Progress Timeline Stepper */}
          <div className="pt-1">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${Math.max(0, (currentStepIndex / (steps.length - 1)) * 100)}%` }}
              />
              {steps.map((st, i) => {
                const isPassed = i <= currentStepIndex
                const isCurrent = i === currentStepIndex
                return (
                  <div key={st} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`h-4 w-4 rounded-full border-2 transition-all flex items-center justify-center ${
                        isCurrent
                          ? "bg-amber-500 border-white ring-2 ring-amber-400"
                          : isPassed
                          ? "bg-amber-500 border-white"
                          : "bg-slate-200 border-white"
                      }`}
                    />
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-[10px] font-mono-specs text-slate-500 pt-1.5">
              <span>Received</span>
              <span>Scheduled</span>
              <span className="text-amber-700 font-bold">En Route</span>
              <span>In Progress</span>
              <span>Done</span>
            </div>
          </div>

          {/* Technician Status Box */}
          <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3 flex items-start gap-2.5 text-xs">
            <Truck className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-amber-950">
              <span className="font-bold block">Bill is on the way · ETA 10:45 AM</span>
              <p className="text-[11px] text-amber-900 leading-snug">
                {activeRequest.technicianNotes || "Equipped with replacement pressure switch and calibration tools."}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (onNavigateToRequests) {
                onNavigateToRequests()
              } else {
                onNavigateToTab("book")
              }
            }}
            className="w-full text-xs font-semibold text-aqua-600 hover:text-aqua-700 flex items-center justify-center gap-1 pt-1 tap-press"
          >
            <span>View Full Request Details</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        /* Empty State for Active Service */
        <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-navy-900 font-sans block">
              No Active Service Orders
            </span>
            <p className="text-xs text-slate-500">
              Your well &amp; pressure tank system is running normally.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigateToTab("book")}
            className="text-xs font-bold shrink-0 border-aqua-500/30 text-aqua-600 hover:bg-aqua-50"
          >
            Book Service
          </Button>
        </div>
      )}

      {/* 4 Quick Actions Grid */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono-specs mb-2">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigateToTab("book")}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft text-left hover:border-aqua-400 tap-press transition-colors"
          >
            <div className="h-10 w-10 rounded-xl bg-aqua-50 text-aqua-600 flex items-center justify-center mb-2">
              <CalendarPlus className="h-5 w-5" />
            </div>
            <span className="block text-sm font-bold text-navy-900 font-sans leading-tight">
              Book Service
            </span>
            <span className="text-[11px] text-slate-500">Install, repair or test</span>
          </button>

          <button
            onClick={() => onNavigateToTab("emergency")}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft text-left hover:border-brandRed-400 tap-press transition-colors"
          >
            <div className="h-10 w-10 rounded-xl bg-brandRed-50 text-brandRed-600 flex items-center justify-center mb-2">
              <Siren className="h-5 w-5" />
            </div>
            <span className="block text-sm font-bold text-navy-900 font-sans leading-tight">
              SOS Emergency
            </span>
            <span className="text-[11px] text-slate-500">24/7 No-water dispatch</span>
          </button>

          <button
            onClick={() => onNavigateToTab("my-well")}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft text-left hover:border-copper-400 tap-press transition-colors"
          >
            <div className="h-10 w-10 rounded-xl bg-copper-50 text-copper-600 flex items-center justify-center mb-2">
              <Droplets className="h-5 w-5" />
            </div>
            <span className="block text-sm font-bold text-navy-900 font-sans leading-tight">
              My Well
            </span>
            <span className="text-[11px] text-slate-500">Equipment &amp; specs</span>
          </button>

          <button
            onClick={onNavigateToReports}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft text-left hover:border-slate-400 tap-press transition-colors"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-100 text-navy-800 flex items-center justify-center mb-2">
              <FileText className="h-5 w-5" />
            </div>
            <span className="block text-sm font-bold text-navy-900 font-sans leading-tight">
              Reports
            </span>
            <span className="text-[11px] text-slate-500">Past jobs &amp; warranties</span>
          </button>
        </div>
      </div>

      {/* Latest Message from Bill */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-navy-950 text-white p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-emerald-400" />
            <span className="font-bold font-sans text-white">Latest Message from Bill</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono-specs">Today 9:15 AM</span>
        </div>
        <p className="text-xs text-slate-300 italic leading-relaxed">
          "Checked your well pre-charge reading (38 PSI). System is running smoothly. Let me know if you need replacement salt or pre-winter pipe insulation." — Bill P.
        </p>
      </div>

      {/* Water Health Summary from My Well */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-navy-900" />
            <h3 className="text-xs font-bold text-navy-900 font-sans uppercase tracking-wider">
              Water Health Summary
            </h3>
          </div>
          <button
            onClick={() => onNavigateToTab("my-well")}
            className="text-[11px] font-semibold text-aqua-600 flex items-center gap-0.5"
          >
            <span>My Well</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <span className="block text-[10px] text-slate-400 font-mono-specs">Last Filter</span>
            <span className="font-bold text-navy-900 text-xs font-sans">Oct 12, 2026</span>
            <span className="block text-[9px] text-emerald-600 font-medium">Clean</span>
          </div>
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <span className="block text-[10px] text-slate-400 font-mono-specs">Hardness</span>
            <span className="font-bold text-navy-900 text-xs font-sans">{wellSystem.waterHardnessGpg}</span>
            <span className="block text-[9px] text-aqua-600 font-medium">Softened</span>
          </div>
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <span className="block text-[10px] text-slate-400 font-mono-specs">Pressure</span>
            <span className="font-bold text-navy-900 text-xs font-sans">{wellSystem.pressureSetting}</span>
            <span className="block text-[9px] text-emerald-600 font-medium">Optimal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
