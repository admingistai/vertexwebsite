"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative">

      {/* Hero image */}
      <div 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/main-hero.png')" }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <img 
            src="/images/logos/logo.png" 
            alt="VERTEX Athletic Logo" 
            className="mx-auto mb-6 h-20 w-auto"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Reach Your Peak</h1>
          <p className="text-xl md:text-2xl mb-8">Performance meets sustainability</p>
        </div>
      </div>

    </section>
  )
}
