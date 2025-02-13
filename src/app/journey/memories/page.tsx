"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";
import rose from "@/images/rose.png";
import propose from "@/images/propose.png";
import chocolate from "@/images/chocolate.png"
import teddy from "@/images/teddy.png"
import promise from "@/images/promise.png"
import hug1 from "@/images/hug1.png"
import kiss from "@/images/kiss.jpg"
import val from "@/images/val.png"


const valentinesDays = [
  {
    title: "Rose Day",
    description:
      "A single rose speaks volumes of our love. Each petal represents a moment we've shared, a memory we've created. Like this rose, our love blossoms more beautifully with each passing day.",
    image: rose,
    song: "https://res.cloudinary.com/djg26gece/video/upload/v1739477214/sochnasakhe_arzjpz.mp3",
  },
  {
    title: "Propose Day",
    description:
      "Every day with you feels like a proposal - a promise to love, cherish, and stand by each other. Your presence in my life is the greatest gift I could ever ask for.",
    image: propose,
    song: "https://res.cloudinary.com/djg26gece/video/upload/v1739478047/terineed_rjhhga.mp3",
  },
  {
    title: "Chocolate Day",
    description:
      "Sweet like chocolate, rich like its flavor - that's how you've made my life. You're the delightful treat that makes every day special, filling my world with joy and sweetness.",
    image: chocolate,
    song: "https://res.cloudinary.com/djg26gece/video/upload/v1739479063/kissme_ienam6.mp3",
  },
  {
    title: "Teddy Day",
    description:
      "Soft, cuddly, and always there - you're my real-life teddy bear. Your hugs are my safe haven, your love my comfort. With you, I feel protected and cherished always.",
    image: teddy,
    song: "https://res.cloudinary.com/djg26gece/video/upload/v1739480425/shape-of-you-29844_i9buk4.mp3",
  },
  {
    title: "Promise Day",
    description:
      "I promise to love you in all your forms, through all our days. My heart is yours, my love eternal. Every beat of my heart is a promise renewed, a vow to cherish you forever.",
    image: promise,
    song: "https://res.cloudinary.com/djg26gece/video/upload/v1739480739/tera-20hone-20laga-20hoon-mr-jatt-com-21591-47307_r2hkex.mp3", 
  },
  {
    title: "Hug Day",
    description:
      "In your embrace, I find my home. Your arms around me feel like the safest place in the world. Each hug is a silent 'I love you', a wordless expression of our deep connection.",
    image: hug1,
    song: "https://res.cloudinary.com/djg26gece/video/upload/v1739480994/janam-janam-tone1-57562_o8jufl.mp3",
  },
  {
    title: "Kiss Day",
    description:
      "Every kiss with you feels like our first - magical, electrifying, and full of promise. Your lips are the poetry that my heart longs to read, again and again.",
    image: kiss,
    song: "https://res.cloudinary.com/djg26gece/video/upload/v1739477214/sochnasakhe_arzjpz.mp3", 
  },
  {
    title: "Valentine's Day",
    description:
      "You are my valentine, not just today, but every day. My love for you is timeless, boundless, and ever-growing. With you, every moment is a celebration of love.",
    image: val,
    song: "https://res.cloudinary.com/djg26gece/video/upload/v1739480739/tera-20hone-20laga-20hoon-mr-jatt-com-21591-47307_r2hkex.mp3",
  },
];

const ClientOnly = ({ children }: any) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return children;
};

export default function MemoriesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % valentinesDays.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + valentinesDays.length) % valentinesDays.length
    );
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const currentItem = valentinesDays[currentIndex];

  return (
    <ClientOnly>
      <div className="h-screen w-full bg-black antialiased relative overflow-hidden font-valentine">
        <BackgroundBeams />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/30 to-black pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center h-full p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-pink-300 mb-4">
                {currentItem.title}
              </h2>
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-4 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-purple-500/30 mix-blend-overlay rounded-full" />
                <Image
                  src={currentItem.image || "/placeholder.svg"}
                  alt={currentItem.title}
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              <div className="max-w-2xl mx-auto">
                <TextGenerateEffect
                  words={currentItem.description}
                  className="text-sm md:text-base text-pink-100"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-4">
            <FloatingButton text="Previous ❤️" onClick={prevSlide} />
            <FloatingButton
              text={isPlaying ? "Pause Music 🎵" : "Play Music 🎵"}
              onClick={toggleAudio}
            />
            <FloatingButton text="Next ❤️" onClick={nextSlide} />
          </div>
        </div>

        <AudioPlayer src={currentItem.song} isPlaying={isPlaying} />
      </div>
    </ClientOnly>
  );
}
