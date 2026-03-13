import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | NutriPanda',
  description:
    'Learn about NutriPanda — our story, mission, and commitment to making nutrition fun, clean, and accessible for every Indian.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-accent-lightGreen/30 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-green">
              Our Story
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Nutrition That&apos;s Actually Fun
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              We started NutriPanda with a simple belief — taking your daily vitamins
              shouldn&apos;t feel like a chore. It should be something you look forward to.
            </p>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              How It Started
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-gray-600">
              <p>
                It started with a frustration we&apos;ve all felt — staring at a pile of
                tablets and capsules every morning, wondering why something so essential
                had to be so unpleasant. We knew there had to be a better way.
              </p>
              <p>
                After months of research, countless formulations, and one too many taste
                tests, NutriPanda was born. We set out to create gummies that deliver
                real, science-backed nutrition in a format people actually enjoy.
              </p>
              <p>
                Every gummy is made in India, in FSSAI-certified facilities, with
                ingredients sourced for purity and potency. No artificial colours, no
                gelatin, no compromises.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Our Mission
                </h2>
                <p className="text-base leading-relaxed text-gray-600">
                  To make daily nutrition accessible, enjoyable, and transparent for
                  every Indian. We believe that when supplements taste great and are
                  made with clean ingredients, people are more likely to stay consistent
                  — and consistency is where real health happens.
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Our Vision
                </h2>
                <p className="text-base leading-relaxed text-gray-600">
                  A world where taking your vitamins brings a smile, not a grimace.
                  We&apos;re building NutriPanda to become India&apos;s most loved
                  nutrition brand — one gummy at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Stand For */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              What We Stand For
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Clean Ingredients',
                  description:
                    'No artificial colours, no gelatin, no high-fructose corn syrup. Just real, researched ingredients your body can use.',
                },
                {
                  title: '100% Vegetarian',
                  description:
                    'All our gummies use pectin — a plant-based alternative to gelatin. Suitable for vegetarians and vegans.',
                },
                {
                  title: 'Made in India',
                  description:
                    'Manufactured in FSSAI-certified facilities with strict quality controls. Proudly Indian, globally inspired.',
                },
                {
                  title: 'Science-Backed',
                  description:
                    'Every formulation is based on clinical research and recommended daily values. No fairy dust, just science.',
                },
                {
                  title: 'Transparent Labels',
                  description:
                    'What you see is what you get. Full ingredient lists, nutritional info, and dosages — right on the pack.',
                },
                {
                  title: 'Sustainability',
                  description:
                    'We\'re committed to reducing waste in our packaging and supply chain as we grow. Better health shouldn\'t cost the planet.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-green py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Try NutriPanda?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join thousands of Indians who&apos;ve made gummies part of their daily routine.
            </p>
            <a
              href="/products"
              className="mt-8 inline-block rounded-full bg-white px-10 py-3.5 text-sm font-semibold text-brand-green transition-opacity hover:opacity-90"
            >
              Shop Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
