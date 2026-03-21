"use client";

import { useState } from "react";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string) {
  return /^[6-9]\d{9}$/.test(value);
}

export default function WaitlistForm() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = input.trim();

    if (!value) {
      setStatus("error");
      setMessage("Please enter your email or phone number.");
      return;
    }

    const email = isEmail(value) ? value : undefined;
    const phone = isPhone(value) ? value : undefined;

    if (!email && !phone) {
      setStatus("error");
      setMessage("Please enter a valid email or 10-digit phone number.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });

      const data = await res.json();

      if (!res.ok && res.status !== 200) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setInput("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex w-full max-w-sm flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Enter your email or phone number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:ring-1 focus:ring-brand-green"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0fa600] active:bg-[#0d9200] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Joining..." : "Notify Me"}
      </button>

      {message && (
        <p
          className={`text-center text-sm ${
            status === "error" ? "text-red-500" : "text-brand-green"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
