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
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${
        open ? "rotate-90" : "rotate-0"
      }`}
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          FAQ
        </h2>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-center gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BC00] focus-visible:ring-offset-2"
                aria-expanded={openIndex === index}
              >
                <ChevronIcon open={openIndex === index} />
                <span className="text-base font-semibold text-gray-900 sm:text-lg">
                  {faq.question}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="pb-5 pl-9 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
