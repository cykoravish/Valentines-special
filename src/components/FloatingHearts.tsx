"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const FloatingHearts = () => {
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 })
  const hearts = Array.from({ length: 15 })

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * windowSize.width,
            y: windowSize.height,
          }}
          animate={{
            opacity: [0, 0.5, 1, 0.5, 0],
            scale: [0, 0.5, 1, 0.5, 0],
            x: [Math.random() * windowSize.width, Math.random() * windowSize.width, Math.random() * windowSize.width],
            y: [windowSize.height, Math.random() * windowSize.height * 0.6, -100],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          <div className="text-pink-500 text-4xl md:text-5xl transform rotate-12 select-none">❤️</div>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingHearts

