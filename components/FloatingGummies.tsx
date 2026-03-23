"use client";

import Image from "next/image";

const GUMMIES = [
  { id: 1, className: "top-[12%] left-[18%]",                             size: 100, delay: "0s",   duration: "6s",   rotate: "-15deg" },
  { id: 2, className: "top-[15%] right-[18%]",                            size: 100, delay: "1.5s", duration: "7s",   rotate: "20deg" },
  { id: 3, className: "hidden sm:block top-[50%] left-[14%]",             size: 100, delay: "0.8s", duration: "5.5s", rotate: "10deg" },
  { id: 4, className: "hidden sm:block top-[48%] right-[14%]",            size: 100, delay: "2s",   duration: "6.5s", rotate: "-25deg" },
];

export default function FloatingGummies() {
  return (
    <>
      {GUMMIES.map((g) => (
        <div
          key={g.id}
          className={`pointer-events-none absolute z-[5] animate-float scale-[0.6] sm:scale-100 ${g.className}`}
          style={{
            animationDelay: g.delay,
            animationDuration: g.duration,
          }}
        >
          <div
            className="relative"
            style={{ transform: `rotate(${g.rotate})` }}
          >
            {/* Green glow — morphs with the float */}
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
              width={g.size}
              height={g.size}
              className="relative opacity-80"
            />
          </div>
        </div>
      ))}
    </>
  );
}
