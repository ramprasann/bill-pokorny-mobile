export type BookingType = 
  | "New Install" 
  | "Replace" 
  | "Repair" 
  | "Maintenance / Water Test"

export type BookingStatus = 
  | "Received" 
  | "Scheduled" 
  | "On the way" 
  | "In progress" 
  | "Completed"
  | "Cancelled"

export interface ServiceRequest {
  id: string
  type: BookingType
  item: string
  description: string
  photos: string[]
  hasAudio?: boolean
  preferredDate: string
  preferredTime: "Morning (8am - 12pm)" | "Afternoon (12pm - 4pm)" | "Anytime"
  address: string
  town: string
  notes?: string
  attachWellDetails: boolean
  status: BookingStatus
  scheduledFor?: string
  technicianNotes?: string
  createdAt: string
  updatedAt: string
}

export const initialRequests: ServiceRequest[] = [
  {
    id: "REQ-2082",
    type: "Repair",
    item: "Pressure Switch & Tank Calibration",
    description: "Pump clicking rapidly every 15 seconds. Pressure gauge surges between 35 and 60 PSI.",
    photos: ["/images/gallery-4-tanks.jpg"],
    hasAudio: true,
    preferredDate: "2026-11-14",
    preferredTime: "Morning (8am - 12pm)",
    address: "144 Valley Forge Rd",
    town: "Weston",
    notes: "Basement access is through the external storm door.",
    attachWellDetails: true,
    status: "On the way",
    scheduledFor: "Today · ETA 10:45 AM",
    technicianNotes: "Bill is en route with replacement 40/60 switch and precharge gauges.",
    createdAt: "2026-11-13T08:30:00Z",
    updatedAt: "2026-11-13T10:15:00Z"
  },
  {
    id: "REQ-1944",
    type: "Maintenance / Water Test",
    item: "Annual Well System Checkup",
    description: "Complete electrical amperage check, tank pressure test, and hardness GPG water test.",
    photos: [],
    preferredDate: "2026-06-15",
    preferredTime: "Morning (8am - 12pm)",
    address: "144 Valley Forge Rd",
    town: "Weston",
    attachWellDetails: true,
    status: "Completed",
    scheduledFor: "June 15, 2026",
    technicianNotes: "Checked capacitor, tested pressure switch at 40/60 PSI. Cleaned contacts.",
    createdAt: "2026-06-10T09:00:00Z",
    updatedAt: "2026-06-15T11:30:00Z"
  }
]

