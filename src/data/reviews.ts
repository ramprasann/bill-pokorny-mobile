export interface ReviewItem {
  id: string
  name: string
  town: string
  service: string
  stars: number
  date: string
  text: string
  verified: boolean
}

export const initialReviewsData: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Anneliese Manere",
    town: "Weston, CT",
    service: "Hard water & hot water tank service",
    stars: 5,
    date: "Recent Customer",
    verified: true,
    text: "I recently had the pleasure of using Bill Pokorny Pump and Filter for a hard water issue and hot water tank service, and I can't recommend Bill and the team highly enough! From start to finish, the professionalism and expertise were evident.\n\nBill arrived promptly and was incredibly knowledgeable. He took the time to explain the issues with our water system and offered several options for helping us get soft water, ensuring I understood the process and the costs involved. The transparency was refreshing.\n\nThe work was completed efficiently, and Bill left the site clean. I was particularly impressed with the attention to detail and the care they took in ensuring everything was functioning perfectly before they left, and showing us how to use our new system. Since the service, my water has improved significantly, and I've had no issues at all. This is the team you want on your side!"
  },
  {
    id: "rev-2",
    name: "David & Sarah K.",
    town: "Fairfield, CT",
    service: "Emergency Well Pump Replacement",
    stars: 5,
    date: "3 months ago",
    verified: true,
    text: "Woke up on a Sunday morning with zero water. Called Bill, and he answered on the third ring. He arrived within two hours with a replacement submersible pump on his truck, pulled the 280-foot line, replaced the pump and wiring, and had our water back on by mid-afternoon. Straight shooter and fair price."
  },
  {
    id: "rev-3",
    name: "Mark T.",
    town: "Wilton, CT",
    service: "Pressure Tank & Switch Calibration",
    stars: 5,
    date: "5 months ago",
    verified: true,
    text: "Our well pump was short-cycling and clicking like crazy every 10 seconds. Another company wanted to dig up my yard and replace everything. Bill inspected the pressure tank, identified a ruptured bladder, replaced the tank with a heavy-duty model, and set the pre-charge to 38 PSI. Fixed it for a fraction of what others quoted."
  },
  {
    id: "rev-4",
    name: "Eleanor P.",
    town: "Easton, CT",
    service: "Iron & Manganese Filtration System",
    stars: 5,
    date: "6 months ago",
    verified: true,
    text: "We had terrible rust staining on all our bathroom fixtures and laundry. Bill tested our well water on-site, clearly explained the iron ppm count, and installed a dedicated filtration unit. Three days later, water is crystal clear and fixtures are completely stain-free. True 45-year master of his craft."
  }
]

