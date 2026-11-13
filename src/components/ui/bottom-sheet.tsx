import React, { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
  maxHeight?: string
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxHeight = "max-h-[90vh]"
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      // Prevent body scrolling when sheet is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto overflow-hidden">
      {/* Dimmed backdrop covering full viewport */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sheet Container: STRICTLY CONSTRAINED TO MOBILE FRAME (w-full max-w-md mx-auto) */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md mx-auto rounded-t-[28px] bg-white p-4 sm:p-5 shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300 flex flex-col border-t border-slate-200/90",
          maxHeight
        )}
      >
        {/* Handle bar for dragging */}
        <div className="mx-auto mb-2.5 h-1.5 w-12 rounded-full bg-slate-300/80" />

        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between pb-2.5 border-b border-slate-100">
            <div>
              {title && (
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-navy-900 font-sans">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-[11px] text-slate-500 font-mono-specs mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-navy-900 transition-colors tap-press"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Scrollable Body inside the sheet */}
        <div className="overflow-y-auto native-scroll py-2.5 flex-1 no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}
