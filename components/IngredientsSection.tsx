import {
  LeafIcon,
  SproutIcon,
  ZapIcon,
  CitrusIcon,
  PlantIcon,
  SunIcon,
  PillIcon,
  DnaIcon,
  GrapeIcon,
  FlowerIcon,
  ShieldCheckIcon,
  BatteryChargingIcon,
  SparklesIcon,
  BrainIcon,
  HeartPulseIcon,
  BoneIcon,
  LotusIcon,
  HeartIcon,
  LeafyGreenIcon,
  MoonStarIcon,
} from "@/components/Icons";
import type { ReactNode } from "react";

interface IngredientItem {
  name: string;
  amount: string;
  icon: ReactNode;
}

interface BenefitItem {
  name: string;
  icon: ReactNode;
}

const IC = "h-4 w-4 text-[#12BC00]";
const BC = "h-4 w-4 text-[#FF7731]";

const INGREDIENTS: IngredientItem[] = [
  { name: "Spirulina", amount: "200mg per gummy", icon: <LeafIcon className={IC} /> },
  { name: "Giloy Extract", amount: "150mg per gummy", icon: <SproutIcon className={IC} /> },
  { name: "Elemental Zinc", amount: "10mg per gummy", icon: <ZapIcon className={IC} /> },
  { name: "Vitamin C", amount: "40mg per gummy", icon: <CitrusIcon className={IC} /> },
  { name: "Pectin Base", amount: "100% Vegan", icon: <PlantIcon className={IC} /> },
  { name: "Vitamin D3", amount: "600 IU per gummy", icon: <SunIcon className={IC} /> },
  { name: "Vitamin B12", amount: "2.2mcg per gummy", icon: <PillIcon className={IC} /> },
  { name: "Folic Acid", amount: "200mcg per gummy", icon: <DnaIcon className={IC} /> },
  { name: "Elderberry", amount: "100mg per gummy", icon: <GrapeIcon className={IC} /> },
  { name: "Ashwagandha", amount: "150mg per gummy", icon: <FlowerIcon className={IC} /> },
];

const BENEFITS: BenefitItem[] = [
  { name: "Boosts Immunity", icon: <ShieldCheckIcon className={BC} /> },
  { name: "Daily Energy", icon: <BatteryChargingIcon className={BC} /> },
  { name: "Stronger Hair & Skin", icon: <SparklesIcon className={BC} /> },
  { name: "Better Focus", icon: <BrainIcon className={BC} /> },
  { name: "Gut Health", icon: <HeartPulseIcon className={BC} /> },
  { name: "Bone Strength", icon: <BoneIcon className={BC} /> },
  { name: "Stress Relief", icon: <LotusIcon className={BC} /> },
  { name: "Heart Health", icon: <HeartIcon className={BC} /> },
  { name: "Detox Support", icon: <LeafyGreenIcon className={BC} /> },
  { name: "Restful Sleep", icon: <MoonStarIcon className={BC} /> },
];

export default function IngredientsSection() {
  return (
    <section className="w-full overflow-hidden bg-white py-16 sm:py-20">
      {/* Section heading */}
      <div className="mx-auto mb-10 max-w-2xl px-4 text-center sm:mb-14">
        <span className="mb-3 inline-block text-sm font-semibold tracking-widest uppercase text-[#12BC00]">
          What Goes Inside
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Real Ingredients. Real Results.
        </h2>
      </div>

      {/* Row 1 — Ingredients (scrolls left) */}
      <div className="relative mb-4 sm:mb-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="flex animate-marquee">
          {[...INGREDIENTS, ...INGREDIENTS].map((item, i) => (
            <div
              key={`ing-${i}`}
              className="mx-2 flex shrink-0 items-center gap-3 rounded-full border border-gray-200 bg-black px-5 py-3 sm:mx-3 sm:px-6 sm:py-3.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                {item.icon}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white whitespace-nowrap">
                  {item.name}
                </span>
                <span className="text-[11px] text-gray-400 whitespace-nowrap">
                  {item.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Health Benefits (scrolls right) */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="flex animate-marquee-reverse">
          {[...BENEFITS, ...BENEFITS].map((item, i) => (
            <div
              key={`ben-${i}`}
              className="mx-2 flex shrink-0 items-center gap-3 rounded-full border border-gray-200 bg-black px-5 py-3 sm:mx-3 sm:px-6 sm:py-3.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                {item.icon}
              </span>
              <span className="text-sm font-semibold text-white whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
