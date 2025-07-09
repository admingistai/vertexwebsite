"use client"

import { useState } from "react"
import Header from "@/components/header"
import CategoryHero from "@/components/category-hero"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Mock data for men's products
const menProducts = [
  {
    id: 201,
    name: "VERTEX Air Force 1 '07",
    category: "Men's Shoes",
    price: 110,
    colors: 12,
    images: ["/images/products/urban-forge.jpg"],
    isBestSeller: true,
  },
  {
    id: 202,
    name: "VERTEX Dri-FIT ADV TechKnit Ultra",
    category: "Men's Running Top",
    price: 80,
    colors: 5,
    images: ["/images/products/sport.jpg"],
  },
  {
    id: 203,
    name: "VERTEX Sportswear Tech Fleece",
    category: "Men's Joggers",
    price: 120,
    colors: 8,
    images: ["/images/products/van-gogh.jpg"],
    isBestSeller: true,
  },
  {
    id: 204,
    name: "VERTEX Air Max 90",
    category: "Men's Shoes",
    price: 130,
    colors: 15,
    images: ["/images/products/apex-runner.jpg"],
  },
  {
    id: 205,
    name: "VERTEX Pro Dri-FIT",
    category: "Men's Tight-Fit Sleeveless Top",
    price: 30,
    colors: 7,
    images: ["/images/products/sport.jpg"],
  },
  {
    id: 206,
    name: "VERTEX Pegasus 40",
    category: "Men's Road Running Shoes",
    price: 130,
    colors: 10,
    images: ["/images/products/sky-dancer.jpg"],
    isNew: true,
  },
  {
    id: 207,
    name: "VERTEX Sportswear Club",
    category: "Men's T-Shirt",
    price: 30,
    colors: 12,
    images: ["/images/products/sport.jpg"],
  },
  {
    id: 208,
    name: "VERTEX Elite",
    category: "Basketball Shorts",
    price: 45,
    colors: 6,
    images: ["/images/products/dali.jpg"],
  },
  {
    id: 209,
    name: "VERTEX Windrunner",
    category: "Men's Jacket",
    price: 100,
    colors: 4,
    images: ["/images/products/storm-shield.jpg"],
  },
]


export default function MenPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <>
      <Header currentSection="men" />
      <main>
        <CategoryHero
          title="Built for the Journey"
          description="Engineered performance for every adventure"
          backgroundImage="/images/hero/man-hero.jpg"
          ctaText="Shop Men's Collection"
          ctaLink="/men"
        />

        <div className="px-4 lg:px-8 py-8">
          {/* Filters and Sort */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                Filters
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-gray-600">
                {menProducts.length} Results
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-none bg-transparent font-medium cursor-pointer focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Featured Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Right Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* All Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Shop All Men's</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" className="px-8">
              Load More
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}