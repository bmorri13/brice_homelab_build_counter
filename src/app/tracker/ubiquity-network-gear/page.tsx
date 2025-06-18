"use client"

import Image from "next/image"
import { formatTimeDifference } from "../../utils/formatTime"
import { useState, useEffect } from "react"
import Confetti from "react-confetti"
import { ubiquityFacts } from "../../components/UbiquityFacts"
import Link from "next/link"

export default function UbiquityNetworkTracker() {
  const startDate = new Date("2025-06-12T00:00:00")
  const successfullyBuiltDate = new Date("2025-06-17T23:30:00Z")
  const [showConfetti, setShowConfetti] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [randomFact, setRandomFact] = useState("")

  const timeToComplete = successfullyBuiltDate.getTime() - startDate.getTime()

  useEffect(() => {
    // Set initial dimensions and trigger confetti on load
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
    triggerConfetti()
  }, [])

  const triggerConfetti = () => {
    setShowConfetti(true)
    // Ensure dimensions are set before showing confetti if triggered by button
    if (dimensions.width === 0 || dimensions.height === 0) {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 10000) // Confetti will show for 10 seconds
    // It's good practice to clear the timeout if the component unmounts or if confetti is re-triggered
    return () => clearTimeout(timer)
  }

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * ubiquityFacts.length)
    setRandomFact(ubiquityFacts[randomIndex])
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      {showConfetti && <Confetti width={dimensions.width} height={dimensions.height} />}
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Brice's Ubiquity Network Gear Setup
        </h1>

        {/* Card for Start Date */}
        <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-2xl backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-bold mb-2 text-purple-400">Start Date</h2>
          <div className="text-3xl font-mono text-purple-300 tabular-nums">
            {startDate.toLocaleString()}
          </div>
        </div>

        {/* Card for Successfully Built Date */}
        <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-2xl backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-bold mb-2 text-green-400">Successfully Setup On</h2>
          <div className="text-3xl font-mono text-green-300 tabular-nums">
            {successfullyBuiltDate.toLocaleString()}
          </div>
        </div>

        {/* Card for Time to Complete */}
        <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-2xl backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-bold mb-2 text-yellow-400">Time to Complete</h2>
          <div className="text-3xl font-mono text-yellow-300 tabular-nums">
            {formatTimeDifference(timeToComplete)}
          </div>
        </div>

        {/* Button to trigger confetti */}
        <button
          onClick={triggerConfetti}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-150 ease-in-out active:scale-95 mr-4"
        >
          Celebrate! 🎉
        </button>

        {/* Button to get random fact */}
        <button
          onClick={getRandomFact}
          className="mb-4 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-75 transition duration-150 ease-in-out active:scale-95"
        >
          What else could have been done in {formatTimeDifference(timeToComplete)}? 🤔
        </button>

        {randomFact && (
          <div className="mt-4 p-4 bg-white bg-opacity-5 rounded-lg shadow-lg backdrop-blur-sm text-lg text-gray-300">
            {randomFact}
          </div>
        )}

        <div className="mt-8">
          <Link href="/" className="text-lg text-sky-400 hover:text-sky-300 underline transition duration-150 ease-in-out">
            Back to Homelab Timer
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-8">
          <div className="relative w-64 h-64">
            <Image
              src="/images/brice_unifi_gear_complete_01.jpeg"
              alt="Ubiquity Network Gear"
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative w-64 h-64">
            <Image
              src="/images/brice_unifi_gear_complete_02.png"
              alt="Ubiquity Network Gear 2"
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

