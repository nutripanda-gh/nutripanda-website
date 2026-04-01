"use client";

import { useState } from "react";
import Image from "next/image";

const GUMMIES = [
  { className: "top-[15%] left-[5%] lg:left-[10%]", delay: "0s", duration: "6s", rotate: "-15deg" },
  { className: "bottom-[20%] left-[3%] lg:left-[8%]", delay: "2s", duration: "7s", rotate: "25deg" },
  { className: "top-[10%] right-[5%] lg:right-[10%]", delay: "1s", duration: "5.5s", rotate: "20deg" },
  { className: "bottom-[15%] right-[3%] lg:right-[8%]", delay: "3s", duration: "6.5s", rotate: "-20deg" },
];

function FloatingInput({
  id,
  label,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full rounded-full border border-gray-300 bg-white px-5 pb-2.5 pt-5 text-sm text-gray-900 outline-none transition-colors focus:border-black"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition-all peer-focus:top-3.5 peer-focus:text-[11px] peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-gray-500"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  required = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        placeholder=" "
        className="peer w-full resize-none rounded-3xl border border-gray-300 bg-white px-5 pb-3 pt-6 text-sm text-gray-900 outline-none transition-colors focus:border-black"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-5 text-sm text-gray-400 transition-all peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-gray-500"
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20">
      {/* Floating gummies — hidden on mobile */}
      <div className="pointer-events-none hidden sm:block">
        {GUMMIES.map((g, i) => (
          <div
            key={i}
            className={`absolute z-[1] animate-float ${g.className}`}
            style={{ animationDelay: g.delay, animationDuration: g.duration }}
          >
            <div className="relative" style={{ transform: `rotate(${g.rotate})` }}>
              <div
                className="absolute inset-0 bg-[#12BC00] opacity-[0.12] animate-glow-morph"
                style={{
                  margin: "-40%",
                  filter: "blur(50px)",
                  animationDelay: g.delay,
                  animationDuration: g.duration,
                }}
              />
              <Image
                src="/assets/pre-launch/green-gummy.png"
                alt=""
                width={80}
                height={80}
                className="relative opacity-70"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="mb-3 inline-block text-sm font-semibold tracking-widest uppercase text-[#12BC00]">
            Get in Touch
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We&apos;d Love to Hear From You
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-gray-500">
            Questions, feedback, or just want to say hi? Drop us a message and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Form — no wrapper card */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput
              id="name"
              label="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <FloatingInput
              id="email"
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <FloatingInput
            id="phone"
            label="Phone Number (optional)"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />

          <FloatingTextarea
            id="message"
            label="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:scale-[0.99]"
          >
            Send Message
          </button>
        </form>

        {/* Alternative contact */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="mailto:hello@nutripanda.in"
            className="text-sm text-gray-400 transition-colors hover:text-gray-900"
          >
            hello@nutripanda.in
          </a>
          <span className="hidden text-gray-300 sm:inline">|</span>
          <a
            href="https://instagram.com/og_nutripanda"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 transition-colors hover:text-gray-900"
          >
            @og_nutripanda
          </a>
        </div>
      </div>
    </section>
  );
}
