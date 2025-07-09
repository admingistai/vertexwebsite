"use client"

import { useState } from "react"
import Header from "@/components/header"
import CategoryHero from "@/components/category-hero"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Mock data for women's products
const womenProducts = [
  {
    id: 301,
    name: "Vertex Force One '07",
    category: "Women's Shoes",
    price: 110,
    colors: 10,
    images: ["/images/products/womans1.jpg"],
    isBestSeller: true,
  },
  {
    id: 302,
    name: "Vertex Phoenix Flex",
    category: "Women's Oversized Crew",
    price: 70,
    colors: 8,
    images: ["/images/products/womans2.jpg"],
    isNew: true,
  },
  {
    id: 303,
    name: "FlowFit",
    category: "Women's Gentle-Support High-Waisted Leggings",
    price: 110,
    colors: 6,
    images: ["/images/products/womans3.jpg"],
    isBestSeller: true,
  },
  {
    id: 304,
    name: "Court Classic Low",
    category: "Women's Shoes",
    price: 110,
    colors: 12,
    images: ["/images/products/womans1.jpg"],
  },
  {
    id: 305,
    name: "Vertex Bra",
    category: "Women's Medium-Support Padded Sports Bra",
    price: 35,
    colors: 9,
    images: ["/images/products/womans2.jpg"],
  },
  {
    id: 306,
    name: "Swift Runner 40",
    category: "Women's Road Running Shoes",
    price: 130,
    colors: 8,
    images: ["/images/products/womans3.jpg"],
  },
  {
    id: 307,
    name: "Vertex Essential",
    category: "Women's T-Shirt",
    price: 30,
    colors: 10,
    images: ["/images/products/womans1.jpg"],
  },
  {
    id: 308,
    name: "Vertex One",
    category: "Women's Mid-Rise 7/8 Leggings",
    price: 60,
    colors: 7,
    images: ["/images/products/womans2.jpg"],
  },
  {
    id: 309,
    name: "Storm Runner",
    category: "Women's Jacket",
    price: 100,
    colors: 5,
    images: ["/images/products/womans3.jpg"],
  },
]


export default function WomenPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <>
      <Header currentSection="women" />
      <main>
        <CategoryHero
          title="Unleash Your Strength"
          description="Designed by women, for women who conquer"
          backgroundImage="/images/hero/woman-hero.jpg"
          ctaText="Shop Women's Collection"
          ctaLink="/women"
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
                {womenProducts.length} Results
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
            <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {womenProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* All Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Shop All Women's</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {womenProducts.map((product) => (
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