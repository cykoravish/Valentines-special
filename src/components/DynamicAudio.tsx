"use client"

import { useEffect, useRef } from "react"
import type React from "react" // Added import for React

interface DynamicAudioProps {
  isPlaying: boolean
  audioSrc: string
}

const DynamicAudio: React.FC<DynamicAudioProps> = ({ isPlaying, audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(audioSrc)
    audioRef.current.loop = true

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [audioSrc])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  return null
}

export default DynamicAudio

