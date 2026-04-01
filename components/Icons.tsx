// Premium SVG icons — Lucide-inspired, 24x24 viewBox
// Centralized icon exports for use across the site

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const d: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// ── Legacy icons (used elsewhere) ──

export function GlutenFreeIcon({ className = "w-10 h-10 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="250" cy="250" r="195" stroke="#12BC00" strokeWidth="12" />
      <line x1="112" y1="388" x2="388" y2="112" stroke="#12BC00" strokeWidth="12" strokeLinecap="round" />
      <g fill="#12BC00" stroke="#12BC00" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="250" y1="380" x2="250" y2="130" strokeWidth="10" />
        <path d="M250 105 C232 145, 220 175, 250 200 C280 175, 268 145, 250 105Z" />
        <path d="M250 200 C225 175, 205 155, 175 162 C180 192, 205 210, 250 220Z" />
        <path d="M250 200 C275 175, 295 155, 325 162 C320 192, 295 210, 250 220Z" />
        <path d="M250 255 C225 230, 205 210, 175 217 C180 247, 205 265, 250 275Z" />
        <path d="M250 255 C275 230, 295 210, 325 217 C320 247, 295 265, 250 275Z" />
        <path d="M250 310 C228 288, 212 272, 185 278 C190 305, 212 320, 250 330Z" />
        <path d="M250 310 C272 288, 288 272, 315 278 C310 305, 288 320, 250 330Z" />
      </g>
    </svg>
  );
}

export function NoAddedSugarIcon({ className = "w-10 h-10 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="250" cy="250" r="195" stroke="#12BC00" strokeWidth="14" />
      <line x1="112" y1="388" x2="388" y2="112" stroke="#12BC00" strokeWidth="14" strokeLinecap="round" />
      <g fill="none" stroke="#12BC00" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round">
        <path d="M250 158 L342 208 L342 308 L250 358 L158 308 L158 208 Z" />
        <path d="M158 208 L250 258 L342 208" />
        <path d="M250 258 L250 358" />
      </g>
    </svg>
  );
}

// ── Ingredient Icons ──

export function LeafIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export function SproutIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8Z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z" />
    </svg>
  );
}

export function ZapIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

export function CitrusIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z" />
      <path d="M19.65 15.66A8 8 0 0 1 8.35 4.34" />
      <path d="m14 10-5.5 5.5" />
      <path d="M14 17.85V10H6.15" />
    </svg>
  );
}

export function PlantIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M15 2c-1.35 4-5.28 6-10 6 .85 5.25 4.63 9 10 9" />
      <path d="M9 22c1.35-4 5.28-6 10-6-.85-5.25-4.63-9-10-9" />
      <path d="M12 17V2" />
      <path d="M12 22v-5" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export function PillIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

export function DnaIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
      <path d="m17 6-2.5-2.5" />
      <path d="m14 8-1-1" />
      <path d="m7 18 2.5 2.5" />
      <path d="m3.5 14.5.5.5" />
      <path d="m20 9 .5.5" />
      <path d="m6.5 12.5 1 1" />
      <path d="m16.5 10.5 1 1" />
      <path d="m10 16 1.5 1.5" />
    </svg>
  );
}

export function GrapeIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M22 5V2l-5.89 5.89" />
      <circle cx="16.6" cy="15.89" r="3" />
      <circle cx="8.11" cy="7.4" r="3" />
      <circle cx="12.35" cy="11.65" r="3" />
      <circle cx="13.91" cy="5.85" r="3" />
      <circle cx="18.15" cy="10.09" r="3" />
      <circle cx="6.56" cy="13.2" r="3" />
      <circle cx="10.8" cy="17.44" r="3" />
      <circle cx="5" cy="19" r="3" />
    </svg>
  );
}

export function FlowerIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 16.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5a4.5 4.5 0 1 0 4.5-4.5" />
    </svg>
  );
}

// ── Benefit Icons ──

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function BatteryChargingIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
      <path d="m11 7-3 5h4l-3 5" />
      <line x1="22" x2="22" y1="11" y2="13" />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  );
}

export function BrainIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 0 1 12 6.006a5 5 0 0 1 7.5 6.572" />
      <path d="M4.5 12h2l1-2 2 4 2-4 1 2h2" />
    </svg>
  );
}

export function BoneIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
    </svg>
  );
}

export function LotusIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M12 2c0 4-3 7-3 12s3 6 3 6" />
      <path d="M12 2c0 4 3 7 3 12s-3 6-3 6" />
      <path d="M12 8c-3-1-6 1-8 5 2 4 5 6 8 5" />
      <path d="M12 8c3-1 6 1 8 5-2 4-5 6-8 5" />
      <path d="M2 17c2 0 4-1 6-3" />
      <path d="M22 17c-2 0-4-1-6-3" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export function LeafyGreenIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 14 5.846 3.5 3.5 0 0 0 7.264 8.83a3.5 3.5 0 0 0-1.088 6.089C5.12 16.393 3.96 19 2 22Z" />
      <path d="M2 22 17 7" />
    </svg>
  );
}

export function MoonStarIcon(props: IconProps) {
  return (
    <svg {...d} {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </svg>
  );
}
