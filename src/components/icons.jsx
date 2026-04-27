const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
};

export const ArrowRightIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} {...iconProps}>
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </svg>
);

export const CameraIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M4 8h3l2-2h6l2 2h3v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export const CalendarIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M7 3v4" />
    <path d="M17 3v4" />
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M4 10h16" />
  </svg>
);

export const SparklesIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z" />
    <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />
    <path d="m5 14 .9 2.3L8 17l-2.1.7L5 20l-.9-2.3L2 17l2.1-.7Z" />
  </svg>
);

export const FilmIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 5v14" />
    <path d="M17 5v14" />
    <path d="M3 9h4" />
    <path d="M17 9h4" />
    <path d="M3 15h4" />
    <path d="M17 15h4" />
  </svg>
);

export const BrushIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M4 20c2 0 4-1 4-3 0-1 0-2 1-3l8-8a2.8 2.8 0 1 1 4 4l-8 8c-1 1-2 1-3 1-2 0-3 2-3 4Z" />
  </svg>
);

export const MenuIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

export const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="m6 6 12 12" />
    <path d="m18 6-12 12" />
  </svg>
);

export const InstagramIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
  </svg>
);

export const WhatsAppIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M13.601 2.326A7.85 7.85 0 0 0 8.034 0C3.602 0 0 3.6 0 8.032a8.06 8.06 0 0 0 1.085 4.032L0 16l4.032-1.053A8.004 8.004 0 0 0 8.032 16h.003c4.43 0 8.034-3.6 8.034-8.032a7.98 7.98 0 0 0-2.468-5.642Zm-5.57 12.296h-.002a6.63 6.63 0 0 1-3.378-.92l-.242-.145-2.39.626.638-2.33-.157-.24a6.65 6.65 0 0 1-1.028-3.543c0-3.667 2.984-6.65 6.654-6.65a6.61 6.61 0 0 1 4.704 1.95 6.6 6.6 0 0 1 1.948 4.706c-.002 3.667-2.985 6.65-6.65 6.65Z" />
    <path d="M11.615 9.257c-.167-.083-.99-.488-1.143-.545-.152-.058-.263-.083-.373.083-.11.165-.428.545-.524.655-.097.112-.194.125-.36.042-.165-.083-.698-.257-1.33-.82-.492-.438-.824-.98-.92-1.146-.097-.165-.01-.255.073-.338.075-.074.166-.194.248-.29.084-.097.111-.166.166-.277.054-.11.027-.208-.014-.291-.042-.084-.373-.898-.51-1.232-.137-.331-.277-.286-.373-.291a7.477 7.477 0 0 0-.318-.015c-.11 0-.289.042-.44.208-.152.166-.578.566-.578 1.379 0 .813.592 1.599.674 1.709.084.11 1.171 1.785 2.839 2.503.397.172.706.274.947.35.398.127.761.109 1.048.066.32-.048.99-.403 1.13-.792.139-.389.139-.722.097-.792-.041-.069-.152-.111-.318-.194Z" />
  </svg>
);

export const MailIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const PhoneIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.2a2 2 0 0 1-.6 1.8l-1.4 1.4a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 1.8-.6l3.2.5a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const MapPinIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ChevronLeftIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const PlusIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const MinusIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M5 12h14" />
  </svg>
);

export const BotIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <rect x="5" y="7" width="14" height="10" rx="3" />
    <path d="M12 3v4" />
    <path d="M9 12h.01" />
    <path d="M15 12h.01" />
    <path d="M9 17v2" />
    <path d="M15 17v2" />
    <path d="M8 7 6.2 5.2" />
    <path d="M16 7l1.8-1.8" />
  </svg>
);

export const SendIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} {...iconProps}>
    <path d="M21 3 3 10l7 2 2 7 9-16Z" />
    <path d="M10 12 21 3" />
  </svg>
);
