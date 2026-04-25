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
  <svg className={className} {...iconProps}>
    <path d="M20 12a8 8 0 0 1-11.7 7l-4.3 1 1.1-4.1A8 8 0 1 1 20 12Z" />
    <path d="M9 8.6c-.3-.7-.7-.6-1-.6h-.8c-.3 0-.8.1-1.1.5-.4.4-1.4 1.3-1.4 3.2s1.4 3.7 1.6 4c.2.3 2.7 4.3 6.6 5.8 3.2 1.2 3.9 1 4.6.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5l-2.3-1.1c-.4-.2-.7-.2-1 .2l-.8 1c-.2.2-.4.3-.8.1-1.3-.6-2.4-1.5-3.3-2.4-.8-.9-1.5-2-1.7-2.4-.2-.4 0-.6.2-.8l.7-.8c.2-.2.3-.4.4-.6.1-.2.1-.5 0-.7Z" />
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
