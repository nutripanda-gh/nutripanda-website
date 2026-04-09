"use client";

import { useState } from "react";

/* ─── Dose Difference Table ─── */
const comparisons = [
  {
    label: "Hyaluronic Acid",
    us: "100mg LMW",
    them: "~5mg",
  },
  {
    label: "Lab Reports",
    us: "QR — every pack",
    them: "Not available",
  },
  {
    label: "Angel Dusting",
    us: "Never",
    them: "Standard practice",
  },
];

/* ─── How It Works ─── */
const steps = [
  { num: "01", text: "Pick your goal — Immunity or Skin" },
  { num: "02", text: "Take one gummy daily — tastes good, you'll remember" },
  { num: "03", text: "Scan the QR — verify every ingredient yourself" },
];

/* ─── FAQs ─── */
const faqs = [
  {
    q: "Is a gummy as effective as a capsule?",
    a: "Yes — if the dose is right. 100mg HA in a gummy beats 5mg in a capsule every time.",
  },
  {
    q: "When will I see results?",
    a: "60–90 days of consistent use. Anyone promising a week is lying.",
  },
  {
    q: "Are these vegan?",
    a: "100%. Pectin base, zero gelatin, zero animal ingredients.",
  },
  {
    q: "How do I verify what's inside?",
    a: "Scan the QR on the pack. Third-party lab report. Every batch.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-0 border-t border-black/10">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left sm:py-6"
              aria-expanded={isOpen}
            >
              <span className="pr-4 text-sm font-medium text-gray-900 sm:text-base">
                {faq.q}
              </span>
              <span
                className={`shrink-0 text-xl leading-none text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-40 pb-5 opacity-100 sm:pb-6" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm leading-relaxed text-gray-500">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ComingSoonSections() {
  return (
    <div className="relative bg-white">
      {/* ━━━ Section 1: Brand Statement ━━━ */}
      <section className="px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-green">
            The truth
          </p>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Your supplements aren&apos;t working.
            <br />
            <span className="text-brand-green">We know why.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-gray-700 sm:text-base">
            Most Indian brands list premium ingredients at doses too small to do
            anything. Every Nutripanda gummy delivers what the science actually
            recommends — verified by third-party lab, QR code on every pack.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Zero Sugar", "FSSAI", "QR Lab Verified"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium text-gray-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Thin divider ━━━ */}
      <div className="mx-auto w-12 border-t border-black/10" />

      {/* ━━━ Section 2: The Dose Difference ━━━ */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-xl">
          <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-gray-900">
            The dose difference
          </p>
          <p className="mt-3 text-center text-sm text-gray-600 sm:text-base">
            We don&apos;t ask you to trust us. We show you the numbers.
          </p>

          {/* Comparison table */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-black/10">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-50 px-5 py-3 text-xs font-semibold tracking-wide uppercase sm:px-6">
              <span />
              <span className="text-center text-brand-green">NutriPanda</span>
              <span className="text-center text-gray-900">Others</span>
            </div>

            {/* Rows */}
            {comparisons.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 items-center px-5 py-4 sm:px-6 ${
                  i < comparisons.length - 1 ? "border-b border-black/10" : ""
                }`}
              >
                <span className="text-xs font-medium text-gray-900 sm:text-sm">
                  {row.label}
                </span>
                <span className="text-center text-xs font-semibold text-gray-900 sm:text-sm">
                  {row.us}
                </span>
                <span className="text-center text-xs text-gray-900 sm:text-sm">
                  {row.them}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Thin divider ━━━ */}
      <div className="mx-auto w-12 border-t border-black/10" />

      {/* ━━━ Section 3: How It Works ━━━ */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-xl">
          <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-gray-900">
            How it works
          </p>

          <div className="mt-10 space-y-8 sm:mt-12">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-5">
                <span className="shrink-0 font-heading text-3xl font-bold leading-none text-gray-900 sm:text-4xl">
                  {step.num}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-gray-700 sm:text-base">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs italic text-gray-900 sm:text-sm">
            Results in 60–90 days. Not magic. Science at the right dose.
          </p>
        </div>
      </section>

      {/* ━━━ Thin divider ━━━ */}
      <div className="mx-auto w-12 border-t border-black/10" />

      {/* ━━━ Section 4: FAQ ━━━ */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-xl">
          <p className="mb-8 text-center text-xs font-semibold tracking-[0.25em] uppercase text-gray-900 sm:mb-10">
            Questions
          </p>
          <FAQAccordion />
        </div>
      </section>

      {/* ━━━ Footer strip ━━━ */}
      <div className="border-t border-black/10 py-8 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} NutriPanda · Made in India
        </p>
      </div>
    </div>
  );
}
