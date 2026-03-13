"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend
  };

  const inputClass =
    "w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#12BC00] focus:ring-0";

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12">
          {/* Left: Image */}
          <div className="flex-1">
            <Image
              src="/assets/contact.png"
              alt="Contact NutriPanda"
              width={600}
              height={600}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>

          {/* Right: Heading + Form */}
          <div className="flex flex-1 flex-col justify-center">
            <h2 className="mb-8 text-4xl font-bold uppercase tracking-tight text-gray-900 sm:text-5xl">
              CONTACT US
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className={inputClass}
              />

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className={inputClass}
              />

              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={inputClass}
              />

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Your Message"
                className={`${inputClass} resize-none`}
              />

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-[#12BC00] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0fa600] active:bg-[#0d9200]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
