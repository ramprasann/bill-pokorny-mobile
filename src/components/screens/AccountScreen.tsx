import React, { useState } from "react"
import { Button } from "@/components/ui/button"
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
  Smartphone,
  Save,
  X
} from "lucide-react"

interface AccountScreenProps {
  user: UserProfile
  onUpdateUser: (updated: UserProfile) => void
  onOpenAuth: () => void
  onNavigateToReports: () => void
  onReplayOnboarding?: () => void
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  user,
  onUpdateUser,
  onOpenAuth,
  onNavigateToReports,
  onReplayOnboarding
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
    setTimeout(() => setSavedSuccess(false), 2500)
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

  return (
    <div className="space-y-4 px-4 pt-3 pb-32 text-left select-none animate-in fade-in duration-200">
      {savedSuccess && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-3 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* User Profile Summary Card */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[#0f2340] text-white flex items-center justify-center font-mono-specs font-bold text-base shadow-sm">
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-base text-navy-900 font-sans leading-tight">
                    {user.name}
                  </h4>
                  <Badge variant="aqua" className="text-[9px] font-mono-specs">
                    Client
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">{user.email}</p>
                <p className="text-xs text-slate-600 font-mono-specs">{user.phone}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="p-2 rounded-full text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
              aria-label="Edit Profile"
            >
              {isEditingProfile ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            </button>
          </div>

          {/* Inline Edit Profile Form */}
          {isEditingProfile && (
            <form onSubmit={handleSaveProfile} className="pt-2 border-t border-slate-100 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-mono-specs block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-mono-specs block mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    required
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-mono-specs block mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  required
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-[10px] text-slate-500 font-mono-specs block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={e => setEditAddress(e.target.value)}
                    required
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-mono-specs block mb-1">Town</label>
                  <select
                    value={editTown}
                    onChange={e => setEditTown(e.target.value)}
                    className="w-full text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#2f74b5]"
                  >
                    {towns.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-[#0f2340] text-white hover:bg-[#1b3459] text-xs h-8 rounded-lg flex-1 flex items-center justify-center gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" /> Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingProfile(false)}
                  className="text-xs h-8 rounded-lg px-3"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {!isEditingProfile && (
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
              <span>{user.address}, {user.town}, CT</span>
            </div>
          )}
        </div>

      {/* Latest Message From Bill Shortcut */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#2f74b5]" />
            <span className="text-xs font-bold text-navy-900 font-sans uppercase tracking-wider">
              Latest Message from Bill
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono-specs">Today</span>
        </div>
        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic leading-relaxed">
          "Your pressure tank pre-charge is steady at 38 PSI. Remember to verify salt pellets before Thanksgiving!" — Bill P.
        </p>
      </div>

      {/* Service History Shortcut */}
      <button
        onClick={onNavigateToReports}
        className="w-full rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft flex items-center justify-between hover:border-[#2f74b5] transition-colors tap-press text-left"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#2f74b5] flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy-900 font-sans leading-tight">
              Service History &amp; Official Reports
            </h4>
            <p className="text-[11px] text-slate-500">View completed jobs, warranties &amp; PDF downloads</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>

      {/* Notification Preferences */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
          <Bell className="h-4 w-4 text-navy-900" />
          <h4 className="text-xs font-bold text-navy-900 font-sans uppercase tracking-wider">
            Notification Preferences
          </h4>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-navy-900 block font-sans">Push Notifications</span>
              <span className="text-[11px] text-slate-500">Job status alerts &amp; technician arrival</span>
            </div>
            <input
              type="checkbox"
              checked={user.notifications.push}
              onChange={() => toggleNotification("push")}
              className="h-4 w-4 rounded text-[#2f74b5] focus:ring-[#2f74b5]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-navy-900 block font-sans">SMS Text Alerts</span>
              <span className="text-[11px] text-slate-500">Direct texts from Bill's dispatch</span>
            </div>
            <input
              type="checkbox"
              checked={user.notifications.sms}
              onChange={() => toggleNotification("sms")}
              className="h-4 w-4 rounded text-[#2f74b5] focus:ring-[#2f74b5]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-navy-900 block font-sans">Email Reports</span>
              <span className="text-[11px] text-slate-500">Work orders, invoices &amp; PDF warranties</span>
            </div>
            <input
              type="checkbox"
              checked={user.notifications.email}
              onChange={() => toggleNotification("email")}
              className="h-4 w-4 rounded text-[#2f74b5] focus:ring-[#2f74b5]"
            />
          </div>
        </div>
      </div>

      {/* Security & Biometrics */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
          <Lock className="h-4 w-4 text-navy-900" />
          <h4 className="text-xs font-bold text-navy-900 font-sans uppercase tracking-wider">
            Security &amp; Biometrics
          </h4>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Fingerprint className="h-5 w-5 text-copper-600" />
            <div>
              <span className="font-semibold text-navy-900 block font-sans">Face ID / Fingerprint</span>
              <span className="text-[11px] text-slate-500">Fast login on supported mobile devices</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={user.security.biometricEnabled}
            onChange={toggleBiometric}
            className="h-4 w-4 rounded text-[#2f74b5] focus:ring-[#2f74b5]"
          />
        </div>
      </div>

      {/* Install Mobile App Prompt (PWA) */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-[#2f74b5]" />
            <h4 className="text-xs font-bold text-navy-900 font-sans uppercase tracking-wider">
              Install Mobile App
            </h4>
          </div>
          <Badge variant="copper" className="text-[9px] font-mono-specs">
            PWA Ready
          </Badge>
        </div>
        <p className="text-xs text-slate-600 leading-snug">
          Add Bill Pokorny Pump &amp; Filter directly to your phone's home screen for instant one-tap 24/7 access.
        </p>
        <button
          onClick={() => setShowInstallInstructions(!showInstallInstructions)}
          className="text-xs font-bold text-[#2f74b5] hover:underline pt-1 block"
        >
          {showInstallInstructions ? "Hide Instructions" : "View Android & iOS Install Steps"}
        </button>

        {showInstallInstructions && (
          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl">
            <div className="space-y-0.5">
              <strong className="text-navy-900 font-sans block">🍎 On iPhone / iOS Safari:</strong>
              <p className="text-[11px] text-slate-600">
                Tap the Share icon at the bottom of Safari, scroll down and select <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
            <div className="space-y-0.5 pt-1">
              <strong className="text-navy-900 font-sans block">🤖 On Android / Chrome:</strong>
              <p className="text-[11px] text-slate-600">
                Tap the three-dot menu at top-right, then choose <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Help & Support / Contact Bill */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-card-soft space-y-2 text-xs">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
          <HelpCircle className="h-4 w-4 text-navy-900" />
          <h4 className="text-xs font-bold text-navy-900 font-sans uppercase tracking-wider">
            Help &amp; Official Links
          </h4>
        </div>

        <div className="space-y-2 pt-1">
          <a
            href={`tel:${companyData.phoneRaw}`}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#2f74b5]" />
              <span className="font-semibold text-navy-900 font-sans">Call Bill Pokorny Directly</span>
            </div>
            <span className="font-mono-specs text-slate-500 text-[11px]">(203) 671-1506</span>
          </a>

          <a
            href="https://billpokornywestonpumpandfilter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-slate-600" />
              <span className="font-semibold text-navy-900 font-sans">Visit Official Website</span>
            </div>
            <span className="text-[11px] text-[#2f74b5] font-semibold">billpokornywestonpumpandfilter.com</span>
          </a>
        </div>
      </div>

      {/* Onboarding Replay & Logout */}
      <div className="space-y-2 pt-2">
        {onReplayOnboarding && (
          <Button
            variant="outline"
            onClick={onReplayOnboarding}
            className="w-full h-11 text-xs font-semibold text-[#0f2340] border-slate-300 rounded-xl flex items-center justify-center gap-2 tap-press bg-white hover:bg-slate-50"
          >
            <span>Preview Splash &amp; Onboarding Flow</span>
          </Button>
        )}

        <Button
          variant="outline"
          onClick={onOpenAuth}
          className="w-full h-11 text-xs font-bold text-slate-700 border-slate-300 rounded-xl flex items-center justify-center gap-2 tap-press"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out of Account</span>
        </Button>

        <div>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full text-center text-[11px] text-red-600 hover:text-red-700 py-2 font-medium"
            >
              Delete Account &amp; System Data
            </button>
          ) : (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 space-y-2 text-xs text-red-900">
              <p className="font-bold">Are you sure you want to delete your account?</p>
              <p className="text-[11px] text-red-700">
                This will remove your saved well specs, address, and service history from this device.
              </p>
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    onOpenAuth()
                  }}
                  className="bg-brandRed-600 hover:bg-brandRed-700 text-white text-xs h-8 flex-1 rounded-lg"
                >
                  Confirm Delete
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-xs h-8 px-3 rounded-lg border-red-300 text-red-800"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
