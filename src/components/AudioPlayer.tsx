"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface AudioPlayerProps {
  src: string
  isPlaying: boolean
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => console.error("Audio playback failed:", error))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying]) // Removed unnecessary src dependency

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return <audio ref={audioRef} src={src} loop />
}

export default AudioPlayer

