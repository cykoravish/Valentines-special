"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { BackgroundBeams } from "@/components/ui/background-beams"
import FloatingButton from "@/components/FloatingButton"
import Image from "next/image"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import hug from "@/images/hug.jpg"

const DynamicAudio = dynamic(() => import("@/components/DynamicAudio"), { ssr: false })

const loveQuotes = [
  "Every moment with you feels like a beautiful dream...",
  "Your love is the rhythm that makes my heart dance...",
  "In your eyes, I've found my home and my adventure...",
  "With you, every day is Valentine's Day...",
  "You're the missing piece that makes my life complete...",
]

export default function JourneyPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const timer = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % loveQuotes.length)
      }, 6000) // Change quote every 6 seconds

      return () => clearInterval(timer)
    }
  }, [isClient])

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  // Generate positions for hearts and sparkles only on client side
  const heartPositions = useRef(
    Array(20)
      .fill(0)
      .map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
      })),
  )

  const sparklePositions = useRef(
    Array(30)
      .fill(0)
      .map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
      })),
  )

  if (!isClient) {
    return <div className="min-h-screen w-full bg-black"></div> // Simple loading state
  }

  return (
    <div className="min-h-screen w-full bg-black antialiased relative overflow-hidden font-valentine">
      <BackgroundBeams className="opacity-20" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/30 to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-2xl mx-auto text-center"
        >
          {/* Image Container */}
          <motion.div
            className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-8 rounded-full overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-blue-500/30 to-purple-500/20 animate-pulse rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-blue-950/40 mix-blend-overlay rounded-full" />
            <Image
              src={hug || "/placeholder.svg"}
              alt="Romantic Couple Embrace"
              width={320}
              height={320}
              className={`object-cover w-full h-full rounded-full transition-opacity duration-700 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />

            {/* Floating hearts overlay */}
            <AnimatePresence>
              {heartPositions.current.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-500"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: -100,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: pos.delay,
                  }}
                  style={{
                    left: pos.left,
                    top: pos.top,
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Text and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TextGenerateEffect
                  words={loveQuotes[currentQuoteIndex]}
                  className="text-2xl md:text-3xl lg:text-4xl text-pink-200 font-valentine"
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center space-x-4">
              <FloatingButton text={isPlaying ? "Pause Music ❤️" : "Play Music ❤️"} onClick={toggleAudio} />
              <FloatingButton text="Continue Journey ✨" onClick={() => router.push("/journey/memories")} />
            </div>
          </motion.div>
        </motion.div>

        {/* Sparkles */}
        <AnimatePresence>
          {sparklePositions.current.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: pos.delay,
              }}
              style={{
                left: pos.left,
                top: pos.top,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <DynamicAudio
        isPlaying={isPlaying}
        audioSrc="https://res.cloudinary.com/djg26gece/video/upload/v1739473846/duniya_as7mui.mp3"
      />
    </div>
  )
}

