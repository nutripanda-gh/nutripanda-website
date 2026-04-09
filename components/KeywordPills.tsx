"use client";

import { type ReactNode, useEffect, useState } from "react";

const IC = "w-8 h-8 sm:w-10 sm:h-10 shrink-0";

// Lucide-based icons, colored in brand green
const icons = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  sprout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" />
      <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
      <path d="M5 21h14" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  ),
  candyOff: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M10 10v7.9" />
      <path d="M11.802 6.145a5 5 0 0 1 6.053 6.053" />
      <path d="M14 6.1v2.243" />
      <path d="m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965" />
      <path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4" />
      <path d="m2 2 20 20" />
      <path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
      <circle cx="13.5" cy="6.5" r=".5" fill="#12BC00" />
      <circle cx="17.5" cy="10.5" r=".5" fill="#12BC00" />
      <circle cx="6.5" cy="12.5" r=".5" fill="#12BC00" />
      <circle cx="8.5" cy="7.5" r=".5" fill="#12BC00" />
    </svg>
  ),
  badgeCheck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  cookie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" />
    </svg>
  ),
  shieldCheck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
      <path d="M6.453 15h11.094" />
      <path d="M8.5 2h7" />
    </svg>
  ),
  atom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
  ),
  mapPin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  wheatOff: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="m2 22 10-10" />
      <path d="m16 8-1.17 1.17" />
      <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97" />
      <path d="M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62" />
      <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
      <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
      <path d="m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98" />
      <path d="M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  ),
  eggOff: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="m2 2 20 20" />
      <path d="M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19" />
      <path d="M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568" />
    </svg>
  ),
  trees: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
      <path d="M7 16v6" /><path d="M13 19v3" />
      <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
    </svg>
  ),
  pill: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={IC}>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  ),
};

// Each card slot cycles through label+icon pairs
const CARD_SLOTS: { items: { label: string; icon: ReactNode }[] }[] = [
  {
    items: [
      { label: "100% Vegan", icon: icons.leaf },
      { label: "Pectin-Based", icon: icons.sprout },
      { label: "Cruelty Free", icon: icons.heart },
      { label: "For Him & Her", icon: icons.users },
    ],
  },
  {
    items: [
      { label: "0 Added Sugar", icon: icons.candyOff },
      { label: "No Artificial Colors", icon: icons.palette },
      { label: "Clean Label", icon: icons.badgeCheck },
      { label: "Tasty & Delicious", icon: icons.cookie },
    ],
  },
  {
    items: [
      { label: "FSSAI Approved", icon: icons.shieldCheck },
      { label: "Clinically Tested", icon: icons.flask },
      { label: "Science-Backed", icon: icons.atom },
      { label: "Made in India", icon: icons.mapPin },
    ],
  },
  {
    items: [
      { label: "Gluten Free", icon: icons.wheatOff },
      { label: "Gelatin Free", icon: icons.eggOff },
      { label: "Natural Ingredients", icon: icons.trees },
      { label: "Daily Vitamins", icon: icons.pill },
    ],
  },
];

function KeywordCard({ items }: { items: { label: string; icon: ReactNode }[] }) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-[16px] border border-[#12BC00]/25 bg-white w-[90px] h-[90px] sm:w-[130px] sm:h-[120px]">
      <div className={`transition-opacity duration-400 ease-in-out ${fading ? "opacity-0" : "opacity-100"}`}>
        {items[index].icon}
      </div>
      <span
        className={`text-[10px] sm:text-xs font-semibold tracking-wide text-gray-500 whitespace-nowrap transition-opacity duration-400 ease-in-out ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        {items[index].label}
      </span>
    </div>
  );
}

export function MobileKeywordCards() {
  return (
    <div className="flex items-center justify-center gap-3 mt-5 sm:hidden">
      <KeywordCard {...CARD_SLOTS[0]} />
      <KeywordCard {...CARD_SLOTS[1]} />
    </div>
  );
}

export default function KeywordPills() {
  return (
    <>
      {/* Desktop — 2 on each side of panda */}
      <div className="absolute bottom-[140px] md:bottom-[180px] left-0 right-0 z-[8] hidden sm:flex items-center justify-center pointer-events-none">
        {/* Left 2 */}
        <div className="flex items-center gap-3 md:gap-4">
          <KeywordCard {...CARD_SLOTS[0]} />
          <KeywordCard {...CARD_SLOTS[1]} />
        </div>

        {/* Gap for the panda */}
        <div className="shrink-0 w-[280px] md:w-[340px]" />

        {/* Right 2 */}
        <div className="flex items-center gap-3 md:gap-4">
          <KeywordCard {...CARD_SLOTS[2]} />
          <KeywordCard {...CARD_SLOTS[3]} />
        </div>
      </div>
    </>
  );
}
