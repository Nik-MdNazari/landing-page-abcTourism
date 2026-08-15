export type QuestionOption = { label: string; value: string };
export type OptionGroup = { name: string; options: QuestionOption[] };

export type Question =
  | { key: string; type: "single"; title: string; subtitle?: string; options: QuestionOption[] }
  | { key: string; type: "grouped-multi"; title: string; subtitle?: string; groups: OptionGroup[]; max: number }
  | { key: "contact"; type: "contact"; title: string; subtitle?: string };

export const questions: Question[] = [
  {
    key: "companions",
    type: "single",
    title: "Who's this trip for?",
    options: [
      { label: "Solo traveller", value: "a solo trip" },
      { label: "A couple", value: "a couple's trip" },
      { label: "Family with kids", value: "a family trip" },
      { label: "Friends group", value: "a trip with friends" },
    ],
  },
  {
    key: "travelWindow",
    type: "single",
    title: "How long are you exploring Ipoh?",
    options: [
      { label: "A day trip", value: "a day trip" },
      { label: "A long weekend", value: "a long weekend" },
      { label: "A full week", value: "a full week" },
      { label: "Still deciding", value: "a trip" },
    ],
  },
  {
    key: "interests",
    type: "grouped-multi",
    title: "What do you love?",
    subtitle: "Choose what interests you most — up to 5.",
    max: 5,
    groups: [
      {
        name: "Popular",
        options: [
          { label: "Heritage & Culture", value: "Heritage & Culture" },
          { label: "Food & Culinary", value: "Food & Culinary" },
          { label: "Nature & Outdoors", value: "Nature & Outdoors" },
          { label: "Street Art", value: "Street Art" },
        ],
      },
      {
        name: "Food & Drink",
        options: [
          { label: "Kopitiam Breakfast", value: "Kopitiam Breakfast" },
          { label: "Hawker Stalls", value: "Hawker Stalls" },
          { label: "Fine Dining", value: "Fine Dining" },
          { label: "Dessert Cafes", value: "Dessert Cafes" },
        ],
      },
      {
        name: "Culture & Heritage",
        options: [
          { label: "Old Town Walks", value: "Old Town Walks" },
          { label: "Cave Temples", value: "Cave Temples" },
          { label: "Colonial Architecture", value: "Colonial Architecture" },
          { label: "Local Museums", value: "Local Museums" },
        ],
      },
      {
        name: "Nightlife & Markets",
        options: [
          { label: "Pasar Malam", value: "Pasar Malam" },
          { label: "Live Music", value: "Live Music" },
          { label: "Riverside Bars", value: "Riverside Bars" },
        ],
      },
    ],
  },
  {
    key: "budget",
    type: "single",
    title: "What's your budget style?",
    options: [
      { label: "Budget-friendly", value: "Budget-friendly" },
      { label: "Mid-range", value: "Mid-range" },
      { label: "Luxury", value: "Luxury" },
    ],
  },
  {
    key: "pace",
    type: "single",
    title: "What pace suits you?",
    options: [
      { label: "Relaxed", value: "relaxed" },
      { label: "Balanced", value: "balanced" },
      { label: "Active", value: "active" },
    ],
  },
  {
    key: "stay",
    type: "single",
    title: "Where would you like to stay?",
    options: [
      { label: "Boutique shophouse", value: "Boutique shophouse" },
      { label: "Standard hotel", value: "Standard hotel" },
      { label: "Homestay", value: "Homestay" },
      { label: "Luxury resort", value: "Luxury resort" },
    ],
  },
  {
    key: "contact",
    type: "contact",
    title: "Almost done — who do we send it to?",
    subtitle: "We'll use this to personalize your itinerary.",
  },
];
