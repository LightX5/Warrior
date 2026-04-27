const suggestedRoutes = {
  booking: { label: "Book a Session", type: "booking" },
  portfolio: { label: "View Portfolio", type: "route", value: "/portfolio" },
  services: { label: "Explore Services", type: "route", value: "/services" },
  contact: { label: "Contact Studio", type: "route", value: "/contact" },
};

export const createWarriorAiGreeting = () => ({
  role: "assistant",
  text:
    "Hi, I'm Warrior AI. I can help you find the right Warrior Lens experience and point you to the best next step. What kind of shoot are you thinking about?",
  actions: [
    { label: "Portraits", type: "prompt", value: "Portraits" },
    { label: "Events", type: "prompt", value: "Events" },
    { label: "Creative Shoots", type: "prompt", value: "Creative Shoots" },
    { label: "Documentary", type: "prompt", value: "Documentary" },
  ],
});

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

export const buildWarriorAiReply = (userInput) => {
  const input = normalize(userInput);

  if (!input || includesAny(input, ["hi", "hello", "hey"])) {
    return {
      text:
        "Glad you're here. Tell me the kind of shoot you want, and I'll point you toward the best next step.",
      actions: createWarriorAiGreeting().actions,
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
