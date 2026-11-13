import React from "react"
import { Bell, User, ArrowLeft } from "lucide-react"
import { UserProfile } from "@/types/auth"

interface TopAppBarProps {
  user: UserProfile
  title?: string
  showBack?: boolean
  onBack?: () => void
  onOpenAccount: () => void
  onOpenNotifications: () => void
  unreadNotificationsCount?: number
  hasUnreadMessage?: boolean
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ 
  user,
  title,
  showBack,
  onBack,
  onOpenAccount,
  onOpenNotifications,
  unreadNotificationsCount = 2,
  hasUnreadMessage = true
}) => {
  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[#0f2340] text-white px-3.5 shadow-md flex items-center justify-between border-b border-[#1b3459] select-none">
      {/* Left: Brand or Back Button */}
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack && onBack ? (
          <button
            onClick={onBack}
            className="p-2 -ml-1 text-slate-200 hover:text-white rounded-full hover:bg-white/10 tap-press"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="relative h-9 w-9 flex-shrink-0 rounded-full overflow-hidden border border-aqua-400/50 bg-[#091527] shadow-sm">
            <img
              src="/logo.jpg"
              alt="Bill Pokorny Pump & Filter"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none'
              }}
            />
          </div>
        )}

        <h1 className="font-display text-lg font-bold tracking-tight text-white leading-tight truncate">
          {title || "Bill Pokorny"}
        </h1>
      </div>

      {/* Right: Notification Bell & 36px Profile Avatar */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 tap-press"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* 36px Circular Profile Avatar */}
        <button
          onClick={onOpenAccount}
          className="relative h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white tap-press shadow-sm"
          aria-label="Account and Profile"
        >
          {user.isGuest ? (
            <User className="h-5 w-5 text-slate-200" />
          ) : (
            <span className="font-bold text-xs font-mono-specs text-white">
              {user.name.split(" ").map(n => n[0]).join("")}
            </span>
          )}

          {/* Unread Message Dot on Avatar */}
          {hasUnreadMessage && (
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-aqua-400 ring-2 ring-[#0f2340]" />
          )}
        </button>
      </div>
    </header>
  )
}
