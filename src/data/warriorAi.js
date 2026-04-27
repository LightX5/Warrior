const suggestedRoutes = {
  booking: { label: "Book a Session", type: "booking" },
  portfolio: { label: "View Portfolio", type: "route", value: "/portfolio" },
  services: { label: "Explore Services", type: "route", value: "/services" },
  contact: { label: "Contact Studio", type: "route", value: "/contact" },
};

const shootPrompts = [
  { label: "Portraits", type: "prompt", value: "Portraits" },
  { label: "Events", type: "prompt", value: "Events" },
  { label: "Creative Shoots", type: "prompt", value: "Creative Shoots" },
  { label: "Documentary", type: "prompt", value: "Documentary" },
];

const warriorAiRouteContexts = {
  "/": {
    panelTitle: "Studio Guide",
    panelCopy:
      "A premium preview assistant for helping visitors move toward the right next step.",
    launcherCopy: "Ask about shoots, pricing, or next steps",
    placeholder: "Tell Warrior AI the kind of shoot you want...",
    greeting:
      "Hi, I'm Warrior AI. I can help you find the right Warrior Lens experience and point you to the best next step. What kind of shoot are you thinking about?",
    actions: shootPrompts,
  },
  "/portfolio": {
    panelTitle: "Portfolio Guide",
    panelCopy:
      "Use the work on this page to narrow your mood, then move naturally into booking when you're ready.",
    launcherCopy: "Need help choosing the right style or collection?",
    placeholder: "Tell Warrior AI the mood or type of work you want...",
    greeting:
      "You're viewing the portfolio. Tell me the kind of mood, coverage, or story you want, and I'll point you to the strongest next step.",
    actions: [
      { label: "Portrait Mood", type: "prompt", value: "Portraits" },
      { label: "Event Coverage", type: "prompt", value: "Events" },
      suggestedRoutes.booking,
      suggestedRoutes.services,
    ],
  },
  "/services": {
    panelTitle: "Services Guide",
    panelCopy:
      "I can help you narrow the right offer before you move into the booking consultation.",
    launcherCopy: "Need help choosing the right service?",
    placeholder: "Ask Warrior AI which service fits your session...",
    greeting:
      "You're on the services page. Tell me the type of session you're considering, and I'll help you narrow the right offer and next step.",
    actions: [
      { label: "Portrait Service", type: "prompt", value: "Portraits" },
      { label: "Event Service", type: "prompt", value: "Events" },
      { label: "Creative Service", type: "prompt", value: "Creative Shoots" },
      { label: "Documentary Service", type: "prompt", value: "Documentary" },
    ],
  },
  "/booking": {
    panelTitle: "Booking Assistant",
    panelCopy:
      "I can help clarify service type, date planning, or what to include in your booking brief.",
    launcherCopy: "Need help choosing a service or planning the brief?",
    placeholder: "Ask Warrior AI about service, date, location, or your brief...",
    greeting:
      "You're already in the booking flow. If you want help choosing a service, duration, or what to write in your brief, I can guide you before you submit.",
    actions: [
      { label: "Pricing Help", type: "prompt", value: "Pricing" },
      { label: "Portrait Booking", type: "prompt", value: "Portraits" },
      { label: "Event Booking", type: "prompt", value: "Events" },
      suggestedRoutes.contact,
    ],
  },
  "/contact": {
    panelTitle: "Contact Assistant",
    panelCopy:
      "I can point you to the fastest channel or move you into the booking consultation if you're ready.",
    launcherCopy: "Need the fastest way to reach the studio?",
    placeholder: "Ask Warrior AI about contact options or booking...",
    greeting:
      "You're on the contact page. If you want the fastest path, I can point you toward WhatsApp, direct contact, or the full booking consultation.",
    actions: [
      { label: "WhatsApp", type: "prompt", value: "WhatsApp" },
      { label: "Email", type: "prompt", value: "Email contact" },
      suggestedRoutes.booking,
      suggestedRoutes.services,
    ],
  },
};

export const getWarriorAiRouteContext = (pathname = "/") =>
  warriorAiRouteContexts[pathname] ?? warriorAiRouteContexts["/"];

