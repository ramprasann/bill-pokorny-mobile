# Bill Pokorny Pump & Filter — Dedicated Mobile Application

A premium, native Flutter-style mobile application developed for **Bill Pokorny Pump and Filter** (Weston, CT · CT Lic 208261 · 45 Years Experience), built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **shadcn/ui** patterns.

---

## 📱 Live App Overview & Stack

- **Framework:** React 18 & TypeScript
- **Bundler & Tooling:** Vite 8
- **Styling:** Tailwind CSS with custom industrial trade design tokens:
  - Well Navy (`#0f2340` / `#091527`)
  - Aquifer Blue (`#2f74b5`)
  - Logo Red (`#d7362c`)
  - Pipe Copper (`#b8743a`)
  - Equipment Monospace (`IBM Plex Mono`)
  - Display Condense (`Barlow Condensed`)
  - Body (`Source Sans 3`)
- **UI Architecture:** shadcn/ui components (`Card`, `Button`, `Badge`, `Input`, `Textarea`, `BottomSheet`, `Lightbox`), Lucide Icons, and Canvas Water Ripple simulation.
- **Offline Persistence:** `localStorage` for Equipment Passports, Maintenance Logs, and offline request queuing.

---

## 🌟 Key Application Features

### 1. Existing Website Features Incorporated
- **Comprehensive Trade Services:** Full breakdown of all 5 services with codes `SVC-01` to `SVC-05`:
  - **Well Pumps (`SVC-01`):** Submersible & jet pumps, pressure switch (30/50 & 40/60 PSI), capacitor and wiring diagnosis.
  - **Well Pressure Tanks (`SVC-02`):** Diaphragm & bladder tanks, air pre-charge calibrated to 2 PSI below cut-in, waterlogged tank repair.
  - **Water Filtration & Softening (`SVC-03`):** Hardness tested in GPG (grains per gallon), iron/manganese removal, UV 254nm sanitization.
  - **Water Heaters & Fixtures (`SVC-04`):** Indirect boilers, electric water heaters, designer faucets, outdoor showers.
  - **24/7 Emergency Service (`SVC-05`):** Complete no-water calls, burst pipes, frozen well lines.
- **Service Call Process:** 4-step workflow (*You Call → We Diagnose → You Choose → We Fix & Clean Up*).
- **Technical Specs:** True trade calibrations, CT License 208261 credentials.
- **About Bill Story:** 4-stage chronological timeline (*Roots in Weston → Starts in the Trade 45 years ago → Connecticut Licensed → 24/7 for the Community Today*).
- **Interactive Work Gallery:** 12 authentic job-site photos extracted from the original site with category filters (*Tanks, Pumps, Filtration, Heaters, Fixtures*) and modal zoom lightbox.
- **Customer Reviews:** Verified customer testimonials (including Anneliese Manere's hard water experience) and an in-app review submission form.

### 2. New Mobile App Utility Capabilities
- **24/7 Emergency SOS Cockpit (`/emergency`):**
  - High-priority emergency banner with pulsating line status.
  - 1-Tap emergency dialing to `(203) 671-1506`.
  - Direct pre-formatted emergency SMS dispatch.
  - **Interactive 3-Step "No Water?" Troubleshooting Wizard:**
    - Step 1: Electrical breaker diagnosis (safety alerts against repeated resets on shorts).
    - Step 2: Tank pressure gauge reading (0 PSI vs pegged).
    - Step 3: Leak & flooding assessment (safety alerts around water near 240V electricity).
    - Auto-compiles triage output for instant SMS dispatch to Bill.
- **"My Well System" Equipment Passport (`/system`):**
  - Homeowner's digital equipment tag stored locally on the phone.
  - Tracks well depth, pump HP, pressure tank model, switch setting (40/60 PSI), and filter cartridge specs (e.g. 20" Big Blue 5-micron spun).
  - Crucial emergency field: **Main Water Shut-Off Valve Location**.
  - Maintenance due counters for Filter Replacement and Softener Salt replenishment.
  - Interactive maintenance log for filter changes, salt refills, and water testing.
- **Interactive Symptom Diagnoser:**
  - Fast touch cards for common well issues: Sputtering taps, rapid clicking (short-cycling), orange rust staining, white limescale, rotten egg odor, and puddles at tank tee.
  - Slide-up bottom sheet explaining root causes, DIY safety checks, and 1-tap pre-filled estimate requests.
- **Fairfield County Coverage Validator:**
  - Fast search validator verifying service coverage across Weston, Fairfield, Westport, Easton, Wilton, Redding, Ridgefield, Trumbull, Monroe, and Norwalk.
- **Native Flutter-Style UI Patterns:**
  - Tactile Bottom Navigation Bar with active indicator pills.
  - Slide-up Bottom Sheets (`BottomSheet`) with drag handles and backdrop blur.
  - Micro-press animations (`active:scale-[0.97]` tap press feel).
  - Built-in device shell switcher on desktop screens for realistic mobile testing.

---

## 🚀 Running the Project

### Development Server:
```bash
npm run dev
```

### Production Build & Preview:
```bash
npm run build
npm run preview -- --port 4173
```
Open [http://localhost:4173](http://localhost:4173) in your browser.
