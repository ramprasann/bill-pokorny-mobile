import React, { useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt: string
  category?: string
  onPrev?: () => void
  onNext?: () => void
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  alt,
  category,
  onPrev,
  onNext
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && onPrev) onPrev()
      if (e.key === "ArrowRight" && onNext) onNext()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3.5 bg-navy-950/92 backdrop-blur-md animate-in fade-in duration-200 overflow-hidden">
      <div className="relative w-full flex flex-col items-center">
        {/* Top controls */}
        <div className="w-full flex items-center justify-between py-1.5 text-white/90">
          <span className="text-[11px] font-mono uppercase tracking-wider text-copper-300">
            {category || "Gallery Photo"}
          </span>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 tap-press transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Image Container with aspect ratio */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-black/40 border border-white/10 shadow-2xl">
          <img
            src={imageSrc}
            alt={alt}
            className="w-full max-h-[50vh] object-contain"
          />

          {/* Navigation Arrows */}
          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 tap-press"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 tap-press"
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="mt-2.5 w-full rounded-xl bg-navy-900/80 p-2.5 text-center border border-white/10">
          <p className="text-xs font-medium text-white">{alt}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Real installation by Bill Pokorny · Fairfield County, CT</p>
        </div>
      </div>
    </div>
  )
}
