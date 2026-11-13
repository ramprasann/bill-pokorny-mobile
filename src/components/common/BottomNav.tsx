import React from "react"
import { Home, CalendarPlus, Siren, Droplets } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabType = "home" | "book" | "emergency" | "my-well"

interface BottomNavProps {
  currentTab: TabType | string
  onSelectTab: (tab: TabType) => void
  bookBadgeCount?: number
  hasMyWellBadge?: boolean
  isHidden?: boolean
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  currentTab, 
  onSelectTab,
  bookBadgeCount = 1,
  hasMyWellBadge = true,
  isHidden = false
}) => {
  const handleTap = (tab: TabType) => {
    try {
      if ("vibrate" in navigator) {
        navigator.vibrate(10)
      }
    } catch {
      // ignore
    }
    onSelectTab(tab)
  }

  if (isHidden) return null

  return (
    <nav
      role="navigation"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 h-16 bg-[#0f2340] text-white border-t border-[#1b3459] shadow-[0_-4px_20px_rgba(0,0,0,0.25)] px-2 select-none"
    >
      <div className="h-full w-full flex items-center justify-between relative">
        {/* 1. Home Tab */}
        <button
          onClick={() => handleTap("home")}
          aria-current={currentTab === "home" ? "page" : undefined}
          aria-label="Home"
          className="relative flex-1 h-full min-w-[48px] flex flex-col items-center justify-center tap-press active:scale-[0.92] transition-transform duration-120 focus:outline-none"
        >
          <div className="relative flex items-center justify-center">
            {currentTab === "home" && (
              <span className="absolute w-[52px] h-[30px] rounded-full bg-white/15 transition-all duration-200 animate-in zoom-in-95" />
            )}
            <Home
              className={cn(
                "h-5 w-5 z-10 transition-colors duration-150",
                currentTab === "home" ? "text-aqua-300 stroke-[2.3]" : "text-slate-300 hover:text-white stroke-[1.8]"
              )}
            />
          </div>
          <span
            className={cn(
              "text-[11px] leading-tight mt-1 tracking-tight whitespace-nowrap transition-colors",
              currentTab === "home" ? "font-bold text-white" : "font-medium text-slate-300"
            )}
          >
            Home
          </span>
          {currentTab === "home" && (
            <span className="h-1 w-1 rounded-full bg-aqua-400 mt-0.5" />
          )}
        </button>

        {/* 2. Book Tab */}
        <button
          onClick={() => handleTap("book")}
          aria-current={currentTab === "book" ? "page" : undefined}
          aria-label="Book"
          className="relative flex-1 h-full min-w-[48px] flex flex-col items-center justify-center tap-press active:scale-[0.92] transition-transform duration-120 focus:outline-none"
        >
          <div className="relative flex items-center justify-center">
            {currentTab === "book" && (
              <span className="absolute w-[52px] h-[30px] rounded-full bg-white/15 transition-all duration-200 animate-in zoom-in-95" />
            )}
            <CalendarPlus
              className={cn(
                "h-5 w-5 z-10 transition-colors duration-150",
                currentTab === "book" ? "text-aqua-300 stroke-[2.3]" : "text-slate-300 hover:text-white stroke-[1.8]"
              )}
            />
            {bookBadgeCount > 0 && (
              <span className="absolute -top-1 -right-2 z-20 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brandRed-600 text-[10px] font-bold text-white ring-2 ring-[#0f2340]">
                {bookBadgeCount > 9 ? "9+" : bookBadgeCount}
              </span>
            )}
          </div>
          <span
            className={cn(
              "text-[11px] leading-tight mt-1 tracking-tight whitespace-nowrap transition-colors",
              currentTab === "book" ? "font-bold text-white" : "font-medium text-slate-300"
            )}
          >
            Book
          </span>
          {currentTab === "book" && (
            <span className="h-1 w-1 rounded-full bg-aqua-400 mt-0.5" />
          )}
        </button>

        {/* 3. SOS Tab (Placed cleanly INSIDE the navbar, aligned on same baseline as Home & Book) */}
        <button
          onClick={() => handleTap("emergency")}
          aria-current={currentTab === "emergency" ? "page" : undefined}
          aria-label="SOS Emergency"
          className="relative flex-1 h-full min-w-[48px] flex flex-col items-center justify-center tap-press active:scale-[0.92] transition-transform duration-120 focus:outline-none"
        >
          <div className="relative flex items-center justify-center">
            {currentTab === "emergency" ? (
              <span className="absolute w-[52px] h-[30px] rounded-full bg-red-500/25 transition-all duration-200 animate-in zoom-in-95" />
            ) : (
              <span className="absolute w-7 h-7 rounded-full bg-brandRed-600/20" />
            )}
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#b42a21] via-[#d7362c] to-[#e0443a] text-white flex items-center justify-center shadow-sm z-10">
              <Siren className="h-4 w-4 text-white stroke-[2.4]" />
            </div>
          </div>
          <span
            className={cn(
              "text-[11px] leading-tight mt-1 tracking-tight whitespace-nowrap transition-colors",
              currentTab === "emergency" ? "font-extrabold text-red-300" : "font-bold text-red-400"
            )}
          >
            SOS
          </span>
          {currentTab === "emergency" && (
            <span className="h-1 w-1 rounded-full bg-red-400 mt-0.5" />
          )}
        </button>

        {/* 4. My Well Tab */}
        <button
          onClick={() => handleTap("my-well")}
          aria-current={currentTab === "my-well" ? "page" : undefined}
          aria-label="My Well"
          className="relative flex-1 h-full min-w-[48px] flex flex-col items-center justify-center tap-press active:scale-[0.92] transition-transform duration-120 focus:outline-none"
        >
          <div className="relative flex items-center justify-center">
            {currentTab === "my-well" && (
              <span className="absolute w-[52px] h-[30px] rounded-full bg-white/15 transition-all duration-200 animate-in zoom-in-95" />
            )}
            <Droplets
              className={cn(
                "h-5 w-5 z-10 transition-colors duration-150",
                currentTab === "my-well" ? "text-aqua-300 stroke-[2.3]" : "text-slate-300 hover:text-white stroke-[1.8]"
              )}
            />
            {hasMyWellBadge && (
              <span className="absolute -top-0.5 -right-1 z-20 flex h-2 w-2 rounded-full bg-aqua-400 ring-2 ring-[#0f2340]" />
            )}
          </div>
          <span
            className={cn(
              "text-[11px] leading-tight mt-1 tracking-tight whitespace-nowrap transition-colors",
              currentTab === "my-well" ? "font-bold text-white" : "font-medium text-slate-300"
            )}
          >
            My Well
          </span>
          {currentTab === "my-well" && (
            <span className="h-1 w-1 rounded-full bg-aqua-400 mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  )
}
