import { portfolioItems } from "../data/portfolio";

export const siteMetadata = {
  title: "Warrior Lens Studio | Every Frame Tells a Story",
  description:
    "Warrior Lens Studio is a premium visual storytelling photography platform for portraits, documentary work, events, and creative sessions.",
};

export const siteConfig = {
  brandName: "Warrior Lens",
  projectName: "Warrior Lens Studio",
  tagline: "Every Frame Tells a Story",
  founder: "Obe Oluwagbemiga",
  founderRole: "Founder & CEO",
  founderImage: "/team/obe-oluwagbemiga-ceo.jpg",
  instagramHandle: "@warriorlens_media",
  instagramUrl: "https://www.instagram.com/warriorlens_media/",
  facebookHandle: "@WarriorLens",
  facebookUrl: "https://www.facebook.com/WarriorLens/",
  email: "warriorlensmedia@gmail.com",
  phoneNumber: "+2347052878009",
  whatsappNumber: "2347052878009",
  whatsappUrl: "https://wa.me/message/IDVEVDXGS73HB1",
  portfolioUrl: "https://pixies.et/aAYtWZVn",
};

const heroSlideIds = [
  "portrait-oyin-graduation",
  "documentary-child-peek",
  "creative-sunset-profile",
];

export const heroSlides = heroSlideIds
  .map((id, index) => {
    const item = portfolioItems.find((portfolioItem) => portfolioItem.id === id);

    if (!item) {
      return null;
    }

    return {
      ...item,
      badge: ["Portraiture", "Documentary", "Conceptual"][index] ?? item.category,
    };
  })
  .filter(Boolean);
