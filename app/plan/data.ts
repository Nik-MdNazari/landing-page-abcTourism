export type Pace = "Relaxed" | "Balanced" | "Active";

export type ItineraryDay = {
  day: number;
  title: string;
};

export type Package = {
  id: string;
  name: string;
  matchLabel: string;
  coverImage: string;
  durationDays: number;
  destinations: string[];
  pricePerPerson: number;
  currency: "MYR";
  aiRationale: string;
  tags: string[];
  pace: Pace;
  bestFor: string;
  itineraryPreview: ItineraryDay[];
};

export type UserContext = {
  destination: string;
  durationDays: number;
  travelWindow: string;
  topInterests: string[];
};

export const userContext: UserContext = {
  destination: "Ipoh Old Town",
  durationDays: 3,
  travelWindow: "a long weekend",
  topInterests: ["Heritage & Culture", "Food & Culinary"],
};

export const packages: Package[] = [
  {
    id: "pkg_001",
    name: "Old Town Culture & Kopitiam Trail",
    matchLabel: "98% Match",
    coverImage: "/images/ipoh-3.jpg",
    durationDays: 3,
    destinations: ["Concubine Lane", "Kong Heng Square", "Birch Tower"],
    pricePerPerson: 380,
    currency: "MYR",
    aiRationale: "Handpicked for slow-paced heritage walks with strong kopitiam culture and boutique shophouse stays.",
    tags: ["Food tours", "Boutique stays", "Private guide", "Low crowds"],
    pace: "Relaxed",
    bestFor: "Food lovers & culture seekers",
    itineraryPreview: [
      { day: 1, title: "Arrive Old Town, evening walk through Concubine Lane" },
      { day: 2, title: "Kopitiam breakfast crawl + Birch Tower heritage walk" },
      { day: 3, title: "Mural Art's Lane, then a slow lunch at Kong Heng Square" },
    ],
  },
  {
    id: "pkg_002",
    name: "Ipoh Highlights Explorer",
    matchLabel: "Best Value",
    coverImage: "/images/tour-1.jpg",
    durationDays: 3,
    destinations: ["Old Town", "Railway Station", "Tambun Caves"],
    pricePerPerson: 240,
    currency: "MYR",
    aiRationale: "A well-rounded introduction covering major landmarks at a comfortable pace with group-friendly stays.",
    tags: ["Landmarks", "Group-friendly", "Cave temples", "Budget-friendly"],
    pace: "Balanced",
    bestFor: "First-time visitors on a budget",
    itineraryPreview: [
      { day: 1, title: "Arrive Ipoh, Railway Station & clock tower loop" },
      { day: 2, title: "Day trip to Perak Tong & Sam Poh Tong cave temples" },
      { day: 3, title: "Old Town self-guided walk, pasar malam in the evening" },
    ],
  },
  {
    id: "pkg_003",
    name: "Ipoh Premium Escape",
    matchLabel: "Premium Pick",
    coverImage: "/images/ipoh-5.jpg",
    durationDays: 3,
    destinations: ["Old Town", "Kellie's Castle", "Tambun"],
    pricePerPerson: 620,
    currency: "MYR",
    aiRationale: "For travellers who want a private guide, fine dining reservations and a slower, story-led pace.",
    tags: ["Private car", "Fine dining", "Private guide", "Fewer stops"],
    pace: "Relaxed",
    bestFor: "Special occasions & luxury seekers",
    itineraryPreview: [
      { day: 1, title: "Private arrival transfer, welcome dinner at Foh San" },
      { day: 2, title: "Private-guided Old Town walk + Kellie's Castle at golden hour" },
      { day: 3, title: "Slow morning at Tambun, private car to the airport" },
    ],
  },
];

export function formatPrice(amount: number, currency: "MYR") {
  if (currency === "MYR") return `RM ${amount.toLocaleString("en-MY")}`;
  return `${currency} ${amount.toLocaleString()}`;
}
