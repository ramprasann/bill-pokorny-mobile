import React, { useState } from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { companyData } from "@/data/company"
import { 
  Phone, 
  Send, 
  MessageSquare, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Trash2,
  MapPin
} from "lucide-react"

interface EstimateModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
  initialDescription?: string
}

export const EstimateModal: React.FC<EstimateModalProps> = ({
  isOpen,
  onClose,
  initialService = "Well pump repair or replacement",
  initialDescription = ""
}) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [town, setTown] = useState("Weston")
  const [service, setService] = useState(initialService)
  const [description, setDescription] = useState(initialDescription)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update if initial props change
  React.useEffect(() => {
    if (initialService) setService(initialService)
    if (initialDescription) setDescription(initialDescription)
  }, [initialService, initialDescription])

  const serviceOptions = [
    "Well pump repair or replacement",
    "Well / pressure tank",
    "Water filtration or softener",
    "Water heater",
    "Faucets & fixtures",
    "Emergency – no water",
    "Something else"
  ]

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "Please enter your name."
    if (!email.trim() && !phone.trim()) {
      errs.contact = "Please provide either a phone number or email so Bill can reach you."
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address."
    }
    if (!description.trim()) {
      errs.description = "Please tell us what's happening with your water system."
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // Save request to localStorage for offline resilience
    try {
      const existing = JSON.parse(localStorage.getItem("pokorny_requests") || "[]")
      existing.unshift({
        id: `req-${Date.now()}`,
        date: new Date().toISOString(),
        name,
        phone,
        email,
        town,
        service,
        description,
        hasPhoto: !!photoPreview
      })
      localStorage.setItem("pokorny_requests", JSON.stringify(existing))
    } catch {
      // ignore
    }

    setIsSubmitted(true)
  }

  const handleSendViaSms = () => {
    const message = `Hello Bill, estimate request from ${name || "a customer"} (${town}, CT):\nService: ${service}\nIssue: ${description}\nPhone: ${phone}\nEmail: ${email}`
    const smsUrl = `sms:${companyData.phoneRaw}?body=${encodeURIComponent(message)}`
    window.location.href = smsUrl
  }

  const resetForm = () => {
    setName("")
    setPhone("")
    setEmail("")
    setDescription("")
    setPhotoPreview(null)
    setIsSubmitted(false)
    setErrors({})
    onClose()
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={resetForm}
      title="Request a Free Estimate"
      subtitle="Fairfield County, CT · CT Lic 208261"
      maxHeight="max-h-[92vh]"
    >
      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-navy-900">
              Request Received, {name.split(" ")[0]}!
            </h4>
            <p className="mt-1 text-sm text-slate-600 max-w-xs mx-auto">
              Bill will review your well & water details and get back to you with clear options and pricing.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 font-mono-specs">Service:</span>
              <span className="font-semibold text-navy-900">{service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-mono-specs">Town:</span>
              <span className="font-semibold text-navy-900">{town}, CT</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Button
              variant="emergency"
              onClick={handleSendViaSms}
              className="w-full flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Also Text Bill Directly
            </Button>
            <Button variant="outline" onClick={resetForm} className="w-full">
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Emergency callout banner */}
          <div className="rounded-xl bg-brandRed-50 border border-brandRed-200 p-3 flex items-start gap-2.5">
            <Phone className="h-4 w-4 text-brandRed-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-brandRed-700">No-water emergency?</span>
              <p className="text-slate-600 mt-0.5">
                Skip the form and call Bill directly at{" "}
                <a
                  href={`tel:${companyData.phoneRaw}`}
                  className="font-bold text-brandRed-600 underline"
                >
                  (203) 671-1506
                </a>
                . Available 24/7.
              </p>
            </div>
          </div>

          {/* Service Needed */}
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1 font-mono-specs">
              What do you need? *
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-aqua-500"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Contact inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1 font-mono-specs">
                Your Name *
              </label>
              <Input
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-xs text-brandRed-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1 font-mono-specs">
                Town in CT
              </label>
              <div className="relative">
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-aqua-500"
                >
                  {companyData.townsServed.map((t) => {
                    const cleanTown = t.replace(" (Home Base)", "")
                    return (
                      <option key={cleanTown} value={cleanTown}>
                        {t}
                      </option>
                    )
                  })}
                  <option value="Other Fairfield Town">Other Town in Fairfield County</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1 font-mono-specs">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="(203) 555-0199"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1 font-mono-specs">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-xs text-brandRed-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {errors.contact && (
            <p className="text-xs text-brandRed-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.contact}
            </p>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1 font-mono-specs">
              Tell us what's happening *
            </label>
            <Textarea
              rows={3}
              placeholder="e.g. Water pressure dropped to a trickle, pump clicking repeatedly in the basement..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-xs text-brandRed-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.description}
              </p>
            )}
          </div>

          {/* Photo attachment from device camera/gallery */}
          <div className="rounded-xl border border-dashed border-slate-300 p-3 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-aqua-600" />
                <span className="text-xs font-semibold text-navy-900">
                  Attach Photo of Equipment / Issue
                </span>
              </div>
              <label className="cursor-pointer text-xs font-bold text-aqua-600 hover:text-aqua-700 underline">
                Browse
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {photoPreview && (
              <div className="mt-2.5 relative inline-block">
                <img
                  src={photoPreview}
                  alt="Attachment preview"
                  className="h-16 w-16 object-cover rounded-lg border border-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="absolute -top-1.5 -right-1.5 rounded-full bg-brandRed-600 text-white p-1 shadow tap-press"
                  aria-label="Remove photo"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* Submission Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <Button type="submit" variant="default" className="w-full flex items-center justify-center gap-2">
              <Send className="h-4 w-4" />
              Send Estimate Request
            </Button>

            <button
              type="button"
              onClick={handleSendViaSms}
              className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-navy-900 flex items-center justify-center gap-1.5 tap-press"
            >
              <MessageSquare className="h-3.5 w-3.5 text-aqua-600" />
              Or send directly as Text Message (SMS)
            </button>
          </div>
        </form>
      )}
    </BottomSheet>
  )
}

