"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import type React from "react" // Added import for React

interface HeartAnimationProps {
  onExpand: () => void
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ onExpand }) => {
  const heartRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (heartRef.current) {
      gsap.to(heartRef.current, {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }

    const timer = setTimeout(() => {
      onExpand()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onExpand])

  return (
    <motion.svg
      ref={heartRef}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M50 88.9C49.5 88.9 49 88.7 48.6 88.4C44.1 84.4 29.5 71.2 20.5 59.4C10.9 46.8 9 37.9 9 30.7C9 17.1 20.1 6 33.7 6C41.3 6 48.3 9.6 52.5 15.3C56.7 9.6 63.7 6 71.3 6C84.9 6 96 17.1 96 30.7C96 37.9 94.1 46.8 84.5 59.4C75.5 71.2 60.9 84.4 56.4 88.4C56 88.7 55.5 88.9 55 88.9H50Z"
        fill="#FF69B4"
        initial={{ pathLength: 0, fill: "none" }}
        animate={{ pathLength: 1, fill: "#FF69B4" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}

export default HeartAnimation

