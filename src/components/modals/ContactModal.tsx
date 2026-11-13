import React, { useState } from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { companyData } from "@/data/company"
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  ShieldCheck 
} from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyToClipboard = (text: string, isPhone: boolean) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      if (isPhone) {
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
      } else {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      }
    }
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Bill Pokorny"
      subtitle="Weston, CT · CT Lic 208261"
      maxHeight="max-h-[85vh]"
    >
      <div className="space-y-4 text-left">
        {/* Availability highlight */}
        <div className="rounded-xl bg-navy-900 text-white p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono-specs uppercase tracking-wider text-emerald-400">
              Direct Owner Access
            </span>
          </div>
          <p className="text-sm font-semibold text-white">
            Bill answers the phone himself, day or night. 45 years of well expertise across Fairfield County.
          </p>
        </div>

        {/* Action items */}
        <div className="space-y-2.5">
          {/* Call button */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandRed-50 text-brandRed-600">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-mono-specs block">Direct Phone / Emergency</span>
                <a
                  href={`tel:${companyData.phoneRaw}`}
                  className="text-base font-bold text-navy-900 hover:text-brandRed-600"
                >
                  {companyData.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => copyToClipboard(companyData.phone, true)}
                className="p-2 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-100 tap-press"
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
              <a
                href={`tel:${companyData.phoneRaw}`}
                className="bg-brandRed-600 hover:bg-brandRed-700 text-white text-xs font-bold px-3 py-2 rounded-lg tap-press"
              >
                Call
              </a>
            </div>
          </div>

          {/* SMS / Text button */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-50 text-aqua-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-mono-specs block">Text Message</span>
                <span className="text-sm font-semibold text-navy-900">Send photos & address</span>
              </div>
            </div>
            <a
              href={`sms:${companyData.phoneRaw}`}
              className="bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold px-3 py-2 rounded-lg tap-press"
            >
              Text Bill
            </a>
          </div>

          {/* Email button */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-navy-700 flex-shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-mono-specs block">Email</span>
                <span className="text-xs font-semibold text-navy-900 truncate block">
                  {companyData.email}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => copyToClipboard(companyData.email, false)}
                className="p-2 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-100 tap-press"
                aria-label="Copy email"
              >
                {copiedEmail ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
              <a
                href={`mailto:${companyData.email}`}
                className="border border-slate-300 text-navy-900 hover:bg-slate-50 text-xs font-bold px-3 py-2 rounded-lg tap-press"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Credential summary */}
        <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 text-xs space-y-1.5 font-mono-specs text-slate-600">
          <div className="flex items-center gap-2 text-navy-900 font-bold">
            <ShieldCheck className="h-4 w-4 text-copper-600" />
            <span>State License & Insurance: {companyData.licenseNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>Hours: Open 24 hours, 7 days a week</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>Base: Weston, CT · Serving Fairfield County</span>
          </div>
        </div>

        <Button variant="outline" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </BottomSheet>
  )
}

