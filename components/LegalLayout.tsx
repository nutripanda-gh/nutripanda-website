import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

export default function LegalLayout({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <header className="mb-10 border-b border-gray-100 pb-8 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12BC00]">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
          {intro && (
            <p className="mt-5 text-sm leading-relaxed text-gray-600 sm:text-base">
              {intro}
            </p>
          )}
        </header>

        <article
          className="space-y-8
            [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 sm:[&_h2]:text-2xl
            [&_p]:mb-3 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-gray-600 sm:[&_p]:text-base
            [&_ul]:mb-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5
            [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-gray-600 sm:[&_li]:text-base
            [&_a]:font-medium [&_a]:text-[#12BC00] [&_a]:underline [&_a]:underline-offset-2"
        >
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}
