import React from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SymptomGuide } from "@/data/symptoms"
import { companyData } from "@/data/company"
import { 
  Phone, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from "lucide-react"

interface SymptomModalProps {
  symptom: SymptomGuide | null
  isOpen: boolean
  onClose: () => void
  onRequestEstimate: (service: string, desc: string) => void
}

export const SymptomModal: React.FC<SymptomModalProps> = ({
  symptom,
  isOpen,
  onClose,
  onRequestEstimate
}) => {
  if (!symptom) return null

  const getUrgencyBadge = (urgency: SymptomGuide["urgency"]) => {
    switch (urgency) {
      case "emergency":
        return <Badge variant="destructive">Critical Emergency</Badge>
      case "high":
        return <Badge variant="emergency">High Priority</Badge>
      case "moderate":
        return <Badge variant="aqua">Moderate Issue</Badge>
      default:
        return <Badge variant="secondary">Maintenance</Badge>
    }
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={symptom.title}
      subtitle={`Category: ${symptom.category}`}
      maxHeight="max-h-[85vh]"
    >
      <div className="space-y-4 text-left">
        {/* Urgency status */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs text-slate-500 font-mono-specs">Urgency Status:</span>
          {getUrgencyBadge(symptom.urgency)}
        </div>

        {/* Likely Cause */}
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900 uppercase font-mono-specs mb-1">
            <HelpCircle className="h-4 w-4 text-aqua-600" />
            What's likely causing this?
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {symptom.likelyCause}
          </p>
        </div>

        {/* Quick DIY Safety Check */}
        <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase font-mono-specs mb-1">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Homeowner DIY Check
          </div>
          <p className="text-xs text-amber-950 leading-relaxed">
            {symptom.quickCheck}
          </p>
        </div>

        {/* Bill's Recommended Solution */}
        <div className="rounded-xl bg-navy-50/70 border border-navy-100 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900 uppercase font-mono-specs mb-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Recommended Trade Solution
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {symptom.recommendation}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col gap-2">
          {symptom.urgency === "emergency" ? (
            <a
              href={`tel:${companyData.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold h-12 rounded-xl shadow-float-btn tap-press text-sm"
            >
              <Phone className="h-4 w-4 fill-current" />
              Call Bill Immediately · (203) 671-1506
            </a>
          ) : (
            <Button
              variant="default"
              onClick={() => {
                onClose()
                onRequestEstimate(symptom.category, symptom.prefillRequest)
              }}
              className="w-full flex items-center justify-center gap-2"
            >
              <Wrench className="h-4 w-4" />
              Request Estimate for this Issue
            </Button>
          )}

          <Button variant="ghost" onClick={onClose} className="w-full text-xs">
            Dismiss
          </Button>
        </div>
      </div>
    </BottomSheet>
  )
}

