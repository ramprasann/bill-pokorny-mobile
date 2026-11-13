export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  town: string
  isGuest: boolean
  notifications: {
    push: boolean
    sms: boolean
    email: boolean
  }
  security: {
    biometricEnabled: boolean
  }
}

export const defaultUser: UserProfile = {
  id: "user-101",
  name: "David Sterling",
  email: "david.sterling@gmail.com",
  phone: "(203) 555-0182",
  address: "144 Valley Forge Rd",
  town: "Weston",
  isGuest: false,
  notifications: {
    push: true,
    sms: true,
    email: false
  },
  security: {
    biometricEnabled: true
  }
}

export const guestUser: UserProfile = {
  id: "guest-user",
  name: "Guest Homeowner",
  email: "",
  phone: "",
  address: "",
  town: "Weston",
  isGuest: true,
  notifications: {
    push: false,
    sms: false,
    email: false
  },
  security: {
    biometricEnabled: false
  }
}
