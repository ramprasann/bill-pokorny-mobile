import React, { useEffect } from "react"
import { ShieldCheck, Droplets } from "lucide-react"

interface SplashScreenProps {
  onFinish: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // 2.2-second smooth transition
    const timer = setTimeout(() => {
      onFinish()
    }, 2200)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div 
      onClick={onFinish}
      className="w-full max-w-md mx-auto min-h-screen bg-[#0f2340] text-white flex flex-col justify-between items-center p-8 select-none cursor-pointer animate-in fade-in duration-300 relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#2f74b5]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#e0443a]/15 blur-3xl pointer-events-none" />

      {/* Top Badge */}
      <div className="pt-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono-specs text-slate-300">
          <ShieldCheck className="h-3.5 w-3.5 text-aqua-400" />
          <span>CT Lic 208261 · 24/7 Emergency Service</span>
        </div>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center text-center space-y-4 my-auto">
        <div className="relative">
          {/* Logo container */}
          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white/20 bg-[#091527] shadow-[0_0_30px_rgba(47,116,181,0.4)] flex items-center justify-center">
            <img
              src="/logo.jpg"
              alt="Bill Pokorny"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none'
              }}
            />
          </div>
          {/* Pulsing water drop badge */}
          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-[#2f74b5] text-white flex items-center justify-center ring-4 ring-[#0f2340] shadow-md animate-pulse">
            <Droplets className="h-4 w-4 fill-current" />
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white leading-tight">
            Bill Pokorny
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-aqua-300 font-mono-specs mt-1">
            Pump &amp; Water Filtration Specialist
          </p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-[260px]">
            Weston &amp; Fairfield County's Trusted Well Service Since 1981
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="pt-6 flex flex-col items-center gap-2">
          <div className="h-6 w-6 border-2 border-white/20 border-t-aqua-400 rounded-full animate-spin" />
          <span className="text-[10px] text-slate-400 font-mono-specs">Initializing service environment...</span>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="pb-4 text-center">
        <p className="text-[10px] text-slate-400 font-mono-specs">
          Weston, CT · 24/7 Direct Dispatch
        </p>
        <p className="text-[9px] text-slate-500 mt-0.5">
          Tap anywhere to continue
        </p>
      </div>
    </div>
  )
}

