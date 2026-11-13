import React, { useState, useEffect } from "react"
import { SplashScreen } from "@/components/screens/SplashScreen"
import { OnboardingScreen } from "@/components/screens/OnboardingScreen"
import { AuthScreen } from "@/components/screens/AuthScreen"
import { TopAppBar } from "@/components/common/TopAppBar"
import { BottomNav, TabType } from "@/components/common/BottomNav"
import { HomeScreen } from "@/components/screens/HomeScreen"
import { BookScreen } from "@/components/screens/BookScreen"
import { EmergencyScreen } from "@/components/screens/EmergencyScreen"
import { MyWellScreen } from "@/components/screens/MyWellScreen"
import { AccountScreen } from "@/components/screens/AccountScreen"
import { NotificationsScreen } from "@/components/screens/NotificationsScreen"

import { UserProfile, defaultUser } from "@/types/auth"
import { ServiceRequest, initialRequests, BookingType } from "@/types/booking"
import { UserWellSystem, defaultWellSystem } from "@/types/system"

export type ActiveScreenType = TabType | "account" | "notifications"
export type AppFlowState = "splash" | "onboarding" | "auth" | "main"

export function App() {
  // App Flow State (Splash -> Onboarding -> Auth -> Main)
  const [appFlow, setAppFlow] = useState<AppFlowState>(() => {
    const path = window.location.pathname.toLowerCase()
    const hash = window.location.hash.toLowerCase()
    const isLoginRoute = path.endsWith("/login") || hash === "#login"
    const isLoggedIn = localStorage.getItem("bill_pokorny_logged_in") === "true"

    if (isLoginRoute) {
      return "auth"
    }
    if (isLoggedIn) {
      return "main"
    }
    // Default root url / without /login: Splash -> Onboarding
    return "splash"
  })

  // Navigation State
  const [currentTab, setCurrentTab] = useState<ActiveScreenType>("home")
  const [previousTab, setPreviousTab] = useState<ActiveScreenType>("home")
  const [myWellSubTab, setMyWellSubTab] = useState<"equipment" | "reminders" | "reports">("equipment")
  const [bookSubTab, setBookSubTab] = useState<"book" | "requests">("book")
  const [bookType, setBookType] = useState<BookingType | undefined>(undefined)

  // Core Data State
  const [user, setUser] = useState<UserProfile>(defaultUser)
  const [wellSystem, setWellSystem] = useState<UserWellSystem>(defaultWellSystem)
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests)

  // Listen to path / hash changes e.g. /login or #reports
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase()
      const hash = window.location.hash.toLowerCase()
      const isLoginRoute = path.endsWith("/login") || hash === "#login"
      const isLoggedIn = localStorage.getItem("bill_pokorny_logged_in") === "true"

      if (isLoginRoute) {
        setAppFlow("auth")
      } else if (!isLoggedIn && (path === "/" || path === "")) {
        // Normal root / without /login -> splash & onboarding flow
        setAppFlow("splash")
      } else if (isLoggedIn) {
        setAppFlow("main")
      }

      // Hash navigation inside main dashboard
      if (hash === "#reports") {
        setCurrentTab("my-well")
        setMyWellSubTab("reports")
      } else if (hash === "#emergency" || hash === "#sos") {
        setCurrentTab("emergency")
      } else if (hash === "#book") {
        setCurrentTab("book")
      } else if (hash === "#my-well" || hash === "#equipment") {
        setCurrentTab("my-well")
        setMyWellSubTab("equipment")
      } else if (hash === "#account") {
        setCurrentTab("account")
      } else if (hash === "#notifications") {
        setCurrentTab("notifications")
      }
    }

    window.addEventListener("popstate", handleUrlChange)
    window.addEventListener("hashchange", handleUrlChange)
    return () => {
      window.removeEventListener("popstate", handleUrlChange)
      window.removeEventListener("hashchange", handleUrlChange)
    }
  }, [])

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentTab, appFlow])

  // Count active requests for bottom badge
  const activeRequestsCount = requests.filter(
    r => r.status === "Received" || r.status === "Scheduled" || r.status === "On the way" || r.status === "In progress"
  ).length

  // Handlers
  const handleCreateRequest = (newReq: ServiceRequest) => {
    setRequests([newReq, ...requests])
  }

  const handleUpdateRequest = (updatedReq: ServiceRequest) => {
    setRequests(requests.map(r => r.id === updatedReq.id ? updatedReq : r))
  }

  const handleNavigateToReports = () => {
    setCurrentTab("my-well")
    setMyWellSubTab("reports")
    window.location.hash = "reports"
  }

  const handleBookForItem = (item: string) => {
    setCurrentTab("book")
    setBookType("Repair")
    setBookSubTab("book")
  }

  const handleOpenAccount = () => {
    if (currentTab !== "account") {
      setPreviousTab(currentTab)
      setCurrentTab("account")
    }
  }

  const handleOpenNotifications = () => {
    if (currentTab !== "notifications") {
      setPreviousTab(currentTab)
      setCurrentTab("notifications")
    }
  }

  const handleBack = () => {
    if (previousTab && previousTab !== currentTab) {
      setCurrentTab(previousTab)
    } else {
      setCurrentTab("home")
    }
  }

  // Logout handler: Clears login and navigates to /login
  const handleLogout = () => {
    localStorage.removeItem("bill_pokorny_logged_in")
    try {
      window.history.pushState(null, "", "/login")
    } catch {
      window.location.hash = "login"
    }
    setAppFlow("auth")
  }

  // Login success handler: Sets session, updates URL to / and goes to dashboard
  const handleLoginSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser)
    localStorage.setItem("bill_pokorny_logged_in", "true")
    try {
      window.history.pushState(null, "", "/")
    } catch {
      window.location.hash = ""
    }
    setCurrentTab("home")
    setAppFlow("main")
  }

  // Get screen title for TopAppBar on inner screens
  const getScreenTitle = () => {
    switch (currentTab) {
      case "book":
        return "Book Service"
      case "emergency":
        return "24/7 Emergency SOS"
      case "my-well":
        return myWellSubTab === "reports" ? "Service Reports" : "My Well System"
      case "account":
        return "Account Settings"
      case "notifications":
        return "Notifications"
      default:
        return undefined // Renders "Bill Pokorny"
    }
  }

  // 1. SPLASH SCREEN (Shown on root / when user is not logged in)
  if (appFlow === "splash") {
    return (
      <SplashScreen
        onFinish={() => {
          setAppFlow("onboarding")
        }}
      />
    )
  }

  // 2. ONBOARDING WALKTHROUGH CAROUSEL
  if (appFlow === "onboarding") {
    return (
      <OnboardingScreen
        onFinish={() => {
          try {
            window.history.pushState(null, "", "/login")
          } catch {
            window.location.hash = "login"
          }
          setAppFlow("auth")
        }}
      />
    )
  }

  // 3. AUTH SCREEN (LOG IN / SIGN UP) - At path /login
  if (appFlow === "auth") {
    return (
      <AuthScreen
        onLoginSuccess={handleLoginSuccess}
      />
    )
  }

  // 4. MAIN APP (DASHBOARD: HOME, BOOK, SOS, MY WELL, ACCOUNT, NOTIFICATIONS)
  return (
    <div className="w-full min-h-screen bg-[#f4f7fb] text-slate-900 flex flex-col relative antialiased select-none overflow-x-hidden">
      {/* Mobile-first centered frame container */}
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col relative bg-[#f4f7fb] shadow-xl sm:border-x sm:border-slate-200 overflow-x-hidden">
        
        {/* Top App Bar (56px Navy #0f2340 with white typography, circular logo, and 36px avatar) */}
        <TopAppBar
          user={user}
          title={getScreenTitle()}
          showBack={currentTab !== "home"}
          onBack={handleBack}
          onOpenAccount={handleOpenAccount}
          onOpenNotifications={handleOpenNotifications}
          unreadNotificationsCount={0}
          hasUnreadMessage={false}
        />

        {/* Main Content Area - Full height screens */}
        <main className="w-full flex-1 pb-24 overflow-x-hidden">
          {currentTab === "home" && (
            <HomeScreen
              user={user}
              activeRequest={requests[0]}
              wellSystem={wellSystem}
              onNavigateToTab={(tab) => {
                setPreviousTab(currentTab)
                if (tab === "my-well") setMyWellSubTab("equipment")
                if (tab === "book") setBookSubTab("book")
                setCurrentTab(tab)
              }}
              onNavigateToReports={handleNavigateToReports}
              onNavigateToRequests={() => {
                setPreviousTab(currentTab)
                setCurrentTab("book")
                setBookSubTab("requests")
              }}
              onOpenAuth={handleLogout}
            />
          )}

          {currentTab === "book" && (
            <BookScreen
              user={user}
              wellSystem={wellSystem}
              requests={requests}
              onRequestCreated={handleCreateRequest}
              onRequestUpdated={handleUpdateRequest}
              onOpenAuth={handleLogout}
              initialType={bookType || "Repair"}
              defaultSubTab={bookSubTab}
            />
          )}

          {currentTab === "emergency" && (
            <EmergencyScreen
              user={user}
              wellSystem={wellSystem}
              onEmergencySubmitted={(data) => {
                const emergencyReq: ServiceRequest = {
                  id: `REQ-${Math.floor(2000 + Math.random() * 8000)}`,
                  type: "Repair",
                  item: `24/7 EMERGENCY: ${data.issue}`,
                  description: `Emergency dispatch: ${data.issue}. Breaker tripped=${data.breakerTripped ? 'Yes' : 'No'}, Power outage=${data.powerOutage ? 'Yes' : 'No'}, Gauge 0 PSI=${data.gaugeZero ? 'Yes' : 'No'}. ${data.note || ''}`,
                  photos: [],
                  preferredDate: new Date().toISOString().split("T")[0],
                  preferredTime: "Anytime",
                  address: data.address,
                  town: "Weston",
                  attachWellDetails: true,
                  status: "Received",
                  scheduledFor: "Emergency Dispatch in Progress",
                  technicianNotes: "Bill is reviewing emergency submission for immediate dispatch.",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                }
                setRequests([emergencyReq, ...requests])
              }}
            />
          )}

          {currentTab === "my-well" && (
            <MyWellScreen
              user={user}
              wellSystem={wellSystem}
              onUpdateWellSystem={(updated) => setWellSystem(updated)}
              onBookServiceForItem={handleBookForItem}
              initialSubTab={myWellSubTab}
            />
          )}

          {/* Full Height Account Screen */}
          {currentTab === "account" && (
            <AccountScreen
              user={user}
              onUpdateUser={(updated) => setUser(updated)}
              onOpenAuth={handleLogout}
              onNavigateToReports={handleNavigateToReports}
              onReplayOnboarding={() => {
                try {
                  window.history.pushState(null, "", "/")
                } catch {
                  window.location.hash = ""
                }
                setAppFlow("splash")
              }}
            />
          )}

          {/* Full Height Notifications Screen */}
          {currentTab === "notifications" && (
            <NotificationsScreen
              onNavigateToRequests={() => {
                setPreviousTab("notifications")
                setCurrentTab("book")
                setBookSubTab("requests")
              }}
              onNavigateToReminders={() => {
                setPreviousTab("notifications")
                setCurrentTab("my-well")
                setMyWellSubTab("reminders")
              }}
              onNavigateToEquipment={() => {
                setPreviousTab("notifications")
                setCurrentTab("my-well")
                setMyWellSubTab("equipment")
              }}
            />
          )}
        </main>

        {/* Bottom Navigation Bar (4 tabs: Home, Book, SOS, My Well) */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setPreviousTab(currentTab)
            if (tab === "my-well") setMyWellSubTab("equipment")
            if (tab === "book") setBookSubTab("book")
            setCurrentTab(tab)
          }}
          bookBadgeCount={activeRequestsCount}
          hasMyWellBadge={true}
          isHidden={false}
        />
      </div>
    </div>
  )
}

export default App
