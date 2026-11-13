import React, { useState } from "react"
import { 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  ZapOff, 
  Gauge, 
  Droplet, 
  Camera, 
  ShieldAlert, 
  Info,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react"
import { UserProfile } from "@/types/auth"
import { UserWellSystem } from "@/types/system"
import { Button } from "@/components/ui/button"

interface EmergencyScreenProps {
  user: UserProfile
  wellSystem: UserWellSystem
  onEmergencySubmitted?: (data: any) => void
}

const EMERGENCY_ISSUES = [
  "No water",
  "Low pressure",
  "Pump running nonstop",
  "Leak or burst pipe",
  "Pump won't turn on",
  "Other"
]

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({
  user,
  wellSystem,
  onEmergencySubmitted
}) => {
  // Form State
  const [selectedIssue, setSelectedIssue] = useState<string>("No water")
  const [breakerTripped, setBreakerTripped] = useState<boolean>(false)
  const [powerOutage, setPowerOutage] = useState<boolean>(false)
  const [gaugeZero, setGaugeZero] = useState<boolean>(true)
  const [hasHazard, setHasHazard] = useState<boolean>(false)
  
  const [name, setName] = useState<string>(user.name || "")
  const [phone, setPhone] = useState<string>(user.phone || "203-")
  const [address, setAddress] = useState<string>(user.address || wellSystem.address || "")
  const [note, setNote] = useState<string>("")
  const [photoAttached, setPhotoAttached] = useState<boolean>(false)

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isOffline] = useState<boolean>(!navigator.onLine)
  const [showGuide, setShowGuide] = useState<boolean>(true)

  // Hazard trigger: if issue is leak/burst or user notes burning/sparking/flooding
  const isHighDanger = selectedIssue === "Leak or burst pipe" || hasHazard || note.toLowerCase().includes("burn") || note.toLowerCase().includes("spark") || note.toLowerCase().includes("flood")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      issue: selectedIssue,
      breakerTripped,
      powerOutage,
      gaugeZero,
      name,
      phone,
      address,
      note,
      wellDetails: {
        wellDepth: wellSystem.wellDepthFeet,
        tank: wellSystem.tankModel,
        pressure: wellSystem.pressureSetting
      },
      timestamp: new Date().toISOString()
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      if (onEmergencySubmitted) {
        onEmergencySubmitted(payload)
      }
    }, 500)
  }

  const generateSmsBody = () => {
    return `EMERGENCY 24/7 WELL SERVICE REQUEST:
Issue: ${selectedIssue}
Name: ${name || "Resident"}
Phone: ${phone}
Address: ${address}
Checks: Breaker tripped=${breakerTripped ? "YES" : "NO"} | Power outage=${powerOutage ? "YES" : "NO"} | Gauge 0 PSI=${gaugeZero ? "YES" : "NO"}
Well: ${wellSystem.pumpType} pump, ${wellSystem.wellDepthFeet}ft depth, ${wellSystem.tankModel}
Note: ${note || "None"}`
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-4 px-4 pt-3 pb-28 text-left select-none">
      {/* 1. Top Call / Text Triggers */}
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href="tel:+12036711506"
          className="h-14 rounded-2xl bg-[#e0443a] hover:bg-[#b42a21] text-white flex items-center justify-center gap-2.5 font-bold text-sm shadow-[0_6px_20px_rgba(224,68,58,0.35)] tap-press transition-all"
        >
          <Phone className="h-5 w-5 fill-current animate-bounce" />
          <span>Call Bill Now</span>
        </a>

        <a
          href={`sms:+12036711506?body=${encodeURIComponent(generateSmsBody())}`}
          className="h-14 rounded-2xl bg-[#0f2340] hover:bg-[#1b3459] text-white flex items-center justify-center gap-2 font-bold text-sm shadow-md tap-press transition-all"
        >
          <MessageSquare className="h-5 w-5 text-aqua-400" />
          <span>Text Bill</span>
        </a>
      </div>

      {/* 2. Critical Safety Warning Line */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-2.5 flex items-start gap-2.5">
        <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-950 font-medium leading-snug min-w-0">
          <span className="font-bold text-amber-900">Safety Notice: </span>
          Never open the pump control box or touch electrical wiring. Turn off power at the breaker panel only.
        </p>
      </div>

      {/* 3. Automatic Hazard Banner (Flooding, Burning, Sparking) */}
      {isHighDanger && (
        <div className="rounded-2xl bg-brandRed-600 text-white p-3.5 shadow-lg flex items-start justify-between gap-3 animate-in fade-in zoom-in-95">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <ShieldAlert className="h-4 w-4 fill-current text-white" />
              <span>STOP &amp; CALL BILL IMMEDIATELY</span>
            </div>
            <p className="text-[11px] text-red-100 leading-snug">
              Flooding, electrical sparking, or burning smell requires immediate disconnect at your main breaker panel.
            </p>
          </div>
          <a
            href="tel:+12036711506"
            className="flex-shrink-0 bg-white text-brandRed-700 font-bold text-xs px-3 py-2 rounded-xl shadow-md"
          >
            Call 24/7
          </a>
        </div>
      )}

      {/* 4. Offline Notice */}
      {isOffline && (
        <div className="rounded-xl bg-slate-800 text-white p-3 flex items-center justify-between gap-2 text-xs">
          <span>No internet signal. Offline draft ready.</span>
          <a
            href={`sms:+12036711506?body=${encodeURIComponent(generateSmsBody())}`}
            className="text-aqua-300 font-bold underline"
          >
            Send via SMS
          </a>
        </div>
      )}

      {/* 5. Confirmation Card if Submitted */}
      {isSubmitted ? (
        <div className="rounded-2xl bg-white border border-emerald-300 p-5 shadow-card-soft text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Emergency Dispatch Sent</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Bill has received your emergency alert directly on his mobile phone with your well specifications attached.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-900 font-medium">
            ⏱️ If you don't hear back within 10 minutes, please call <a href="tel:+12036711506" className="font-bold underline text-brandRed-700">(203) 671-1506</a> directly.
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            className="text-xs w-full rounded-xl"
          >
            Submit Another Update
          </Button>
        </div>
      ) : (
        /* 6. Short 30-Second Emergency Form */
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-[#0f2340] flex items-center gap-1.5">
              <span>Emergency Service Request</span>
              <span className="text-[10px] font-mono-specs font-normal text-slate-500">(Under 30s)</span>
            </h2>
          </div>

          {/* Issue Chips */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
              Select Issue
            </label>
            <div className="flex flex-wrap gap-1.5">
              {EMERGENCY_ISSUES.map(issue => (
                <button
                  key={issue}
                  type="button"
                  onClick={() => setSelectedIssue(issue)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                    selectedIssue === issue
                      ? "bg-[#e0443a] text-white border-[#e0443a] font-bold shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
                  }`}
                >
                  {issue}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Checks (Toggles) */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
              Quick Checks
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <div className="flex items-center gap-2">
                  <ZapOff className="h-4 w-4 text-slate-600" />
                  <span className="text-xs font-medium text-slate-800">Is pump circuit breaker tripped?</span>
                </div>
                <input
                  type="checkbox"
                  checked={breakerTripped}
                  onChange={e => setBreakerTripped(e.target.checked)}
                  className="h-5 w-5 rounded text-[#2f74b5] focus:ring-[#2f74b5]"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-slate-600" />
                  <span className="text-xs font-medium text-slate-800">Is there a power outage in your area?</span>
                </div>
                <input
                  type="checkbox"
                  checked={powerOutage}
                  onChange={e => setPowerOutage(e.target.checked)}
                  className="h-5 w-5 rounded text-[#2f74b5] focus:ring-[#2f74b5]"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-slate-600" />
                  <span className="text-xs font-medium text-slate-800">Does water pressure gauge read 0 PSI?</span>
                </div>
                <input
                  type="checkbox"
                  checked={gaugeZero}
                  onChange={e => setGaugeZero(e.target.checked)}
                  className="h-5 w-5 rounded text-[#2f74b5] focus:ring-[#2f74b5]"
                />
              </label>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="text-xs font-mono-specs font-bold uppercase tracking-wider text-slate-600">
              Address &amp; Callback Number
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full min-w-0 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
              />
              <input
                type="tel"
                placeholder="Phone (203-xxx-xxxx)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="w-full min-w-0 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
              />
            </div>
            <input
              type="text"
              placeholder="Service Address (Weston / Fairfield County)"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className="w-full min-w-0 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
            />
          </div>

          {/* One-Line Note & Optional Photo */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <input
              type="text"
              placeholder="Optional one-line note (e.g. water in basement, burning smell, dog inside)..."
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full min-w-0 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setPhotoAttached(!photoAttached)}
                className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors self-start ${
                  photoAttached
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                <span>{photoAttached ? "✓ Photo Attached" : "+ Attach Gauge / Tank Photo"}</span>
              </button>
              <span className="text-[10px] text-slate-400">Specs attached automatically</span>
            </div>
          </div>

          {/* Submit Red Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#e0443a] to-[#b42a21] hover:opacity-95 text-white font-bold text-sm shadow-[0_8px_20px_rgba(215,54,44,0.35)] transition-transform active:scale-[0.98]"
          >
            {isSubmitting ? "Dispatching to Bill..." : "Send Emergency Request"}
          </Button>
        </form>
      )}

      {/* 7. Offline Emergency Survival Guide */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="w-full p-3.5 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100 text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-[#2f74b5]" />
            <span className="text-xs font-bold text-[#0f2340]">Offline Emergency Survival Steps</span>
          </div>
          {showGuide ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {showGuide && (
          <div className="p-4 space-y-3 text-xs text-slate-700 divide-y divide-slate-100">
            <div className="space-y-1">
              <p className="font-bold text-slate-900">1. Locate Your Pump Circuit Breaker</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Look for a double-pole 230-volt breaker labelled "Well Pump" in your electrical panel. If it tripped, reset once. If it trips again immediately, leave it OFF to prevent motor burnout.
              </p>
            </div>

            <div className="pt-2 space-y-1">
              <p className="font-bold text-slate-900">2. Shut Off Main Water Supply Lever</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                If there is a leak or water discharge, locate the ball valve before the filter or after the pressure tank. Turn the lever 90 degrees until perpendicular to the copper pipe.
              </p>
            </div>

            <div className="pt-2 space-y-1">
              <p className="font-bold text-slate-900">3. Avoid Running the Pump Dry</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                If the pressure switch is clicking rapidly or you hear humming with 0 PSI on the dial, shut off power to avoid frying the submersible motor deep underground.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
