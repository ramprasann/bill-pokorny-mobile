import React, { useState } from "react"
import { ChevronRight, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  onFinish: () => void
}

interface OnboardingSlide {
  image: string
  badge: string
  title: string
  subtitle: string
}

const SLIDES: OnboardingSlide[] = [
  {
    image: "/images/gallery-7-pumps.jpg",
    badge: "24/7 Priority Emergency",
    title: "24/7 Emergency No-Water Service",
    subtitle: "When your water stops, one tap alerts Bill Pokorny directly for priority dispatch. Never an offshore answering service or answering delays."
  },
  {
    image: "/images/gallery-4-tanks.jpg",
    badge: "Digital Well System",
    title: "Your Well Passport In Your Pocket",
    subtitle: "Store your pump depth, pressure tank calibration (30/50 or 40/60 PSI), filter cartridge sizes, and emergency shut-off valve photos in one place."
  },
  {
    image: "/images/gallery-12-filtration.jpg",
    badge: "Proactive Protection",
    title: "Automated Maintenance Alerts",
    subtitle: "Get smart countdown reminders before sediment filters clog or softener salt runs dry. Keep your family's water pure, softened, and reliable."
  }
]

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onFinish()
    }
  }

  const slide = SLIDES[currentSlide]
  const isLast = currentSlide === SLIDES.length - 1

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col justify-between select-none relative animate-in fade-in duration-200">
      {/* Top Bar with Skip */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 via-black/20 to-transparent">
        <span className="text-[11px] font-mono-specs font-bold text-white uppercase tracking-wider drop-shadow">
          Bill Pokorny
        </span>
        <button
          onClick={onFinish}
          className="text-xs font-semibold text-white/90 hover:text-white bg-black/30 hover:bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20 transition-all"
        >
          Skip
        </button>
      </div>

      {/* Top 52%: Hero Image Section */}
      <div className="relative w-full h-[52vh] overflow-hidden bg-slate-900">
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-500"
        />
        {/* Soft gradient fade into white bottom content */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Bottom 48%: Content, Dots & Sticky Continue Button */}
      <div className="flex-1 flex flex-col justify-between px-6 pt-2 pb-8 text-center bg-white">
        {/* Text Container */}
        <div className="space-y-3 max-w-xs mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f2340]/5 border border-[#0f2340]/10 text-[11px] font-mono-specs font-bold text-[#0f2340]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#2f74b5]" />
            <span>{slide.badge}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold font-sans text-navy-900 tracking-tight leading-tight">
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xs text-slate-600 leading-relaxed">
            {slide.subtitle}
          </p>
        </div>

        {/* Carousel Dots & Action Button */}
        <div className="space-y-6 pt-6">
          {/* Pagination Indicators (Dots / Elongated Pill) */}
          <div className="flex items-center justify-center gap-1.5">
            {SLIDES.map((_, idx) => (
              <span
                key={idx}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentSlide === idx
                    ? "w-7 bg-[#0f2340]"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>

          {/* Primary Action Button */}
          <Button
            onClick={handleNext}
            className="w-full h-13 rounded-2xl bg-[#0f2340] hover:bg-[#1b3459] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>{isLast ? "Get Started" : "Continue"}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

