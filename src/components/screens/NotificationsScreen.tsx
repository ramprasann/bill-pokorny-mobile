import React, { useState } from "react"
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Truck, 
  Droplets, 
  Sparkles, 
  ChevronRight, 
  Trash2, 
  CheckCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  category: "job" | "reminder" | "system"
  isUnread: boolean
  actionText?: string
  actionRoute?: "requests" | "reminders" | "equipment"
}

interface NotificationsScreenProps {
  onNavigateToRequests: () => void
  onNavigateToReminders: () => void
  onNavigateToEquipment: () => void
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Technician En Route · ETA 10:45 AM",
    message: "Bill Pokorny is on the way to 144 Valley Forge Rd with replacement 40/60 pressure switch and gauges.",
    time: "10m ago",
    category: "job",
    isUnread: true,
    actionText: "Track Active Job",
    actionRoute: "requests"
  },
  {
    id: "notif-2",
    title: "Water Softener Salt Level Check",
    message: "Monthly reminder to verify brine tank salt levels. Solar salt crystals are recommended for your Clack WS1 system.",
    time: "Yesterday",
    category: "reminder",
    isUnread: true,
    actionText: "View Salt Schedule",
    actionRoute: "reminders"
  },
  {
    id: "notif-3",
    title: "Sediment Filter Cartridge Due in 24 Days",
    message: "Pentair Big Blue 20-inch 5-micron dual-gradient cartridge replacement is scheduled for next month.",
    time: "3 days ago",
    category: "reminder",
    isUnread: false,
    actionText: "Manage Filter",
    actionRoute: "reminders"
  },
  {
    id: "notif-4",
    title: "Well Passport Specs Verified",
    message: "Your submersible pump depth (240 ft) and Well-X-Trol WX-202 Pro tank calibration have been logged.",
    time: "1 week ago",
    category: "system",
    isUnread: false,
    actionText: "View Equipment Specs",
    actionRoute: "equipment"
  }
]

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onNavigateToRequests,
  onNavigateToReminders,
  onNavigateToEquipment
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const [filter, setFilter] = useState<"all" | "job" | "reminder">("all")

  const unreadCount = notifications.filter(n => n.isUnread).length

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isUnread: false })))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const handleAction = (route?: "requests" | "reminders" | "equipment") => {
    if (route === "requests") onNavigateToRequests()
    if (route === "reminders") onNavigateToReminders()
    if (route === "equipment") onNavigateToEquipment()
  }

  const filtered = notifications.filter(n => {
    if (filter === "all") return true
    return n.category === filter
  })

  return (
    <div className="space-y-4 px-4 pt-3 pb-32 text-left select-none animate-in fade-in duration-200">
      {/* Top Header Summary & Actions */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-navy-900 font-sans uppercase tracking-wider">
            All Notifications
          </span>
          {unreadCount > 0 && (
            <span className="flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brandRed-600 text-[10px] font-bold text-white">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-semibold text-[#2f74b5] hover:underline flex items-center gap-1"
            >
              <CheckCheck className="h-3.5 w-3.5" /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
        {(["all", "job", "reminder"] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all capitalize ${
              filter === cat
                ? "bg-[#0f2340] text-white border-[#0f2340] font-bold shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-medium"
            }`}
          >
            {cat === "all" ? `All (${notifications.length})` : cat === "job" ? "Job Updates" : "Reminders"}
          </button>
        ))}
      </div>

      {/* Notification Cards List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center space-y-2">
          <Bell className="h-8 w-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">No Notifications</h4>
          <p className="text-xs text-slate-500">
            You are all caught up with your service alerts and water reminders.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 shadow-card-soft transition-all space-y-2.5 ${
                item.isUnread
                  ? "bg-white border-blue-200/90 ring-1 ring-blue-100"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {item.category === "job" ? (
                    <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Truck className="h-4 w-4" />
                    </div>
                  ) : item.category === "reminder" ? (
                    <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#2f74b5] flex items-center justify-center flex-shrink-0">
                      <Droplets className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-navy-900 font-sans leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono-specs">{item.time}</span>
                  </div>
                </div>

                {item.isUnread && (
                  <span className="h-2 w-2 rounded-full bg-[#2f74b5] flex-shrink-0 mt-1" />
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                {item.message}
              </p>

              {item.actionText && (
                <div className="pl-9 pt-1">
                  <button
                    onClick={() => handleAction(item.actionRoute)}
                    className="text-xs font-bold text-[#2f74b5] hover:text-[#1b3459] flex items-center gap-1 tap-press"
                  >
                    <span>{item.actionText}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
