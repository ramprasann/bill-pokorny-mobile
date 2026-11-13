import React, { useState } from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserProfile } from "@/types/auth"
import { companyData } from "@/data/company"
import { 
  User, 
  MapPin, 
  Bell, 
  MessageSquare, 
  FileText, 
  Lock, 
  Fingerprint, 
  Download, 
  HelpCircle, 
  Phone, 
  ExternalLink, 
  LogOut, 
  Trash2, 
  Check, 
  Edit3, 
  ChevronRight,
  ShieldCheck,
  Smartphone
} from "lucide-react"

interface AccountSheetProps {
  isOpen: boolean
  onClose: () => void
  user: UserProfile
  onUpdateUser: (updated: UserProfile) => void
  onOpenAuth: () => void
  onNavigateToReports: () => void
}

export const AccountSheet: React.FC<AccountSheetProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onOpenAuth,
  onNavigateToReports
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editName, setEditName] = useState(user.name)
  const [editPhone, setEditPhone] = useState(user.phone)
  const [editEmail, setEditEmail] = useState(user.email)
  const [editAddress, setEditAddress] = useState(user.address)
  const [editTown, setEditTown] = useState(user.town)

  const [showInstallInstructions, setShowInstallInstructions] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const towns = ["Weston", "Westport", "Fairfield", "Easton", "Wilton", "Redding", "Other"]

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateUser({
      ...user,
      name: editName,
      phone: editPhone,
      email: editEmail,
      address: editAddress,
      town: editTown
    })
    setIsEditingProfile(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const toggleNotification = (type: "push" | "sms" | "email") => {
    onUpdateUser({
      ...user,
      notifications: {
        ...user.notifications,
        [type]: !user.notifications[type]
      }
    })
  }

  const toggleBiometric = () => {
    onUpdateUser({
      ...user,
      security: {
        ...user.security,
        biometricEnabled: !user.security.biometricEnabled
      }
    })
  }

  const handleLogout = () => {
    onOpenAuth()
    onClose()
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={user.isGuest ? "Welcome, Guest" : "Account Settings"}
      subtitle="Bill Pokorny Pump & Filter · Weston, CT"
      maxHeight="max-h-[90vh]"
    >
      <div className="space-y-4 text-left">
        {/* Guest Banner if not logged in */}
        {user.isGuest ? (
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 p-4 text-white shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-aqua-400">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold font-sans text-white">Guest Mode</h4>
                <p className="text-xs text-slate-300">
                  Log in or Sign up to save your well equipment specs, track service requests, and view official reports.
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  onClose()
                  onOpenAuth()
                }}
                className="flex-1 bg-aqua-500 hover:bg-aqua-600 text-white font-bold"
              >
                Log In
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose()
                  onOpenAuth()
                }}
                className="flex-1 bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Sign Up
              </Button>
            </div>
          </div>
        ) : (
          /* Logged In User Profile Header */
          <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-lg font-mono-specs shadow-md ring-2 ring-aqua-500/30">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-bold text-navy-900 font-sans">{user.name}</h4>
                    <Badge variant="aqua" className="text-[10px] py-0 px-1.5">Client</Badge>
                  </div>
                  <span className="text-xs text-slate-500 block">{user.email}</span>
                  <span className="text-xs text-slate-500 font-mono-specs">{user.phone}</span>
                </div>
              </div>

              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="p-2 text-aqua-600 hover:text-aqua-700 rounded-lg hover:bg-aqua-50 tap-press"
                aria-label="Edit Profile"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>

            {savedSuccess && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Profile details saved!
              </p>
            )}

            {/* Inline Profile Editor */}
            {isEditingProfile && (
              <form onSubmit={handleSaveProfile} className="space-y-3 pt-2 border-t border-slate-200/80">
                <div>
                  <label className="block text-[11px] font-mono-specs text-slate-500 font-bold uppercase mb-1">
                    Full Name
                  </label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-mono-specs text-slate-500 font-bold uppercase mb-1">
                      Phone Number
                    </label>
                    <Input
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-specs text-slate-500 font-bold uppercase mb-1">
                      Town
                    </label>
                    <select
                      value={editTown}
                      onChange={(e) => setEditTown(e.target.value)}
                      className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs text-navy-900"
                    >
                      {towns.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-mono-specs text-slate-500 font-bold uppercase mb-1">
                    Service Street Address
                  </label>
                  <Input
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button type="submit" size="sm" variant="default" className="flex-1">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Messages from Bill Shortcut */}
        <div className="rounded-2xl bg-white border border-slate-200 p-3.5 shadow-card-soft space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-aqua-600" />
              <span className="text-xs font-bold text-navy-900 font-sans">
                Latest Message from Bill
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono-specs">Today</span>
          </div>
          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic leading-relaxed">
            "Your pressure tank pre-charge is steady at 38 PSI. Remember to verify salt pellets before Thanksgiving!" — Bill P.
          </p>
        </div>

        {/* Service History & Reports Shortcut */}
        <button
          onClick={() => {
            onClose()
            onNavigateToReports()
          }}
          className="w-full rounded-2xl bg-white border border-slate-200 p-3.5 shadow-card-soft flex items-center justify-between hover:border-aqua-400 tap-press text-left"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-aqua-50 text-aqua-600 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-navy-900 font-sans leading-tight">
                Service History &amp; Official Reports
              </span>
              <span className="text-xs text-slate-500">
                View completed jobs, warranties &amp; PDF downloads
              </span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>

        {/* Notification Preferences */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-card-soft space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-navy-900" />
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono-specs">
              Notification Preferences
            </h5>
          </div>

          <div className="space-y-2 divide-y divide-slate-100 text-xs">
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="font-semibold text-navy-900 block font-sans">Push Notifications</span>
                <span className="text-slate-500 text-[11px]">Job status alerts &amp; technician arrival</span>
              </div>
              <input
                type="checkbox"
                checked={user.notifications.push}
                onChange={() => toggleNotification("push")}
                className="h-4 w-4 accent-aqua-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-navy-900 block font-sans">SMS Text Alerts</span>
                <span className="text-slate-500 text-[11px]">Direct texts from Bill's dispatch</span>
              </div>
              <input
                type="checkbox"
                checked={user.notifications.sms}
                onChange={() => toggleNotification("sms")}
                className="h-4 w-4 accent-aqua-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-navy-900 block font-sans">Email Reports</span>
                <span className="text-slate-500 text-[11px]">Work orders, invoices &amp; PDF warranties</span>
              </div>
              <input
                type="checkbox"
                checked={user.notifications.email}
                onChange={() => toggleNotification("email")}
                className="h-4 w-4 accent-aqua-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Security Preferences */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-card-soft space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-navy-900" />
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono-specs">
              Security &amp; Biometrics
            </h5>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4 text-copper-600" />
              <div>
                <span className="font-semibold text-navy-900 block font-sans">Face ID / Fingerprint</span>
                <span className="text-slate-500 text-[11px]">Fast login on supported mobile devices</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={user.security.biometricEnabled}
              onChange={toggleBiometric}
              className="h-4 w-4 accent-copper-600 cursor-pointer"
            />
          </div>
        </div>

        {/* PWA Install Button */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-navy-900">
              <Smartphone className="h-4 w-4 text-aqua-600" />
              <span className="text-xs font-bold font-sans">Install Mobile App</span>
            </div>
            <Badge variant="copper">PWA Ready</Badge>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Add Bill Pokorny to your phone home screen for instant 1-tap SOS and offline well equipment reference.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowInstallInstructions(!showInstallInstructions)}
            className="w-full text-xs font-semibold flex items-center justify-center gap-1.5 bg-white"
          >
            <Download className="h-3.5 w-3.5" />
            How to Install on iPhone / Android
          </Button>

          {showInstallInstructions && (
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-2 mt-2">
              <div>
                <strong className="block text-navy-900 font-sans">iOS Safari:</strong>
                <span className="text-slate-600">Tap the Share icon at the bottom, then choose <strong>"Add to Home Screen"</strong>.</span>
              </div>
              <div>
                <strong className="block text-navy-900 font-sans">Android Chrome:</strong>
                <span className="text-slate-600">Tap the three dots menu in the top right, then select <strong>"Install app"</strong> or "Add to Home screen".</span>
              </div>
            </div>
          )}
        </div>

        {/* Contact & External Links */}
        <div className="space-y-1.5 pt-1">
          <a
            href={`tel:${companyData.phoneRaw}`}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-navy-900 hover:bg-slate-50 tap-press"
          >
            <div className="flex items-center gap-2 text-emerald-600">
              <Phone className="h-4 w-4" />
              <span>Direct Phone Support: (203) 671-1506</span>
            </div>
            <span className="text-[10px] font-mono-specs text-slate-400">24/7</span>
          </a>

          <a
            href="https://billpokornywestonpumpandfilter.com/index.html"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-navy-900 hover:bg-slate-50 tap-press"
          >
            <div className="flex items-center gap-2 text-aqua-600">
              <ExternalLink className="h-4 w-4" />
              <span>Visit Official Website</span>
            </div>
            <span className="text-[10px] font-mono-specs text-slate-400">Desktop Site</span>
          </a>
        </div>

        {/* Account actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-slate-600 hover:text-navy-900 font-semibold tap-press py-2"
          >
            <LogOut className="h-4 w-4 text-slate-400" />
            <span>{user.isGuest ? "Sign In / Register" : "Log Out"}</span>
          </button>

          {!user.isGuest && (
            <button
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              className="text-brandRed-600 hover:text-brandRed-700 font-semibold flex items-center gap-1 tap-press py-2"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Account</span>
            </button>
          )}
        </div>

        {showDeleteConfirm && (
          <div className="rounded-xl bg-red-50 p-3 border border-red-200 text-xs space-y-2">
            <span className="font-bold text-red-900 block">Are you sure?</span>
            <p className="text-red-800">
              This will remove your saved address, notification preferences, and local equipment records.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  onOpenAuth()
                  onClose()
                }}
                className="text-xs"
              >
                Yes, Delete
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </BottomSheet>
  )
}

