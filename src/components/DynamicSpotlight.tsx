"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Spotlight } from "./ui/Spotlight"

const DynamicSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <motion.div
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="fixed top-0 left-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-75 pointer-events-none"
      >
        <Spotlight className="-top-20 left-0 md:left-60 md:-top-20" fill="rgba(255, 182, 193, 0.9)" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none"
      >
        <Spotlight className="-top-40 right-0 md:right-60 md:-top-20" fill="rgba(255, 20, 147, 0.7)" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none"
      >
        <Spotlight className="bottom-[-400px]" fill="rgba(219, 112, 147, 0.6)" />
      </motion.div>
    </>
  )
}

export default DynamicSpotlight

