"use client"

import Image from "next/image"

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
          <Image 
            src="/images/logos/logo.png" 
            alt="VERTEX Athletic Logo" 
            width={80}
            height={80}
            className="mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Reach Your Peak</h1>
          <p className="text-xl md:text-2xl mb-8">Performance meets sustainability</p>
        </div>
      </div>

    </section>
  )
}
