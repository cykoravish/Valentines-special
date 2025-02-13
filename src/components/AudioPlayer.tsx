"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface AudioPlayerProps {
  src: string
  isPlaying: boolean
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const previousSrcRef = useRef<string>("")

  useEffect(() => {
    // Create new audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = "auto"
    }

    // Handle source change
    if (previousSrcRef.current !== src) {
      const playAudio = async () => {
        if (audioRef.current) {
          try {
            // Pause and reset current audio
            audioRef.current.pause()
            audioRef.current.currentTime = 0

            // Update source and load new audio
            audioRef.current.src = src
            await audioRef.current.load()
            previousSrcRef.current = src

            // Play if isPlaying is true
            if (isPlaying) {
              await audioRef.current.play()
            }
          } catch (error) {
            console.error("Audio playback error:", error)
          }
        }
      }

      playAudio()
    } else {
      // Handle play/pause for same audio
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error("Audio playback error:", error)
          })
        } else {
          audioRef.current.pause()
        }
      }
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [src, isPlaying])

  return null
}

export default AudioPlayer

