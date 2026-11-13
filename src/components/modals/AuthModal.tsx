import React, { useState } from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserProfile, defaultUser, guestUser } from "@/types/auth"
import { Lock, User, Phone, Mail, MapPin, CheckCircle2, ShieldCheck } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: UserProfile) => void
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<"login" | "signup">("login")
  
  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)

  // Sign up fields
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [town, setTown] = useState("Weston")
  const [consent, setConsent] = useState(true)
  const [error, setError] = useState("")

  const towns = ["Weston", "Westport", "Fairfield", "Easton", "Wilton", "Redding", "Other"]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setError("Please enter your email/phone and password.")
      return
    }
    // Simulate login
    const loggedUser: UserProfile = {
      ...defaultUser,
      email: loginIdentifier.includes("@") ? loginIdentifier : defaultUser.email,
      phone: !loginIdentifier.includes("@") ? loginIdentifier : defaultUser.phone
    }
    onLoginSuccess(loggedUser)
    onClose()
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all required fields.")
      return
    }
    if (!consent) {
      setError("Please accept the terms and conditions.")
      return
    }
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      address,
      town,
      isGuest: false,
      notifications: { push: true, sms: true, email: true },
      security: { biometricEnabled: false }
    }
    onLoginSuccess(newUser)
    onClose()
  }

  const handleContinueAsGuest = () => {
    onLoginSuccess(guestUser)
    onClose()
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "login" ? "Log In to Your Well System" : "Create Homeowner Account"}
      subtitle="Bill Pokorny Pump & Filter · Fairfield County, CT"
      maxHeight="max-h-[92vh]"
    >
      <div className="space-y-4 text-left">
        {/* Toggle Mode Chips */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode("login")
              setError("")
            }}
            className={`flex-1 py-2 rounded-lg transition-all tap-press ${
              mode === "login"
                ? "bg-white text-navy-900 shadow-sm font-bold"
                : "text-slate-600 hover:text-navy-900"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup")
              setError("")
            }}
            className={`flex-1 py-2 rounded-lg transition-all tap-press ${
              mode === "signup"
                ? "bg-white text-navy-900 shadow-sm font-bold"
                : "text-slate-600 hover:text-navy-900"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold font-mono-specs uppercase text-slate-500 mb-1">
                Email or Phone Number *
              </label>
              <Input
                placeholder="name@example.com or (203) 555-0182"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold font-mono-specs uppercase text-slate-500">
                  Password *
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions sent to your email/phone.")}
                  className="text-[11px] text-aqua-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-aqua-600"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <Button type="submit" variant="default" className="w-full h-12 text-sm font-bold">
              Log In
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <label className="block text-xs font-bold font-mono-specs uppercase text-slate-500 mb-1">
                Full Name *
              </label>
              <Input
                placeholder="Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold font-mono-specs uppercase text-slate-500 mb-1">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  placeholder="(203) 555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono-specs uppercase text-slate-500 mb-1">
                  Town in CT
                </label>
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
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
              <label className="block text-xs font-bold font-mono-specs uppercase text-slate-500 mb-1">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="sarah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold font-mono-specs uppercase text-slate-500 mb-1">
                Password *
              </label>
              <Input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold font-mono-specs uppercase text-slate-500 mb-1">
                Service Address (Well Location)
              </label>
              <Input
                placeholder="144 Valley Forge Rd"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-2 pt-1 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="h-4 w-4 mt-0.5 accent-aqua-600"
                required
              />
              <span>
                I agree to allow Bill Pokorny Pump &amp; Filter to store my property well specifications and send service notifications.
              </span>
            </div>

            <Button type="submit" variant="default" className="w-full h-12 text-sm font-bold mt-1">
              Create Account
            </Button>
          </form>
        )}

        {/* Continue as guest */}
        <div className="pt-2 text-center border-t border-slate-100">
          <button
            type="button"
            onClick={handleContinueAsGuest}
            className="text-xs font-semibold text-slate-500 hover:text-navy-900 tap-press py-1"
          >
            Continue as Guest (Call, Text &amp; SOS access only)
          </button>
        </div>
      </div>
    </BottomSheet>
  )
}