export const createWarriorAiGreeting = (pathname = "/") => {
  const routeContext = getWarriorAiRouteContext(pathname);

  return {
    role: "assistant",
    text: routeContext.greeting,
    actions: routeContext.actions,
  };
};

const shootReplies = {
  portraits: {
    text:
      "Portrait work is a strong Warrior Lens fit, especially when you want something polished, emotionally grounded, and visually intentional. The booking page is usually the best next step, then the portfolio can help you refine the mood you want.",
    actions: [suggestedRoutes.booking, suggestedRoutes.portfolio, suggestedRoutes.services],
  },
  events: {
    text:
      "Event coverage works best when Warrior Lens can review the occasion, timing, and location together. The booking flow is the clearest next step, and the services page can help if you want a quick overview first.",
    actions: [suggestedRoutes.booking, suggestedRoutes.services, suggestedRoutes.portfolio],
  },
  creative: {
    text:
      "Creative shoots usually benefit from a little more direction and concept planning, which makes the booking consultation the right place to start. If you want visual confidence first, the portfolio is a strong companion.",
    actions: [suggestedRoutes.booking, suggestedRoutes.portfolio, suggestedRoutes.services],
  },
  documentary: {
    text:
      "Documentary-style work is all about atmosphere, people, and honest moments. Warrior Lens can review the story, timing, and setting with you through the booking flow, then follow up personally.",
    actions: [suggestedRoutes.booking, suggestedRoutes.portfolio, suggestedRoutes.services],
  },
};

const normalize = (value = "") => value.trim().toLowerCase();

const includesAny = (value, terms) => terms.some((term) => value.includes(term));

const detectShootType = (value) => {
  if (includesAny(value, ["portrait", "portraits", "headshot", "graduate", "graduation"])) {
    return "portraits";
  }

  if (includesAny(value, ["event", "wedding", "birthday", "conference", "ceremony"])) {
    return "events";
  }

  if (includesAny(value, ["creative", "concept", "editorial", "brand", "campaign"])) {
    return "creative";
  }

  if (includesAny(value, ["documentary", "story", "culture", "candid", "real moments"])) {
    return "documentary";
  }

  return null;
};

export const buildWarriorAiReply = (userInput, pathname = "/") => {
  const input = normalize(userInput);

  if (!input || includesAny(input, ["hi", "hello", "hey"])) {
    return {
      text:
        "Glad you're here. Tell me the kind of shoot you want, and I'll point you toward the best next step.",
      actions: createWarriorAiGreeting(pathname).actions,
    };
  }

  if (includesAny(input, ["portfolio", "gallery", "see work", "show me your work"])) {
    return {
      text:
        "The portfolio page is the fastest way to get a feel for Warrior Lens style across portraits, events, creative shoots, and documentary work.",
      actions: [suggestedRoutes.portfolio, suggestedRoutes.booking, suggestedRoutes.services],
    };
  }

  if (includesAny(input, ["contact", "email", "whatsapp", "phone"])) {
    return {
      text:
        "If you want to reach the studio directly, the contact page keeps every channel in one place, including WhatsApp, email, and the direct message form.",
      actions: [suggestedRoutes.contact, suggestedRoutes.booking, suggestedRoutes.services],
    };
  }

  if (includesAny(input, ["service", "services", "offer", "offering", "what do you do"])) {
    return {
      text:
        "The services page gives you the clearest overview of Warrior Lens offers, and the booking page is the best follow-up once you know the type of coverage you want.",
      actions: [suggestedRoutes.services, suggestedRoutes.booking, suggestedRoutes.portfolio],
    };
  }

  if (includesAny(input, ["price", "pricing", "quote", "cost", "budget"])) {
    return {
      text:
        "The best pricing path is still the booking flow, because Warrior Lens needs the service type, duration, location, and date to respond properly instead of guessing.",
      actions: [suggestedRoutes.booking, suggestedRoutes.services, suggestedRoutes.portfolio],
    };
  }

  const shootType = detectShootType(input);
  if (shootType) {
    return shootReplies[shootType];
  }

  return {
    text:
      "That sounds like something Warrior Lens can shape into a strong visual story. The clearest next move is the booking page so the studio can review your request personally. If you want more context first, the portfolio and services pages are the best places to continue.",
    actions: [suggestedRoutes.booking, suggestedRoutes.portfolio, suggestedRoutes.services],
  };
};
