const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockDestinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    popularity: 92,
    cost: "$$",
    details: "Beachside temples, rice terraces, and ocean sunsets.",
  },
  {
    id: 2,
    name: "Lisbon",
    country: "Portugal",
    popularity: 88,
    cost: "$$$",
    details: "Historic neighborhoods, coastal views, and café culture.",
  },
  {
    id: 3,
    name: "Queenstown",
    country: "New Zealand",
    popularity: 85,
    cost: "$$$$",
    details: "Adventure hub surrounded by alpine lakes and mountains.",
  },
];

export const mockActivities = [
  {
    id: 1,
    title: "Sunrise hike",
    category: "Adventure",
    duration: "4h",
    cost: "$120",
    description: "Guided mountain trek with breakfast views.",
  },
  {
    id: 2,
    title: "City food tour",
    category: "Culture",
    duration: "3h",
    cost: "$75",
    description: "Tasting local favorites with a guide.",
  },
  {
    id: 3,
    title: "Private yacht cruise",
    category: "Relaxation",
    duration: "5h",
    cost: "$210",
    description: "Sunset sailing with snacks and onboard music.",
  },
];

export const mockTrips = [
  {
    id: 1,
    name: "Bali Escape",
    destinationCount: 4,
    dates: "May 10 - May 17",
    status: "Completed",
    budgetUsed: "$1,980",
    image: "bali",
  },
  {
    id: 2,
    name: "Lisbon Weekend",
    destinationCount: 2,
    dates: "June 2 - June 6",
    status: "Upcoming",
    budgetUsed: "$1,260",
    image: "lisbon",
  },
  {
    id: 3,
    name: "Queenstown Adventure",
    destinationCount: 3,
    dates: "July 12 - July 20",
    status: "Planned",
    budgetUsed: "$2,450",
    image: "queenstown",
  },
];

export const mockItinerary = [
  {
    id: 1,
    day: "Day 1",
    city: "Ubud",
    highlights: ["Temple visit", "Rice terrace walk"],
    activities: ["Temple tour", "Lunch in a jungle café"],
    budget: "$180",
    notes: "Start slow and enjoy the green landscape.",
  },
  {
    id: 2,
    day: "Day 2",
    city: "Canggu",
    highlights: ["Beach sunset", "Surf lesson"],
    activities: ["Morning surf", "Beach club evening"],
    budget: "$220",
    notes: "Book the surf lesson in advance.",
  },
  {
    id: 3,
    day: "Day 3",
    city: "Seminyak",
    highlights: ["Spa", "Dining"],
    activities: ["Spa experience", "Fine dining"],
    budget: "$260",
    notes: "Reserve a table for dinner." ,
  },
];

export const mockBudget = {
  totalBudget: "$4,200",
  spent: "$2,930",
  remaining: "$1,270",
  averageDaily: "$315",
  categories: [
    { name: "Accommodation", value: 38, amount: "$1,600" },
    { name: "Food & Drink", value: 22, amount: "$650" },
    { name: "Transport", value: 16, amount: "$470" },
    { name: "Experiences", value: 14, amount: "$420" },
    { name: "Shopping", value: 10, amount: "$290" },
  ],
};

export const mockPacking = [
  {
    id: 1,
    category: "Essentials",
    items: [
      { id: 101, label: "Passport", completed: true },
      { id: 102, label: "Travel insurance", completed: false },
      { id: 103, label: "Phone charger", completed: true },
    ],
  },
  {
    id: 2,
    category: "Clothing",
    items: [
      { id: 201, label: "Light jacket", completed: false },
      { id: 202, label: "Swimwear", completed: true },
      { id: 203, label: "Comfortable shoes", completed: false },
    ],
  },
];

export const mockJournal = [
  {
    id: 1,
    day: "Day 1",
    timestamp: "May 10, 2026",
    note: "Arrived in Bali and took a sunset walk along the rice fields.",
  },
  {
    id: 2,
    day: "Day 2",
    timestamp: "May 11, 2026",
    note: "Loved the market visit and the local coffee tasting.",
  },
];

export const mockProfile = {
  name: "Mia Anderson",
  email: "mia@example.com",
  city: "San Francisco",
  savedDestinations: ["Bali", "Lisbon", "Kyoto"],
  preferences: ["Beach escapes", "Local experiences", "Wellness"],
};

export const getDashboardData = async () => {
  await delay(700);
  return {
    recommended: mockDestinations,
    previousTrips: mockTrips,
    budgetSummary: mockBudget,
    quickActions: [
      { id: 1, title: "Plan new itinerary", description: "Start a new trip plan from scratch." },
      { id: 2, title: "Search cities", description: "Discover destinations that fit your style." },
      { id: 3, title: "Track spending", description: "Keep your budget aligned with your plan." },
    ],
  };
};

export const getTrips = async () => {
  await delay(650);
  return mockTrips;
};

export const getDestinations = async () => {
  await delay(650);
  return mockDestinations;
};

export const getActivities = async () => {
  await delay(650);
  return mockActivities;
};

export const getItineraryData = async () => {
  await delay(750);
  return mockItinerary;
};

export const getBudgetData = async () => {
  await delay(700);
  return mockBudget;
};

export const getPackingChecklist = async () => {
  await delay(650);
  return mockPacking;
};

export const getSharedItinerary = async () => {
  await delay(700);
  return {
    title: "Savvy Bali Retreat",
    description: "A premium shared itinerary built for a 7-day coastal escape.",
    days: mockItinerary,
  };
};

export const getProfileData = async () => {
  await delay(650);
  return mockProfile;
};

export const getJournalNotes = async () => {
  await delay(650);
  return mockJournal;
};
