"use client"
import MatrixRain from "@/components/matrix-rain"

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-60 px-8 py-4 rounded">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400">Code time</h1>
        </div>
      </div>
    </main>
  )
}
