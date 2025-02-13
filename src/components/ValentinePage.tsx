"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import FloatingButton from "@/components/FloatingButton";

import beachCouple from "@/images/couple.jpg";
import coupleData from "@/images/kiss.jpg";
import cozyCouple from "@/images/night1.jpg";

const DynamicFloatingHearts = dynamic(
  () => import("@/components/FloatingHearts"),
  { ssr: false }
);
const DynamicSpotlight = dynamic(
  () => import("@/components/DynamicSpotlight"),
  { ssr: false }
);

const memories = [
  {
    id: 1,
    name: "Our First Date",
    designation: "The day our journey began",
    image: beachCouple,
  },
  {
    id: 2,
    name: "Beach Sunset",
    designation: "Where we first said 'I love you'",
    image: coupleData,
  },
  {
    id: 3,
    name: "Cozy Evening",
    designation: "Just us, being us",
    image: cozyCouple,
  },
];

export default function ValentinePage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStartJourney = () => {
    router.push("/journey");
  };

  if (!isClient) {
    return null; // or a loading indicator
  }

  return (
    <div className="min-h-screen w-full bg-black antialiased relative overflow-hidden font-valentine">
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicSpotlight />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <DynamicFloatingHearts />
      </Suspense>

      {/* Enhanced background gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/30 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <div className="relative w-full max-w-3xl mb-8 md:mb-16">
            {/* Enhanced glow effects */}
            <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-pink-500 to-purple-500 opacity-40 blur-3xl animate-pulse" />
            <div className="absolute -inset-x-10 -inset-y-5 bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 blur-2xl" />

            <div className="relative bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 md:p-12 rounded-3xl border border-pink-500/20 backdrop-blur-xl">
              <h1 className="text-4xl md:text-6xl py-4 lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300 mb-4 md:mb-6">
                Happy Valentine's Day
              </h1>
              <TextGenerateEffect
                words="A journey through our love story awaits..."
                className="text-lg md:text-xl lg:text-2xl text-pink-200 mt-4"
              />
            </div>
          </div>

          <div className="relative mb-8 md:mb-16">
            <div className="absolute -inset-x-10 -inset-y-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl opacity-70 rounded-full" />
            <h3 className="relative text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
              Our Precious Memories
            </h3>
            <div className="flex justify-center gap-4 md:gap-8">
              <AnimatedTooltip items={memories} />
            </div>
          </div>

          <FloatingButton
            text="Begin Our Journey ✨"
            onClick={handleStartJourney}
          />
        </div>
        <h1 className="text-red-500 text-center">❤️❤️by Ravish❤️❤️</h1>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
