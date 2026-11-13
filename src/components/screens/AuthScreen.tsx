import React, { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User, Phone, MapPin, ShieldCheck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserProfile, defaultUser } from "@/types/auth"

interface AuthScreenProps {
  onLoginSuccess: (user: UserProfile) => void
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<"login" | "signup">("login")

  // Login Form (Pre-filled with dummy data)
  const [loginEmail, setLoginEmail] = useState("david.sterling@gmail.com")
  const [loginPassword, setLoginPassword] = useState("WestonPump2026!")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Sign Up Form (Pre-filled with dummy data)
  const [name, setName] = useState("David Sterling")
  const [phone, setPhone] = useState("(203) 555-0182")
  const [email, setEmail] = useState("david.sterling@gmail.com")
  const [password, setPassword] = useState("WestonPump2026!")
  const [address, setAddress] = useState("144 Valley Forge Rd")
  const [town, setTown] = useState("Weston")
  const [consent, setConsent] = useState(true)

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const towns = ["Weston", "Westport", "Fairfield", "Easton", "Wilton", "Redding", "Other"]

  const handleAutoFillDemo = () => {
    setLoginEmail("david.sterling@gmail.com")
    setLoginPassword("WestonPump2026!")
    setName("David Sterling")
    setPhone("(203) 555-0182")
    setEmail("david.sterling@gmail.com")
    setPassword("WestonPump2026!")
    setAddress("144 Valley Forge Rd")
    setTown("Weston")
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError("Please enter your email and password.")
      return
    }

    setIsSubmitting(true)
    setError("")

    setTimeout(() => {
      const loggedUser: UserProfile = {
        ...defaultUser,
        email: loginEmail,
        isGuest: false
      }
      onLoginSuccess(loggedUser)
      setIsSubmitting(false)
    }, 600)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim() || !address.trim()) {
      setError("Please fill in all required fields.")
      return
    }

    if (!consent) {
      setError("Please accept the terms of service to proceed.")
      return
    }

    setIsSubmitting(true)
    setError("")

    setTimeout(() => {
      const newUser: UserProfile = {
        ...defaultUser,
        name,
        phone,
        email,
        address,
        town,
        isGuest: false
      }
      onLoginSuccess(newUser)
      setIsSubmitting(false)
    }, 600)
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col justify-between p-6 select-none animate-in fade-in duration-200">
      {/* Top Header & Trust Tag */}
      <div>
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 bg-[#091527]">
              <img src="/logo.jpg" alt="Bill Pokorny" className="h-full w-full object-cover" />
            </div>
            <span className="font-display font-bold text-base text-navy-900 tracking-tight">
              Bill Pokorny
            </span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-mono-specs text-slate-600">
            <ShieldCheck className="h-3.5 w-3.5 text-[#2f74b5]" />
            <span>CT Lic 208261</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1 text-left pb-6">
          <h1 className="text-2xl font-bold font-sans text-navy-900 tracking-tight">
            {mode === "login" ? "Log in to your Account" : "Create your Account"}
          </h1>
          <p className="text-xs text-slate-500">
            {mode === "login" 
              ? "Welcome back, please enter your details."
              : "Register to manage your well passport, filters, and priority dispatch."}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-brandRed-700 font-medium">
            {error}
          </div>
        )}

        {/* Demo Account Indicator */}
        <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="font-semibold text-slate-700 truncate">Demo Account Pre-filled</span>
          </div>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="text-[11px] font-bold text-[#2f74b5] hover:underline flex-shrink-0"
          >
            Refill Demo
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  className="w-full text-xs h-12 px-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f2340]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  className="w-full text-xs h-12 pl-3.5 pr-10 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f2340]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded text-[#0f2340] focus:ring-[#0f2340]"
                />
                <span className="text-slate-600">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset link sent to your email!")}
                className="text-xs font-semibold text-[#2f74b5] hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            {/* Primary Log In Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-[#0f2340] hover:bg-[#1b3459] text-white font-bold text-xs shadow-md active:scale-[0.98] transition-transform"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </div>
          </form>
        )}

        {/* SIGN UP FORM */}
        {mode === "signup" && (
          <form onSubmit={handleSignup} className="space-y-3 text-left">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. David Sterling"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full text-xs h-11 px-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2340]"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="(203) 555-0182"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full text-xs h-11 px-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2340]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full text-xs h-11 px-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2340]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full text-xs h-11 px-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2340]"
              />
            </div>

            {/* Address & Town */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Service Address
                </label>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  className="w-full text-xs h-11 px-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2340]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Town
                </label>
                <select
                  value={town}
                  onChange={e => setTown(e.target.value)}
                  className="w-full text-xs h-11 px-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2340]"
                >
                  {towns.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="h-4 w-4 rounded text-[#0f2340] focus:ring-[#0f2340] mt-0.5"
              />
              <span className="text-[11px] text-slate-600 leading-snug">
                I agree to the terms of service and consent to direct SMS dispatch notifications from Bill Pokorny.
              </span>
            </label>

            {/* Create Account Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-[#0f2340] hover:bg-[#1b3459] text-white font-bold text-xs shadow-md active:scale-[0.98] transition-transform"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Switcher */}
      <div className="pt-6 pb-2 text-center border-t border-slate-100">
        {mode === "login" ? (
          <p className="text-xs text-slate-600">
            Don't have an account?{" "}
            <button
              onClick={() => {
                setError("")
                setMode("signup")
              }}
              className="font-bold text-[#0f2340] hover:underline"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p className="text-xs text-slate-600">
            Already have an account?{" "}
            <button
              onClick={() => {
                setError("")
                setMode("login")
              }}
              className="font-bold text-[#0f2340] hover:underline"
            >
              Log In
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

