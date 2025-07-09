"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CategoryHeroProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  ctaText?: string
  ctaLink?: string
  subcategories?: { label: string; href: string }[]
  currentSubcategory?: string
  navTitle?: string // For the navigation bar, separate from hero title
}

export default function CategoryHero({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  ctaLink,
  subcategories,
  currentSubcategory,
  navTitle,
}: CategoryHeroProps) {
  return (
    <section className="relative">
      {/* Subcategory navigation */}
      {subcategories && (
        <div className="bg-white py-4 px-4 lg:px-8 border-b">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-gray-900 mr-8">{navTitle || title}</h1>
            <nav className="flex items-center space-x-8">
              {subcategories.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-gray-900 hover:text-gray-600 font-medium transition-colors ${
                    currentSubcategory === item.label.toLowerCase() ? "text-black font-bold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Hero section */}
      <div 
        className="relative bg-black h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative z-10 text-center text-white max-w-4xl px-4 transition-all duration-700 ease-in-out">
          {subtitle && (
            <p className="text-lg md:text-xl mb-2 uppercase tracking-wider text-shadow-lg">{subtitle}</p>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg leading-tight">{title}</h1>
          {description && (
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-shadow-md font-light">{description}</p>
          )}
          {ctaText && ctaLink && (
            <Button 
              asChild
              className="bg-white text-black hover:bg-gray-100 hover:scale-105 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          )}
        </div>

        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>
    </section>
  )
}