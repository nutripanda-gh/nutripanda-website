"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What ingredients are in your gummies?",
    answer:
      "Our gummies are crafted with premium, clinically researched ingredients including essential vitamins, minerals, and plant-based extracts. Each product page lists the full ingredient breakdown along with nutritional information. We never use artificial colours, flavours, or high-fructose corn syrup.",
  },
  {
    question: "Are your products vegan?",
    answer:
      "Yes! All NutriPanda gummies are 100% vegan. We use pectin instead of gelatin so our supplements are suitable for vegetarians and vegans alike. They are also gluten-free and made without any major allergens.",
  },
  {
    question: "How should I store the supplements?",
    answer:
      "Store your gummies in a cool, dry place away from direct sunlight. Keep the bottle tightly sealed after each use. There is no need to refrigerate, but avoid storing them in hot or humid environments as this can cause the gummies to stick together or soften.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "We currently ship across India with free delivery on orders above ₹499. International shipping is not available at the moment, but we are actively working on expanding to select countries. Sign up for our newsletter to be the first to know when we launch internationally.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you are not happy with your purchase, contact us within 30 days of delivery for a full refund or replacement. The product must be in its original packaging. Opened bottles are eligible for a refund if less than half the gummies have been consumed.",
  },
  {
    question: "How many gummies should I take per day?",
    answer:
      "We recommend 2 gummies per day for adults. Take them at any time — with or without food. For best results, make them part of your daily routine. Do not exceed the recommended dosage. Consult your physician if you are pregnant, nursing, or on medication.",
  },
];

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fafafa] transition-colors group-hover:bg-gray-100">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-gray-900"
      >
        <path
          d="M8 3v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`origin-center transition-transform duration-300 ${open ? "scale-y-0" : "scale-y-100"}`}
        />
        <path
          d="M3 8h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="w-full bg-[#fafafa] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="mb-3 inline-block text-sm font-semibold tracking-widest uppercase text-[#12BC00]">
            Got Questions?
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-[#12BC00]/20 bg-white shadow-sm"
                    : "border-gray-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BC00] focus-visible:ring-offset-2"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-gray-900 sm:text-base">
                    {faq.question}
                  </span>
                  <PlusMinusIcon open={isOpen} />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
