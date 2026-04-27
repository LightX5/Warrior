export const bookingStorageKey = "warrior-lens-booking-progress-v4";

export const initialBookingValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  duration: "",
  date: "",
  location: "",
  message: "",
};

export const locationSuggestions = [
  "Lagos",
  "Studio Session",
  "OAU Campus",
  "Destination Shoot",
];

export const durationOptions = [
  {
    value: "1 hour",
    label: "1 Hour",
    detail: "Short portraits, minis, or tightly directed sessions.",
  },
  {
    value: "2 hours",
    label: "2 Hours",
    detail: "A strong middle ground for portraits, grads, and concept sets.",
  },
  {
    value: "4 hours",
    label: "Half Day",
    detail: "For event highlights, layered storytelling, or multiple looks.",
  },
  {
    value: "8 hours",
    label: "Full Day",
    detail: "Best for weddings, conferences, and deeper documentary coverage.",
  },
  {
    value: "Custom scope",
    label: "Custom",
    detail: "For campaigns, travel, production-heavy, or multi-location shoots.",
  },
];

export const bookingSteps = [
  {
    id: "service",
    shortLabel: "Service",
    eyebrow: "Step 1",
    title: "Select the service you want to book.",
    copy: "Choose the kind of coverage you need and how long you expect it to run.",
    fields: ["service", "duration"],
  },
  {
    id: "schedule",
    shortLabel: "Date",
    eyebrow: "Step 2",
    title: "Choose the date and location.",
    copy: "Share the preferred date and where the session should happen so availability can be checked properly.",
    fields: ["date", "location"],
  },
  {
    id: "details",
    shortLabel: "Details",
    eyebrow: "Step 3",
    title: "Enter your details and the shoot brief.",
    copy: "This is where Warrior Lens learns who to reply to and what kind of experience you want created.",
    fields: ["name", "email", "phone", "message"],
  },
  {
    id: "review",
    shortLabel: "Review",
    eyebrow: "Step 4",
    title: "Review everything before you continue.",
    copy: "This review step makes the booking feel more like a premium consultation than a generic form.",
    fields: [],
  },
  {
    id: "submit",
    shortLabel: "Submit",
    eyebrow: "Step 5",
    title: "Send the request and lock in the consultation.",
    copy: "Submit when the summary looks right. The request will be saved and delivered to the studio inbox.",
    fields: [],
  },
];
