"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type React from "react" // Added import for React

interface TypewriterTextProps {
  text: string
  delay?: number
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <motion.h2
      className="text-3xl md:text-4xl font-bold text-pink-600 my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.h2>
  )
}

export default TypewriterText

