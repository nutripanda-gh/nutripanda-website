"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LeafIcon,
  SproutIcon,
  ShieldCheckIcon,
  PlantIcon,
} from "@/components/Icons";
import type { ReactNode } from "react";

const TRUST_BADGES: { label: string; icon: ReactNode }[] = [
  { label: "Sugar-Free", icon: <LeafIcon className="h-4 w-4 text-[#12BC00]" /> },
  { label: "Vegan", icon: <SproutIcon className="h-4 w-4 text-[#12BC00]" /> },
  { label: "FSSAI Compliant", icon: <ShieldCheckIcon className="h-4 w-4 text-[#12BC00]" /> },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
      stroke="#12BC00"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function TrustStrip() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-3.5 sm:gap-10 sm:py-4">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-2 sm:gap-2.5"
          >
            {badge.icon}
            <span className="text-[11px] font-medium tracking-wide text-white sm:text-sm">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Animated floating keyword tags around the panda
function FloatingTag({
  label,
  className,
  delay = "0s",
}: {
  label: string;
  className: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute z-[15] animate-float rounded-full border border-[#12BC00]/20 bg-white/90 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gray-700 shadow-lg shadow-green-900/5 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#12BC00]" />
      {label}
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[calc(100dvh-56px)] w-full overflow-hidden bg-gradient-to-b from-[#f0fdf0] via-white to-white">
      {/* Subtle decorative gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#12BC00]/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[400px] w-[400px] rounded-full bg-[#12BC00]/[0.03] blur-3xl" />


      {/* Main content grid */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-56px)] max-w-7xl grid-cols-1 items-center px-6 pb-20 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:pb-24 lg:pt-0">
        {/* Left: Copy */}
        <div
          className={`flex flex-col items-center text-center transition-all duration-700 ease-out lg:items-start lg:text-left ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* Small eyebrow badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#12BC00]/20 bg-[#12BC00]/[0.06] px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#12BC00] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#12BC00]" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-[#12BC00]">
              India&apos;s Natural Nutrition Gummies
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Clean Nutrition.
            <br />
            <span className="bg-gradient-to-r from-[#12BC00] to-[#0d9200] bg-clip-text text-transparent">
              Crafted for Wellness.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-md text-base leading-relaxed text-gray-500 sm:text-lg lg:max-w-lg">
            Nutrition gummies that actually taste good. No sugar, no
            gelatin, no compromise.
          </p>

          {/* Bullet trust points — desktop only */}
          <div className="mt-6 hidden flex-wrap items-center gap-x-5 gap-y-2 lg:flex">
            {["100% Vegan", "0 Added Sugar", "FSSAI Compliant"].map(
              (point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm font-medium text-gray-600">
                    {point}
                  </span>
                </div>
              ),
            )}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-[#12BC00] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-[#0fa600] hover:shadow-xl hover:shadow-green-600/30 active:scale-[0.98] sm:px-10 sm:text-base"
            >
              Explore Products
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] sm:px-10 sm:text-base"
            >
              Why NutriPanda?
            </Link>
          </div>

          {/* Mobile: trust pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:hidden">
            {["Sugar-Free", "Vegan", "FSSAI"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600"
              >
                <CheckIcon />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Panda with floating tags */}
        <div
          className={`relative mt-8 flex items-end justify-center lg:mt-0 lg:items-center transition-all duration-700 delay-200 ease-out ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Panda image */}
          <div className="relative">
            {/* Subtle glow behind panda */}
            <div className="absolute inset-0 translate-y-8 scale-90 rounded-full bg-[#12BC00]/[0.06] blur-3xl" />
            <Image
              src="/assets/hero.png"
              alt="NutriPanda mascot holding gummy bears"
              width={700}
              height={500}
              priority
              className="relative z-10 h-auto w-full max-w-[500px] object-contain lg:max-w-[600px]"
            />
          </div>
        </div>
      </div>

      {/* Bottom trust strip */}
      <TrustStrip />

    </section>
  );
}
